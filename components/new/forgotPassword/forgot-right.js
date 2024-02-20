import React from "react";
import { Image } from "antd";
import { useRouter } from "next/router";

function ForgotRight({ loginCss }) {
  return (
    <div className={loginCss.LogInLeft}>
      <div className={loginCss.leftImage}>
        <iframe
          src="/all-graph/forgot_password/forgot-password.html"
          className={loginCss.rightImg}
        />
      </div>
    </div>
  );
}

export default ForgotRight;
