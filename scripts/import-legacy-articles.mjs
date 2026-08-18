import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const legacyRoot = path.join(projectRoot, "work", "original-blog");
const contentRoot = path.join(projectRoot, "content", "articles");
const outputImageRoot = path.join(projectRoot, "public", "legacy-output");

const sources = [
  { kind: "markdown", path: "_posts/2020-02-26-ml-pipelines.md", slug: "machine-learning-pipelines-part-i" },
  { kind: "notebook", path: "_notebooks/2020-04-21-localization.ipynb", slug: "localization-for-autonomous-vehicles" },
  { kind: "notebook", path: "_notebooks/2020-04-29-tmdb5000.ipynb", slug: "content-filtering-recommender" },
  { kind: "notebook", path: "_notebooks/2020-06-23-trashnet.ipynb", slug: "trashnet" },
];

function cleanMarkdown(markdown) {
  return markdown
    .replace(/\r\n/g, "\n")
    .replace(/\.\.\/images\//g, "/legacy-images/")
    .replace(
      /\{%\s*include\s+screenshot\s+url="([^"]+)"\s+caption="([^"]+)"\s*%\}/g,
      "![$2](/legacy-images/$1)",
    )
    .replace(/\{%\s*fn\s+(\d+)\s*%\}/g, "[$1]")
    .replace(/\[([^\]]+)\]\.\((https?:\/\/[^)]+)\)/g, "[$1]($2)")
    .replace(/\{\{\s*'([^']+)'\s*\|\s*fndetail:\s*\d+\s*\}\}/g, "$1")
    .replace(/\{\{\s*"([^"]+)"\s*\|\s*fndetail:\s*\d+\s*\}\}/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function stripFrontmatter(markdown) {
  return markdown.replace(/^---\n[\s\S]*?\n---\n/, "");
}

async function convertMarkdown(source) {
  let markdown = await readFile(path.join(legacyRoot, source.path), "utf8");
  markdown = stripFrontmatter(markdown);
  markdown = markdown.replace(/^# .*\n+/, "");
  return cleanMarkdown(markdown);
}

async function convertNotebook(source) {
  const notebook = JSON.parse(await readFile(path.join(legacyRoot, source.path), "utf8"));
  const chunks = [];
  let skippedNotebookHeader = false;
  let imageIndex = 0;

  for (const cell of notebook.cells ?? []) {
    const cellSource = Array.isArray(cell.source) ? cell.source.join("") : String(cell.source ?? "");
    if (cell.cell_type === "markdown") {
      if (!skippedNotebookHeader) {
        skippedNotebookHeader = true;
        continue;
      }
      if (cellSource.trim()) chunks.push(cellSource.trim());
      continue;
    }

    if (cell.cell_type !== "code" || !cellSource.trim()) continue;
    chunks.push(`\`\`\`python\n${cellSource.trimEnd()}\n\`\`\``);

    for (const output of cell.outputs ?? []) {
      const png = output?.data?.["image/png"];
      if (png) {
        imageIndex += 1;
        const fileName = `${source.slug}-${String(imageIndex).padStart(2, "0")}.png`;
        const encoded = Array.isArray(png) ? png.join("") : png;
        await writeFile(path.join(outputImageRoot, fileName), Buffer.from(encoded, "base64"));
        chunks.push(`![Notebook output](/legacy-output/${fileName})`);
        continue;
      }

      const plain = output?.data?.["text/plain"] ?? output?.text;
      if (plain) {
        const text = (Array.isArray(plain) ? plain.join("") : String(plain)).trim();
        if (text) chunks.push(`\`\`\`text\n${text}\n\`\`\``);
      }
    }
  }

  return cleanMarkdown(chunks.join("\n\n"));
}

await mkdir(contentRoot, { recursive: true });
await mkdir(outputImageRoot, { recursive: true });

for (const source of sources) {
  const markdown = source.kind === "notebook"
    ? await convertNotebook(source)
    : await convertMarkdown(source);
  await writeFile(path.join(contentRoot, `${source.slug}.md`), `${markdown}\n`, "utf8");
}

console.log(`Imported ${sources.length} published articles.`);
