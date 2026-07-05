import type { AppProps } from "next/app";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
