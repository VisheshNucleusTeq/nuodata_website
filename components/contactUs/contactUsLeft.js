import React from "react";
import { Image } from "antd";
import { useRouter } from "next/router";

function ContactUsLeft({ signUpCss }) {
  const router = useRouter();

  return (
    <div className={signUpCss.signUpLeft}>
      <div
        style={{ padding: "2rem",cursor:"pointer" }}
        onClick={() => {
          router.push("/");
        }}
        className={signUpCss.logo}
      >
        <Image src="/auth/logo.png" preview={false} />
      </div>
      <div className={signUpCss.leftImage}>
        <Image
          width={"100%"}
          src="/auth/image.png"
          preview={false}
        />
      </div>
    </div>
  );
}

export default ContactUsLeft;
