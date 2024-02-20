import React from "react";

function ContactUsRight({ signUpCss }) {

  return (
    <div className={signUpCss.signUpLeft}>
      <div className={signUpCss.leftImage}>
        <iframe
          src="/all-graph/sign_up/Signup.html"
          className={signUpCss.rightImg}
        />
      </div>
    </div>
  );
}

export default ContactUsRight;
