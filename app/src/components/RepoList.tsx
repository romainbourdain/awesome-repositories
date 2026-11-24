import { hashFromSlug } from "../hooks/useSelectedSlug";
import { formatStars } from "../lib/format";
import { languageColor } from "../lib/languages";
import type { Repo } from "../types";
import { StarIcon } from "./Icons";

interface Props {
  repos: Repo[];
  selected: string | null;
}

export function RepoList({ repos, selected }: Props) {
  if (repos.length === 0) return <p className="p-6 text-center text-muted">No repository matches your search.</p>;
  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.slug} className="border-b border-line">
          <a
            href={hashFromSlug(repo.slug)}
            aria-current={repo.slug === selected ? "page" : undefined}
            className="block border-l-2 border-transparent px-4 py-3 hover:bg-hover aria-[current=page]:border-tab aria-[current=page]:bg-accent-subtle"
          >
            <span className="block truncate text-base font-semibold text-accent">{repo.repo}</span>
            <span className="mt-1 line-clamp-2 block text-xs text-muted">{repo.description}</span>
            <span className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span
                    className="inline-block size-3 rounded-full border border-black/10"
                    style={{ backgroundColor: languageColor(repo.language) }}
                  />
                  {repo.language}
                </span>
              )}
              {repo.stars !== null && (
                <span className="flex items-center gap-1">
                  <StarIcon width={14} height={14} />
                  {formatStars(repo.stars)}
                </span>
              )}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
