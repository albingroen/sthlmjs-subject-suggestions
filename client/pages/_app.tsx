import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppRouter } from "../../server/server";
import { withTRPC } from "@trpc/next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="max-w-screen-lg mx-auto py-12 px-6">
      <Component {...pageProps} />
    </main>
  );
}

export default withTRPC<AppRouter>({
  config() {
    return { url: "http://localhost:1337/trpc" };
  },
})(MyApp);
