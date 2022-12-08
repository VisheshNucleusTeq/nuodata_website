import { InnerLayout } from "./inner-layout";
import { useRouter } from "next/router";
export const ProtectRoute = ({ children }) => {
  const router = useRouter();
  // return children;
  console.log(router);
  const authPage = ["/", "/how-it-works", "/sign-in", "Sign_up"];
  if (authPage.includes(router.pathname)) {
    return children;
  } else {
    return (
      <InnerLayout componentName={children.type.name}>{children}</InnerLayout>
    );
  }
};
