import { AppProps } from "next/app";

import { useRouter } from "next/router";
import { Poppins, Inter } from "next/font/google";

import Layout from "../../components/Layout/Layout";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import "../styles/globals.css";

import type { Session } from "next-auth";
import Providers from "../../components/UI/Providers/Providers";

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

interface AppPropsExtended {
  session: Session;
}
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<AppPropsExtended>) {
  const router = useRouter();

  const excludeLayoutPages = ["/auth/signin", "/auth/signup"];
  const isExcludedLayout = excludeLayoutPages.includes(router.asPath);

  return (
    <Providers session={session}>
      {isExcludedLayout ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </Providers>
  );
}
