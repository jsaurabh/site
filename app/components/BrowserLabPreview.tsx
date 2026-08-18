"use client";

import { useMemo, useState } from "react";

const models = {
  nano: { label: "NanoLM · 110M", download: 78, memory: 184, speed: 42 },
  small: { label: "SmallLM · 360M", download: 244, memory: 612, speed: 19 },
  compact: { label: "CompactLM · 1.1B", download: 708, memory: 1620, speed: 7 },
};

type ModelKey = keyof typeof models;

export function BrowserLabPreview({ full = false }: { full?: boolean }) {
  const [model, setModel] = useState<ModelKey>("small");
  const [quant, setQuant] = useState("q4");
  const [context, setContext] = useState(2048);
  const [message, setMessage] = useState("Explain why attention is memory-bound in one paragraph.");
  const [ran, setRan] = useState(false);
  const selected = models[model];
  const factor = quant === "q4" ? 1 : quant === "q8" ? 1.72 : 3.4;
  const estimates = useMemo(() => ({
    download: Math.round(selected.download * factor),
    memory: Math.round(selected.memory * factor + context * 0.035),
    speed: Math.max(1, Math.round(selected.speed / Math.sqrt(factor))),
  }), [selected, factor, context]);

  return (
    <section className={`browser-lab ${full ? "browser-lab-full" : ""}`} aria-labelledby="browser-lab-title">
      <div className="lab-kicker"><span>LAB 01</span><span>Interface prototype</span></div>
      <div className="browser-lab-grid">
        <div className="lab-controls">
          <span className="eyebrow">In-browser inference</span>
          <h2 id="browser-lab-title">A WebGPU model bench, before the weights arrive.</h2>
          <p>Configure a model and inspect the likely client-side cost. The final version can detect WebGPU, download quantized weights, and run entirely on the visitor&apos;s device.</p>
          <label>
            Model
            <select value={model} onChange={(event) => { setModel(event.target.value as ModelKey); setRan(false); }}>
              {Object.entries(models).map(([key, value]) => <option value={key} key={key}>{value.label}</option>)}
            </select>
          </label>
          <label>
            Quantization
            <select value={quant} onChange={(event) => { setQuant(event.target.value); setRan(false); }}>
              <option value="q4">4-bit</option>
              <option value="q8">8-bit</option>
              <option value="fp16">FP16</option>
            </select>
          </label>
          <label>
            Context window <strong>{context.toLocaleString()} tokens</strong>
            <input type="range" min="512" max="8192" step="512" value={context} onChange={(event) => { setContext(Number(event.target.value)); setRan(false); }} />
          </label>
        </div>
        <div className="lab-terminal">
          <div className="terminal-bar"><span /><span /><span /><b>local-model.session</b></div>
          <div className="terminal-stats">
            <div><span>DOWNLOAD</span><strong>{estimates.download} MB</strong></div>
            <div><span>MEMORY</span><strong>~{estimates.memory} MB</strong></div>
            <div><span>EST. SPEED</span><strong>{estimates.speed} tok/s</strong></div>
          </div>
          <label className="prompt-box">
            <span>PROMPT</span>
            <textarea value={message} onChange={(event) => { setMessage(event.target.value); setRan(false); }} />
          </label>
          <button className="run-button" onClick={() => setRan(true)}>Run interface preview <span>⌘↵</span></button>
          <div className={`terminal-output ${ran ? "show" : ""}`} aria-live="polite">
            {ran ? (
              <>
                <span className="terminal-label">PLACEHOLDER RESPONSE</span>
                <p>Attention repeatedly moves queries, keys, values, and intermediate scores through memory. For common sequence lengths, that data movement can become the bottleneck before the GPU exhausts its arithmetic capacity.</p>
              </>
            ) : <p className="terminal-empty">Ready. No model is downloaded in this design preview.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
