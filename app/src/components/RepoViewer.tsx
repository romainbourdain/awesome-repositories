import { useReadme } from "../hooks/useRepos";
import { formatStars } from "../lib/format";
import type { Repo } from "../types";
import { BookIcon, LinkExternalIcon, StarIcon } from "./Icons";
import { Markdown } from "./Markdown";

const chip = "rounded-full bg-accent-subtle px-2.5 py-0.5 text-xs font-medium text-accent";

export function RepoViewer({ repo }: { repo: Repo }) {
  const readme = useReadme(repo.slug, repo.hasReadme);
  const url = `https://github.com/${repo.repo}`;
  const [owner, name] = repo.repo.split("/");
  const topics = [...new Set([...repo.tags, ...(repo.topics ?? [])])];

  return (
    <article className="mx-auto max-w-5xl p-4 md:p-6">
      <a href="#/" className="mb-3 inline-block text-accent md:hidden">
        ← Back to list
      </a>
      <header className="mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-xl">
            <span className="text-muted">{owner}</span>
            <span className="text-muted">/</span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent hover:underline"
            >
              {name}
            </a>
            <span className="rounded-full border border-line px-2 text-xs font-medium text-muted">{repo.category}</span>
          </h2>
          <div className="flex items-center gap-2">
            {repo.stars !== null && (
              <span className="flex h-7 items-center gap-1.5 rounded-md border border-line bg-subtle px-3 text-xs font-medium">
                <StarIcon width={14} height={14} />
                Stars
                <span className="rounded-full bg-hover px-1.5">{formatStars(repo.stars)}</span>
              </span>
            )}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 items-center gap-1.5 rounded-md border border-line bg-subtle px-3 text-xs font-medium hover:bg-hover"
            >
              View on GitHub
              <LinkExternalIcon width={14} height={14} />
            </a>
          </div>
        </div>
        <p className="mt-3">{repo.description}</p>
        {(topics.length > 0 || repo.language) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {repo.language && (
              <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">{repo.language}</span>
            )}
            {topics.map((topic) => (
              <span key={topic} className={chip}>
                {topic}
              </span>
            ))}
          </div>
        )}
      </header>

      {repo.notes && (
        <section className="mb-4 rounded-md border border-line bg-accent-subtle p-4">
          <Markdown source={repo.notes} />
        </section>
      )}

      <section className="overflow-hidden rounded-md border border-line">
        <div className="flex items-center gap-2 border-b border-line bg-subtle px-4 py-2 text-sm font-semibold">
          <BookIcon className="text-muted" />
          README.md
        </div>
        <div className="p-4 md:p-8">
          {readme === null && <p className="text-muted">No README available for this repository.</p>}
          {readme?.status === "loading" && <p className="text-muted">Loading README…</p>}
          {readme?.status === "error" && <p className="text-red-500">{readme.message}</p>}
          {readme?.status === "ready" && (
            <Markdown source={readme.value} repo={repo.repo} branch={repo.defaultBranch} />
          )}
        </div>
      </section>
    </article>
  );
}
