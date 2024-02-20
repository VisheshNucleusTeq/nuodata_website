import { InnerLayout } from "./inner-layout";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import {
  SetProjectDetailsAction,
  SetConnectDetailsAction,
} from "../Redux/action";
import { useEffect } from "react";

export const ProtectRoute = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authPage = [
    "/",
    "/how-it-works",
    "/sign-in",
    "/sign-up",
    "/contact-us",
    "/data-management",
    "/sso",
    "/sso-login",
    "/events",
    "/test",
    "/new-pages",
    "/new/sign-in",
    "/new/sign-up",
    "/new/contact-us",
    "/new/reset-password",
    "/new/forgot-password",
    "/new",
  ];
  const user = useSelector((state) => state.userDetails.isLogged);

  useEffect(() => {
    if (!authPage.includes(router.pathname) && !user) {
      router.push("/");
    } else if (["/sign-in", "/sign-up"].includes(router.pathname) && user) {
      router.push("/ingestion/workspace/");
    }

    if (!authPage.includes(router.pathname)) {
      if (router.pathname != "/data-modernization") {
        dispatch(SetProjectDetailsAction({}));
        dispatch(SetConnectDetailsAction({}));
      }
    }
  }, [children, user]);

  if (authPage.includes(router.pathname)) {
    return children;
  } else {
    return (
      <InnerLayout componentName={router.pathname}>{children}</InnerLayout>
    );
  }
};
