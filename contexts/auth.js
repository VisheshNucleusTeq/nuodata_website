import { InnerLayout } from "./inner-layout";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { SetProjectDetailsAction,  SetConnectDetailsAction} from "../Redux/action";

export const ProtectRoute = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails.isLogged);

  const authPage = ["/", "/how-it-works", "/sign-in", "/sign-up"];
  if (authPage.includes(router.pathname)) {
    return children;
  } else {

    if(router.pathname != "/data-modernization"){
      dispatch(SetProjectDetailsAction({}));
      dispatch(SetConnectDetailsAction({}));
    }

    return (
      <InnerLayout componentName={router.pathname}>{children}</InnerLayout>
    );
  }
};
