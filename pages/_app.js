import "../styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as Fathom from "fathom-client";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    Fathom.load("GDPVRAHF", {
      includedDomains: ["www.lpkr.net", "lpkr.vercel.app"],
      url: ["gecko.lpkr.net"],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    router.events.on("routeChangeComplete", onRouteChangeComplete);
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);

  return (
    <>
      <div id="__lpkr_popper"></div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
