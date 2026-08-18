"use client";

import { useState } from "react";

const modes = {
  train: {
    label: "Train",
    title: "How do we know the run is healthy?",
    description: "Track loss, gradient norm, throughput, utilization, memory, and sample quality as one connected system.",
    metrics: [["loss", "3.21"], ["tok/s", "38.4k"], ["MFU", "41%"]],
  },
  scale: {
    label: "Scale",
    title: "Where does parallel efficiency go?",
    description: "Separate compute, communication, bubbles, and stragglers before reaching for another parallelism strategy.",
    metrics: [["GPUs", "8"], ["eff.", "84%"], ["step", "622ms"]],
  },
  evaluate: {
    label: "Evaluate",
    title: "Which behavior changed—and why?",
    description: "Aggregate scores are an index. Failure categories, uncertainty, and controlled prompts are the explanation.",
    metrics: [["tasks", "12"], ["Δ pass@1", "+4.8"], ["CI", "±1.2"]],
  },
} as const;

type Mode = keyof typeof modes;

export function ResearchConsole() {
  const [mode, setMode] = useState<Mode>("train");
  const active = modes[mode];

  return (
    <div className="research-console">
      <div className="console-topline">
        <span>INTERACTIVE / RESEARCH LENS</span>
        <span className="live-dot">prototype</span>
      </div>
      <div className="console-tabs" role="tablist" aria-label="Research lens">
        {(Object.keys(modes) as Mode[]).map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={mode === key}
            className={mode === key ? "active" : ""}
            onClick={() => setMode(key)}
          >
            {modes[key].label}
          </button>
        ))}
      </div>
      <div className="console-body">
        <div>
          <span className="eyebrow">Question</span>
          <h2>{active.title}</h2>
          <p>{active.description}</p>
        </div>
        <div className="console-metrics">
          {active.metrics.map(([label, value]) => (
            <div key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>
      </div>
      <div className={`signal-chart signal-${mode}`} aria-label={`Illustrative ${active.label.toLowerCase()} signal chart`}>
        {Array.from({ length: 28 }).map((_, index) => <i key={index} />)}
      </div>
      <p className="data-caption">Illustrative interface data · live experiment integrations come later</p>
    </div>
  );
}
