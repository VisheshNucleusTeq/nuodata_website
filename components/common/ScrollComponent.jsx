import React from "react";
import Scrollcss from "../../styles/Scroll.module.css";
const ScrollComponent = (Component) => (props) => {
  return (
    <div className={Scrollcss.mainSection}>
      <Component {...props} />
    </div>
  );
};
export default ScrollComponent;
