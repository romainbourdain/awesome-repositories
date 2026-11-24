import { useReadme } from "../hooks/useRepos";
import { formatStars } from "../lib/format";
import type { Repo } from "../types";
import { Markdown } from "./Markdown";

export function RepoViewer({ repo }: { repo: Repo }) {
  const readme = useReadme(repo.slug, repo.hasReadme);
  const url = `https://github.com/${repo.repo}`;
  return (
    <article className="mx-auto max-w-4xl p-4 md:p-8">
      <a href="#/" className="mb-3 inline-block text-sm text-indigo-600 md:hidden dark:text-indigo-400">
        ← Back to list
      </a>
      <header className="mb-6 border-b border-slate-200 pb-4 dark:border-slate-800">
        <h2 className="text-xl font-semibold">
          <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {repo.repo}
          </a>
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{repo.description}</p>
        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
          <span>{repo.category}</span>
          {repo.language && <span>{repo.language}</span>}
          {repo.stars !== null && <span>★ {formatStars(repo.stars)}</span>}
          {repo.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </p>
        {repo.notes && (
          <div className="mt-4 rounded-lg bg-amber-50 p-3 dark:bg-amber-950/40">
            <Markdown source={repo.notes} />
          </div>
        )}
      </header>
      {readme === null && <p className="text-sm text-slate-500">No README available for this repository.</p>}
      {readme?.status === "loading" && <p className="text-sm text-slate-500">Loading README…</p>}
      {readme?.status === "error" && <p className="text-sm text-red-600">{readme.message}</p>}
      {readme?.status === "ready" && <Markdown source={readme.value} repo={repo.repo} branch={repo.defaultBranch} />}
    </article>
  );
}
