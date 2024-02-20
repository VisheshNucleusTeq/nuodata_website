import React from "react";
import { Image } from "antd";
import { useRouter } from "next/router";

function signUpRight({ signUpCss }) {
  const router = useRouter();

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

export default signUpRight;
