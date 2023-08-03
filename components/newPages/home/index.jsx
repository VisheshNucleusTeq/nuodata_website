import HomeCss from "../../../styles/newStyles/homeNew.module.css";
import Info from "./info";
import ThinkBig from "./thinkbig";
import EnterpriseChallenge from "./enterprisechallenge";
import ModernizeWithConfidence from "./modernizewithconfidence";
import DataModernizationArchitecture from "./datamodernizationarchitecture";

// import Footer from "../common/footer";


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