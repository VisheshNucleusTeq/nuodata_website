import HomeCss from '../../styles/Home.module.css'
import Info from "./info";
import WhatIsNuoData from './whatIsNuoData';
import EnterpriseChallenge from './enterpriseChallenge';
import KeyBenefits from './keyBenefits';
import Footer from '../common/footer';

export default function Home() {
  return (
    <>
      <Info HomeCss={HomeCss} />
      <WhatIsNuoData HomeCss={HomeCss} />
      <EnterpriseChallenge HomeCss={HomeCss} />
      <KeyBenefits HomeCss={HomeCss} />
      <Footer HomeCss={HomeCss} />
    </>
  );
}
