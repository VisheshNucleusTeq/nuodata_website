import HomeCss from "../../styles/Home.module.css";
import Info from "./info";
import ThinkBig from "./thinkbig";
import EnterpriseChallenge from "./enterprisechallenge";
import ModernizeWithConfidence from "./modernizewithconfidence";
// import ModernizeWithConfidenceNew from "./modernizewithconfidence-new";
import Footer from "../common/footer";
import DataModernizationArchitecture from "./datamodernizationarchitecture";
export default function Home() {
  return (
    <>
      <Info HomeCss={HomeCss} />
      <ThinkBig HomeCss={HomeCss} />
      <EnterpriseChallenge HomeCss={HomeCss} />
      <div className={HomeCss.space}></div>
      <ModernizeWithConfidence HomeCss={HomeCss} />
      {/* <ModernizeWithConfidenceNew HomeCss={HomeCss} /> */}
      <DataModernizationArchitecture HomeCss={HomeCss} />
      <Footer HomeCss={HomeCss} />
    </>
  );
}
