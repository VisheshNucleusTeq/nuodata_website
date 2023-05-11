import Home from "../components/home";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Main(props) {
  const router = useRouter();
  useEffect(() => {
    if (router.asPath != "/") {
      router.push(router.asPath)
    }
  }, [router.asPath]);

  return (
    <>
      <title>NuoData | Home</title>
      <Home />
    </>
  );
}
