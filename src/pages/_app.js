import "@/styles/globals.css";
import Layout from "@/components/layout/Layout";
import "../styles/ShinyText.css";
import "../styles/Loader.css"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export default function App({ Component, pageProps }) {

  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}
