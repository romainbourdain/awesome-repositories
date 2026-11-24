import { hashFromSlug } from "../hooks/useSelectedSlug";
import { formatStars } from "../lib/format";
import type { Repo } from "../types";

interface Props {
  repos: Repo[];
  selected: string | null;
}

export function RepoList({ repos, selected }: Props) {
  if (repos.length === 0) return <p className="p-4 text-sm text-slate-500">No repository matches.</p>;
  return (
    <ul className="divide-y divide-slate-200 dark:divide-slate-800">
      {repos.map((repo) => (
        <li key={repo.slug}>
          <a
            href={hashFromSlug(repo.slug)}
            aria-current={repo.slug === selected ? "page" : undefined}
            className="block px-3 py-2.5 hover:bg-slate-100 aria-[current=page]:bg-indigo-50 dark:hover:bg-slate-900 dark:aria-[current=page]:bg-indigo-950"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate text-sm font-medium">{repo.repo}</span>
              {repo.stars !== null && (
                <span className="shrink-0 text-xs text-slate-500">★ {formatStars(repo.stars)}</span>
              )}
            </div>
            <p className="line-clamp-2 text-xs text-slate-600 dark:text-slate-400">{repo.description}</p>
            <p className="mt-1 text-[11px] text-slate-500">
              {repo.category}
              {repo.language ? ` · ${repo.language}` : ""}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}
