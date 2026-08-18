import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jsaurabh.dev"),
  title: { default: "Saurabh — Research Engineering", template: "%s — Saurabh" },
  description: "Research engineering across language-model training, post-training, evaluation, and inference systems.",
  applicationName: "Saurabh Research",
  openGraph: {
    type: "website",
    title: "Saurabh — Research Engineering",
    description: "Language-model systems explored through implementation, measurement, and clear technical writing.",
    images: [{ url: "/og-minimal.png", width: 1536, height: 1024, alt: "Saurabh — Language-model systems, experiments, and notes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saurabh — Research Engineering",
    description: "Language-model systems explored through implementation, measurement, and clear technical writing.",
    images: ["/og-minimal.png"],
  },
};

export const viewport: Viewport = { themeColor: "#f1eee4", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
