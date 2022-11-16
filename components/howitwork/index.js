import HowItWorkCss from '../../styles/HowItWork.module.css'

import Footer from '../common/footer';
import Info from './info';

export default function HowItWork() {
  return (
    <>
      <Info HowItWorkCss={HowItWorkCss} />
      <Footer HowItWorkCss={HowItWorkCss} />
    </>
  );
}
