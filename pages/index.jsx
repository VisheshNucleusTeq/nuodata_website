import Home from "../components/home";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Main(props) {
  const router = useRouter();
  useEffect(() => {
    if (router.asPath != "/" && router.asPath != "/#benefitsID") {
      router.push(router.asPath);
    }
  }, [router.asPath]);

  return (
    <>
      <title>NuoData | Home</title>

      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="NuoData" />
      <meta
        property="og:description"
        content="ONE PLATFORM FOR ALL ENTERPRISE DATA MODERNIZATION & MANAGEMENT NEEDS."
      />
      <meta property="og:site_name" content="NuoData" />
      <meta property="og:url" content="https://nuodata.io/" />
      <meta
        property="og:image"
        itemProp="image"
        content="https://nuodata.io/logo.png"
      />
      <meta property="og:image:type" content="image/png" />

      <Home />
    </>
  );
}
