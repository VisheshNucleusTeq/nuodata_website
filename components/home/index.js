import HomeCss from "../../styles/Home.module.css";
import Info from "./info";
import ThinkBig from "./thinkbig";
import EnterpriseChallenge from "./enterprisechallenge";
import ModernizeWithConfidence from "./modernizewithconfidence";
import Footer from "../common/footer";
import DataModernizationArchitecture from "./datamodernizationarchitecture";
// import { useEffect, useState } from "react";

export default function Home() {

  // const [origin, setOrigin] = useState("")
  // useEffect(() => {
  //   const origin =
  //     typeof window !== "undefined" && window.location.origin
  //       ? window.location.origin
  //       : "";
  //   console.log(origin);
  // }, [typeof window]);

  return (
    <>
      <Info HomeCss={HomeCss} />
      <ThinkBig HomeCss={HomeCss} />
      <EnterpriseChallenge HomeCss={HomeCss} />
      <div className={HomeCss.space} />
      <ModernizeWithConfidence HomeCss={HomeCss} />
      <DataModernizationArchitecture HomeCss={HomeCss} />
      <Footer HomeCss={HomeCss} />
    </>
  );
}
