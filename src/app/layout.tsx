// src/app/layout.tsx
import type { Metadata } from "next";
import Navigation from "../components/Navigation";

// Import global CSS and Google Font
import "../styles/globals.css";
import { League_Spartan } from "next/font/google";
import { NetflixFooter } from "@/components/Footer";
import ReduxProvider from "@/providers/redux-provider";
import QueryProvider from "@/providers/QueryClient-Provider";
import { checkAuth } from "@/lib/actions/checkAuthAction";
// import { checkAuth } from "@/lib/actions/checkAuthAction";

// Load font
const neuton = League_Spartan({ subsets: ["latin"], weight: "400" });

// Metadata for SEO
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// Root layout component
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await checkAuth();

  return (
    <html lang="en">
      <head>
        {/* Favicon for the browser */}
        <link rel="icon" href="/favicon.ico" />

        {/* Apple touch icon for home screen */}
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon.ico" />

        {/* For Android Chrome */}
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon.ico" />
      </head>
      <body
        className={`${neuton.className} antialiased select-none duration-300`}
      >
        <QueryProvider>
          <ReduxProvider>
            <Navigation user={user ?? undefined} />
            <main>{children}</main>
            <NetflixFooter />
            <div id="modal-root" />
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
