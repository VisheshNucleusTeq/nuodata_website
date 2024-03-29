import { useRouter } from "next/router";
import { useEffect } from "react";
import Home from "../components/home";

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
      <Home />
    </>
  );
}
