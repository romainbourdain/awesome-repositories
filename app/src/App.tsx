import { useState } from "react";
import { CategoryFilter } from "./components/CategoryFilter";
import { RepoIcon } from "./components/Icons";
import { RepoList } from "./components/RepoList";
import { RepoViewer } from "./components/RepoViewer";
import { SearchBar } from "./components/SearchBar";
import { useRepos } from "./hooks/useRepos";
import { useSelectedSlug } from "./hooks/useSelectedSlug";
import { ALL_CATEGORIES, categoriesOf, searchRepos } from "./lib/search";

export function App() {
  const repos = useRepos();
  const selected = useSelectedSlug();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL_CATEGORIES);

  if (repos.status === "loading") return <p className="p-6 text-muted">Loading…</p>;
  if (repos.status === "error") return <p className="p-6 text-red-500">{repos.message}</p>;

  const all = repos.value;
  const results = searchRepos(all, query, category);
  const current = all.find((r) => r.slug === selected) ?? null;
  const counts: [string, number][] = [
    [ALL_CATEGORIES, all.length],
    ...categoriesOf(all).map((c): [string, number] => [c, all.filter((r) => r.category === c).length]),
  ];

  return (
    <div className="flex h-screen flex-col bg-canvas text-fg">
      <header className="flex items-center gap-4 border-b border-line bg-header px-4 py-3">
        <a href="#/" className="flex shrink-0 items-center gap-2 font-semibold">
          <RepoIcon width={24} height={24} />
          <h1 className="text-sm md:text-base">awesome-repositories</h1>
        </a>
        <div className="max-w-md flex-1">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </header>
      <div className="border-b border-line bg-header">
        <CategoryFilter counts={counts} value={category} onChange={setCategory} />
      </div>
      <div className="grid min-h-0 flex-1 md:grid-cols-[24rem_1fr]">
        <aside className={`min-h-0 flex-col border-line md:flex md:border-r ${current ? "hidden" : "flex"}`}>
          <p className="border-b border-line bg-subtle px-4 py-2 text-xs font-semibold" aria-live="polite">
            {results.length} {results.length === 1 ? "repository" : "repositories"}
          </p>
          <nav aria-label="Repositories" className="min-h-0 flex-1 overflow-y-auto">
            <RepoList repos={results} selected={selected} />
          </nav>
        </aside>
        <main className={`min-h-0 overflow-y-auto ${current ? "" : "hidden md:block"}`}>
          {current ? (
            <RepoViewer key={current.slug} repo={current} />
          ) : (
            <p className="p-8 text-muted">Select a repository to read its README.</p>
          )}
        </main>
      </div>
    </div>
  );
}
