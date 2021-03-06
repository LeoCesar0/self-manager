import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AuthContextProvider } from "../Context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My Financial App</title>
        <meta
          name="App built to help me"
          content="Generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
