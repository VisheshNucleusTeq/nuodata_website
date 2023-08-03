import HomeCss from "../../../styles/newStyles/home.module.css";
import Info from "./info";
import ThinkBig from "./thinkbig";
import EnterpriseChallenge from "./enterprisechallenge";
import ModernizeWithConfidence from "./modernizewithconfidence";
// import Footer from "../common/footer";
import DataModernizationArchitecture from "./datamodernizationarchitecture";

export default function Home() {
  return (
    <>
      <Info HomeCss={HomeCss} />
      <ThinkBig HomeCss={HomeCss} />
      <EnterpriseChallenge HomeCss={HomeCss} />
      <div className={HomeCss.space} />
      <ModernizeWithConfidence HomeCss={HomeCss} />
      <DataModernizationArchitecture HomeCss={HomeCss} />
      {/* <div className={HomeCss.space} />
      <DataModernizationArchitecture HomeCss={HomeCss} />
      <Footer HomeCss={HomeCss} /> */}
    </>
  );
}