import { SessionProvider } from "next-auth/react";

import { RecoilRoot } from "recoil";

import { Poppins, Inter } from "next/font/google";

import Layout from "../../components/Layout/Layout";

import "@/styles/globals.css";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-poppins",
});
export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-inter",
});


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <RecoilRoot>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </RecoilRoot>
    </>
  );
}
