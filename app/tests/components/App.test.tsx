import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../../src/App";
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

const repos = [
  repo({ slug: "astral-sh__uv", repo: "astral-sh/uv", description: "Fast Python package manager" }),
  repo({ slug: "yt-dlp__yt-dlp", repo: "yt-dlp/yt-dlp", description: "Audio and video downloader" }),
];

beforeEach(() => {
  window.location.hash = "";
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      if (url.endsWith("index.json")) return new Response(JSON.stringify(repos));
      if (url.endsWith("astral-sh__uv.md")) return new Response("# uv readme\n\nInstall with pip.");
      return new Response("not found", { status: 404 });
    }),
  );
});

test("filtre la liste quand on cherche", async () => {
  const user = userEvent.setup();
  render(<App />);
  expect(await screen.findByRole("link", { name: /yt-dlp\/yt-dlp/ })).toBeInTheDocument();

  await user.type(screen.getByRole("searchbox", { name: "Search repositories" }), "python");

  expect(screen.queryByRole("link", { name: /yt-dlp\/yt-dlp/ })).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: /astral-sh\/uv/ })).toBeInTheDocument();
});

test("affiche le README du repo cliqué", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(await screen.findByRole("link", { name: /astral-sh\/uv/ }));

  expect(await screen.findByRole("heading", { name: "uv readme" })).toBeInTheDocument();
  expect(screen.getByText("Install with pip.")).toBeInTheDocument();
});
