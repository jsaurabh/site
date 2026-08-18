"use client";

import { useMemo, useState } from "react";

export function ScalingExplorer() {
  const [budget, setBudget] = useState(24);
  const values = useMemo(() => {
    const params = Math.round(Math.pow(budget / 24, 0.48) * 110);
    const tokens = Math.round(params * 20 * (0.92 + budget / 600));
    const hours = Math.max(1, Math.round(budget / 2.7));
    return { params, tokens, hours };
  }, [budget]);

  return (
    <section className="scaling-explorer" aria-labelledby="scaling-title">
      <div className="lab-kicker"><span>LAB 02</span><span>Interactive sketch</span></div>
      <div className="scaling-copy">
        <div>
          <span className="eyebrow">Compute allocation</span>
          <h2 id="scaling-title">Small-model scaling explorer</h2>
          <p>Adjust a hypothetical compute budget. This preview shows how a future lab can turn a research result into something explorable.</p>
        </div>
        <label>
          <span>Compute budget</span>
          <strong>{budget} PFLOP-days</strong>
          <input
            type="range"
            min="4"
            max="160"
            value={budget}
            onChange={(event) => setBudget(Number(event.target.value))}
          />
        </label>
      </div>
      <div className="scaling-output">
        <div><strong>{values.params}M</strong><span>parameters</span></div>
        <div><strong>{values.tokens / 1000 >= 1 ? `${(values.tokens / 1000).toFixed(1)}B` : `${values.tokens}M`}</strong><span>training tokens</span></div>
        <div><strong>{values.hours}h</strong><span>estimated run</span></div>
        <div className="scaling-curve" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <i key={i} style={{ height: `${18 + Math.pow(i + 1, 1.45) * (budget / 115)}px` }} />
          ))}
        </div>
      </div>
      <p className="data-caption">Concept preview only · values are illustrative, not experimental claims</p>
    </section>
  );
}
