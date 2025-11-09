import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import { SITE_URL } from "@/lib/host";



export const metadata: Metadata = {
  title: "NoteHub — simple notes app",
  description: "Make, look up, and handle private memos with labels, screens, and glimpses.",
  openGraph: {
    title: 'NoteHub — simple notes app',
    description: 'Make, look up, and handle private memos with labels, screens, and glimpses.',
    url: SITE_URL,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      }
    ]
  }
};


const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
})

export default function RootLayout({ children, modal }: Readonly<{ children: React.ReactNode; modal: React.ReactNode; }>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
          {modal}
        </TanStackProvider>
        </body>
      </html>
  );
}
