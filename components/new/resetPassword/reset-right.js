import React from "react";

function ResetRight({ loginCss }) {
  return (
    <div className={loginCss.LogInLeft}>
      <div className={loginCss.leftImage}>
        <iframe
          src="/all-graph/reset_password/reset-password.html"
          className={loginCss.rightImg}
        />
      </div>
    </div>
  );
}

export default ResetRight;
