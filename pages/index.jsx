import Home from "../components/home";
import {useRouter} from 'next/router';
import { useEffect } from "react";

export default function Main(props) {
  const router = useRouter()

  useEffect(() => {
    if(router.pathname != "/"){
      alert(router.pathname)
    }
  },[router.pathname])

  return (
    <>
      <title>NuoData | Home</title>
      <h2>pathname:- {router.asPath}</h2>
            {/* <h2>query:- {router.query}</h2>
            <h2>asPath:- {router.asPath}</h2> */}
      <Home />
    </>
  );
}
