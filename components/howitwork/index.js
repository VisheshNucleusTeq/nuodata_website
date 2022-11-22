import HowItWorkCss from '../../styles/HowItWork.module.css'

import Footer from '../common/footer';
import Info from './info';
import WhatIsNuoData from './whatIsNuoData';
import ModernizationWorks from './modernization-works';
export default function HowItWork() {
  return (
    <>
      <Info HowItWorkCss={HowItWorkCss} />
      <WhatIsNuoData HowItWorkCss={HowItWorkCss} />
      <ModernizationWorks HowItWorkCss={HowItWorkCss} />
      <Footer HowItWorkCss={HowItWorkCss} />
    </>
  );
}

