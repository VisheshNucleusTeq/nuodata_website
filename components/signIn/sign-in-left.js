import React from "react";
import { Image } from "antd";

function SignInLeft({ loginCss }) {
  return (
    <div className={loginCss.LogInLeft}>
      <div className={loginCss.logo}>
        <Image src="../assets/images/login-logo.png" preview={false} />
      </div>
      <div className={loginCss.leftImage}>
        <Image
          width={"100%"}
          src="../assets/images/image.png"
          preview={false}
        />
      </div>
    </div>
  );
}

export default SignInLeft;
