import { NextPage } from "next";
import { Fragment } from "react";
import type { AppProps } from "next/app";

import { Layout } from '@/components/Layout'
import "@/styles/globals.css";

type NextPageWithSkipLayout = NextPage & { skipLayout: boolean }
type AppPropsWithSkipLayout = AppProps & { Component: NextPageWithSkipLayout }


const getLayout = (Component: NextPageWithSkipLayout) => {
  const skipLayout = Component.skipLayout;
  return skipLayout ? Fragment : Layout
}

export default function App({ Component, pageProps }: AppPropsWithSkipLayout) {
  const Layout = getLayout(Component);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
