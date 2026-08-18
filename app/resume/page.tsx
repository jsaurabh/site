import type { Metadata } from "next";
import { PrintButton } from "../components/PrintButton";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = { title: "Résumé", description: "Résumé preview for Saurabh." };

export default function ResumePage() {
  return <div id="top"><SiteHeader /><main className="resume page-shell">
    <header><div><span className="eyebrow">Résumé / Preview structure</span><h1>Saurabh</h1><p>Software engineer · Applied ML · Language-model systems</p></div><PrintButton /></header>
    <div className="resume-note"><strong>Placeholder content</strong><span>This page establishes the final visual structure. Verified employment and education details should be inserted from the current résumé before publication.</span></div>
    <section><h2>Profile</h2><p>Software engineer with experience building applied machine-learning systems and a current research focus on language-model training, post-training, evaluation, and inference.</p></section>
    <section><h2>Selected research</h2><div className="resume-rows"><article><span>2026</span><div><h3>Training a Transformer Language Model From Scratch</h3><p>First-principles implementation and controlled training study. In progress.</p></div></article><article><span>2026</span><div><h3>Efficient Distributed Training</h3><p>Planned GPU profiling, Triton, DDP, FSDP2, and scaling-efficiency study.</p></div></article><article><span>2020</span><div><h3>TrashNet</h3><p>Applied object detection for automated recycling in collaboration with CleanRobotics.</p></div></article></div></section>
    <section><h2>Experience</h2><div className="resume-placeholder-lines"><span /><span /><span /></div></section><section><h2>Education</h2><div className="resume-placeholder-lines short"><span /><span /></div></section>
  </main><SiteFooter /></div>;
}
