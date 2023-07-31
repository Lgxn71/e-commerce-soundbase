import { SessionProvider } from "next-auth/react";

import { RecoilRoot } from "recoil";

import { useRouter } from "next/router";

import { Poppins, Inter } from "next/font/google";

import Layout from "../../components/Layout/Layout";

import "../styles/globals.css";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
  const router = useRouter();

  const excludeLayoutPages = ["/auth/signin", "/auth/signup"];
  const isExcludedLayout = excludeLayoutPages.includes(router.asPath);

  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        {isExcludedLayout ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </SessionProvider>
    </RecoilRoot>
  );
}
