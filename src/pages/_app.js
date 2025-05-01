import "@/styles/globals.css";
import Layout from "@/components/layout/Layout";
import "../styles/ShinyText.css";
import "../styles/Loader.css"

export default function App({ Component, pageProps }) {

  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}
