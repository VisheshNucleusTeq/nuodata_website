import React from "react";
import { Image } from "antd";
import { useRouter } from "next/router";

function SignInLeft({ loginCss }) {
  const router = useRouter();

  return (
    <div className={loginCss.LogInLeft}>
      <div onClick={() => {
        router.push('/')
      }} className={loginCss.logo}>
        <Image src="../assets/images/logo.png" preview={false} />
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
