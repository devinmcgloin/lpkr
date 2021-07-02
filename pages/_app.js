import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div id="__lpkr_popper"></div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
