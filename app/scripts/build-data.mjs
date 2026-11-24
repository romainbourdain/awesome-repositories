// Lit ../data/**/*.md (frontmatter + notes), récupère métadonnées et README sur GitHub,
// puis écrit public/data/index.json et public/data/readmes/<slug>.md.
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(here, "../../data");
const outDir = path.resolve(here, "../public/data");
const readmeDir = path.join(outDir, "readmes");

function findToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execSync("gh auth token", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return undefined;
  }
}
const token = findToken();
const headers = {
  "User-Agent": "awesome-repositories-build",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

function listMarkdown(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? listMarkdown(p) : e.name.endsWith(".md") ? [p] : [];
  });
}

async function gh(url, accept) {
  const res = await fetch(url, { headers: { ...headers, Accept: accept ?? "application/vnd.github+json" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res;
}

fs.mkdirSync(readmeDir, { recursive: true });
const entries = [];
let failures = 0;

for (const file of listMarkdown(dataDir).sort()) {
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  if (!data.repo) throw new Error(`repo manquant dans ${file}`);
  const slug = String(data.repo).replace("/", "__");
  const entry = {
    slug,
    repo: data.repo,
    category: data.category ?? "Other",
    description: data.description ?? "",
    language: data.language ?? null,
    tags: data.tags ?? [],
    added: data.added instanceof Date ? data.added.toISOString().slice(0, 10) : (data.added ?? null),
    notes: content.trim(),
    stars: null,
    defaultBranch: "main",
    pushedAt: null,
  };
  try {
    const meta = await (await gh(`https://api.github.com/repos/${data.repo}`)).json();
    entry.stars = meta.stargazers_count;
    entry.defaultBranch = meta.default_branch;
    entry.pushedAt = meta.pushed_at;
    entry.language = entry.language ?? meta.language ?? null;
    entry.topics = meta.topics ?? [];
    entry.homepage = meta.homepage || null;
  } catch (e) {
    failures++;
    console.warn(`métadonnées indisponibles pour ${data.repo}: ${e.message}`);
  }
  const readmePath = path.join(readmeDir, `${slug}.md`);
  try {
    const text = await (
      await gh(`https://api.github.com/repos/${data.repo}/readme`, "application/vnd.github.raw+json")
    ).text();
    fs.writeFileSync(readmePath, text);
  } catch (e) {
    failures++;
    console.warn(`README indisponible pour ${data.repo}: ${e.message}`);
  }
  entry.hasReadme = fs.existsSync(readmePath);
  entries.push(entry);
}

fs.writeFileSync(path.join(outDir, "index.json"), JSON.stringify(entries, null, 2));
console.log(`${entries.length} repos, ${failures} échec(s) réseau`);
