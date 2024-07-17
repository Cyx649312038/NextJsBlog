import "../styles/globals.css";
import Layout from "@/components/layout/layout";
import Head from "next/head";
import NotificationProvider from "@/store/notificationProvider";
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NotificationProvider>
        <Layout>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </NotificationProvider>
    </SessionProvider>
  );
}

export default MyApp;
