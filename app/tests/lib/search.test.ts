import { searchRepos } from "../../src/lib/search";
import type { Repo } from "../../src/types";

function repo(overrides: Partial<Repo>): Repo {
  return {
    slug: "a__b",
    repo: "a/b",
    category: "CLI",
    description: "",
    language: null,
    tags: [],
    added: null,
    notes: "",
    stars: 0,
    defaultBranch: "main",
    pushedAt: null,
    hasReadme: true,
    ...overrides,
  };
}

const uv = repo({
  slug: "astral-sh__uv",
  repo: "astral-sh/uv",
  description: "Fast Python package manager",
  language: "Rust",
  stars: 90,
});
const ytdlp = repo({
  slug: "yt-dlp__yt-dlp",
  repo: "yt-dlp/yt-dlp",
  description: "Audio and video downloader",
  language: "Python",
  stars: 200,
});
const skills = repo({
  slug: "x__skills",
  repo: "x/skills",
  category: "Skills",
  description: "Agent skills for Python work",
  stars: 10,
});
const all = [uv, ytdlp, skills];

test("sans requête, trie par étoiles décroissantes", () => {
  expect(searchRepos(all, "").map((r) => r.repo)).toEqual(["yt-dlp/yt-dlp", "astral-sh/uv", "x/skills"]);
});

test("tous les mots doivent correspondre", () => {
  expect(searchRepos(all, "python package").map((r) => r.repo)).toEqual(["astral-sh/uv"]);
});

test("un match sur le nom passe avant un match sur la description", () => {
  const named = repo({ slug: "p__python-kit", repo: "p/python-kit", description: "Helpers", stars: 1 });
  expect(searchRepos([...all, named], "python")[0]?.repo).toBe("p/python-kit");
});

test("filtre par catégorie", () => {
  expect(searchRepos(all, "python", "Skills").map((r) => r.repo)).toEqual(["x/skills"]);
});

test("ignore la casse et ne trouve rien si aucun mot ne correspond", () => {
  expect(searchRepos(all, "RUST").map((r) => r.repo)).toEqual(["astral-sh/uv"]);
  expect(searchRepos(all, "zzzz")).toEqual([]);
});
