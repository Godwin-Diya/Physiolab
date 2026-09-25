import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Physiolab | Interactive Human Physiology",
  description:
    "Explore human physiology through interactive simulations, experiments and clinical reasoning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}