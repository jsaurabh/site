import contentFiltering from "../content/articles/content-filtering-recommender.md?raw";
import localization from "../content/articles/localization-for-autonomous-vehicles.md?raw";
import pipelines from "../content/articles/machine-learning-pipelines-part-i.md?raw";
import trashnet from "../content/articles/trashnet.md?raw";
import { writing } from "./site-data";

const bodies: Record<string, string> = {
  "content-filtering-recommender": contentFiltering,
  "localization-for-autonomous-vehicles": localization,
  "machine-learning-pipelines-part-i": pipelines,
  trashnet,
};

export const articles = writing.map((article) => ({
  ...article,
  body: bodies[article.slug],
}));
