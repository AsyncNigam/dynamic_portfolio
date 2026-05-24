import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nigam Prasad Sahoo | Android & Systems Engineer",
  description:
    "Building post-quantum cryptographic systems, event-driven microservices, and high-performance Android applications. Exploring the intersection of security, scalability, and elegant engineering.",
  keywords: [
    "Android Engineer",
    "Systems Engineer",
    "Post-Quantum Cryptography",
    "Microservices",
    "Kotlin",
    "Next.js",
  ],
  authors: [{ name: "Nigam Prasad Sahoo" }],
  openGraph: {
    title: "Nigam Prasad Sahoo | Android & Systems Engineer",
    description:
      "Post-quantum crypto, event-driven microservices, and premium Android experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
