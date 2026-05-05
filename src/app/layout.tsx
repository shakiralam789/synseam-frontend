import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

import { getMetaTitle } from "@/lib/utils";

export const metadata: Metadata = {
  title: getMetaTitle("Insight. Execution. Visibility."),
  description:
    "SynSeam connects you with experts and deploys virtual assistants to turn insights into action—and builds the websites and SEO that drive growth.",
  authors: [{ name: "SynSeam" }],
  openGraph: {
    type: "website",
    title: getMetaTitle("Insight. Execution. Visibility."),
    description:
      "SynSeam connects you with experts and deploys virtual assistants to turn insights into action—and builds the websites and SEO that drive growth.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/712700df-bbfc-4386-ba4a-3c1282b36205/id-preview-7c40d3f1--a94fea98-cc13-4c9a-a8ef-0946db32bc3a.lovable.app-1777819884088.png",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: getMetaTitle("Insight. Execution. Visibility."),
    description:
      "SynSeam connects you with experts and deploys virtual assistants to turn insights into action—and builds the websites and SEO that drive growth.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/712700df-bbfc-4386-ba4a-3c1282b36205/id-preview-7c40d3f1--a94fea98-cc13-4c9a-a8ef-0946db32bc3a.lovable.app-1777819884088.png",
    ],
  },
};

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background font-sans antialiased">
        <NextTopLoader
          color="hsl(221 83% 53%)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px hsl(221 83% 53%),0 0 5px hsl(221 83% 53%)"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {children}
          </Providers>
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
