import Home from "../../components/newPages/home/index";
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
      <Home />
    </>
  );
}
