import type { Metadata } from "next";
import { BrowserLabPreview } from "../../components/BrowserLabPreview";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

export const metadata: Metadata = { title: "Browser Model Bench", description: "A preview of an in-browser WebGPU language-model laboratory." };

export default function BrowserModelPage() {
  return <div id="top"><SiteHeader /><main><header className="page-intro page-shell"><span className="eyebrow">Lab 01 / WebGPU</span><h1>Browser model bench</h1><p>A design prototype for transparent, local inference. No model weights are downloaded in this preview.</p></header><div className="page-shell lab-stack"><BrowserLabPreview full /></div></main><SiteFooter /></div>;
}
