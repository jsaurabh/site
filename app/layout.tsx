import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "jsaurabh.dev";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: { default: "Saurabh — Research Engineering", template: "%s — Saurabh" },
    description: "Research engineering across language-model training, post-training, evaluation, and inference systems.",
    applicationName: "Saurabh Research",
    openGraph: {
      type: "website",
      title: "Saurabh — Research Engineering",
      description: "Language-model systems explored through implementation, measurement, and clear technical writing.",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Saurabh — Research Engineering" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Saurabh — Research Engineering",
      description: "Language-model systems explored through implementation, measurement, and clear technical writing.",
      images: ["/og.png"],
    },
  };
}

export const viewport: Viewport = { themeColor: "#f1eee4", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
