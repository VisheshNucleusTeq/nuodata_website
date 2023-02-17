import React from "react";
import { Image } from "antd";
import { useRouter } from "next/router";

function SignInLeft({ loginCss }) {
  const router = useRouter();

  return (
    <div className={loginCss.LogInLeft}>
      <div
        style={{ padding: "2rem",cursor:"pointer" }}
        onClick={() => {
          router.push("/");
        }}
        className={loginCss.logo}
      >
        <Image src="/auth/logo.png" preview={false} />
      </div>
      <div className={loginCss.leftImage}>
        <Image
          width={"100%"}
          src="/auth/image.png"
          preview={false}
        />
      </div>
    </div>
  );
}

export default SignInLeft;
