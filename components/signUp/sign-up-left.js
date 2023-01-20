import React from "react";
import { Image } from "antd";

function SignUpLeft({ signUpCss }) {
  return (
    <div className={signUpCss.signUpLeft}>
      <div className={signUpCss.logo}>
        <Image src="../assets/images/logo.png" preview={false} />
      </div>
      <div className={signUpCss.leftImage}>
        <Image
          width={"100%"}
          src="../assets/images/image.png"
          preview={false}
        />
      </div>
    </div>
  );
}

export default SignUpLeft;
