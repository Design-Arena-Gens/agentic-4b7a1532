import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "macOS",
  description: "Interactive macOS experience on the web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sf antialiased">{children}</body>
    </html>
  );
}
