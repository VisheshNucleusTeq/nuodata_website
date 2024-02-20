import React from "react";
import { Image } from "antd";
import { useRouter } from "next/router";

function SignInRight({ loginCss }) {
  const router = useRouter();

  return (
    <div className={loginCss.LogInLeft}>
      <div className={loginCss.leftImage}>
        <iframe
          src="/all-graph/sign_in/login.html"
          className={loginCss.rightImg}
        />
      </div>
    </div>
  );
}

export default SignInRight;
