"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="button button-quiet print-button"
    >
      Print or save as PDF
    </button>
  );
}
