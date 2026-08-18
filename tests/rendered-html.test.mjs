import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the finished research homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Saurabh — Research Engineering/);
  assert.match(html, /I’m a software engineer interested in language-model systems/);
  assert.match(html, /Articles/);
  assert.match(html, /View all/);
  assert.match(html, /TrashNet/);
  assert.doesNotMatch(html, /In progress|Planned|Forthcoming/);
  assert.doesNotMatch(html, /ResearchConsole|Interactive lab|Selected research|Research position/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("renders primary destination pages", async () => {
  for (const [path, phrase] of [
    ["/articles", "Technical writing and project notes"],
    ["/articles/trashnet", "Evaluation and Results"],
    ["/articles/content-filtering-recommender", "TMDB5000 Dataset"],
    ["/research", "Questions, implementations"],
    ["/lab", "just read the result"],
    ["/writing", "Long-form arguments"],
    ["/notes", "Smaller findings"],
    ["/about", "elegant model meets"],
  ]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), new RegExp(phrase), path);
  }
});

test("ports every published legacy article as a working destination", async () => {
  for (const [path, phrase] of [
    ["/articles/trashnet", "CleanRobotics and TrashBot"],
    ["/articles/content-filtering-recommender", "Recommendations based on metadata"],
    ["/articles/localization-for-autonomous-vehicles", "Formalizing Localization"],
    ["/articles/machine-learning-pipelines-part-i", "Feature Generation"],
  ]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), new RegExp(phrase), path);
  }
});

test("uses native internal links so hosted navigation cannot be intercepted", async () => {
  const paths = [
    "app/page.tsx",
    "app/components/SiteHeader.tsx",
    "app/articles/page.tsx",
    "app/articles/[slug]/page.tsx",
    "app/writing/page.tsx",
  ];
  const files = await Promise.all(paths.map((path) => readFile(new URL(path, root), "utf8")));
  for (const file of files) assert.doesNotMatch(file, /next\/link|<Link/);

  const response = await render("/");
  const html = await response.text();
  assert.match(html, /href="\/articles\/trashnet"/);
});

test("removes disposable starter code and dependency", async () => {
  await assert.rejects(access(new URL("app/_sites-preview", root)));
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("package.json", root), "utf8"),
  ]);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.match(layout, /Research Engineering/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
