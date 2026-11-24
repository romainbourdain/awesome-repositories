import { resolveReadmeUrl } from "../../src/lib/readme";

test("laisse les URL absolues et les ancres telles quelles", () => {
  expect(resolveReadmeUrl("https://example.com/a.png", "o/r", "main", "image")).toBe("https://example.com/a.png");
  expect(resolveReadmeUrl("#install", "o/r", "main", "link")).toBe("#install");
});

test("résout une image relative vers raw.githubusercontent.com", () => {
  expect(resolveReadmeUrl("./docs/logo.png", "o/r", "dev", "image")).toBe(
    "https://raw.githubusercontent.com/o/r/dev/docs/logo.png",
  );
});

test("résout un lien relatif vers la page blob GitHub", () => {
  expect(resolveReadmeUrl("docs/guide.md", "o/r", "main", "link")).toBe(
    "https://github.com/o/r/blob/main/docs/guide.md",
  );
});
