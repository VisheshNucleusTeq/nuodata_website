import React from "react";
import "antd/dist/antd.css";
import "animate.css/animate.min.css";
import "reactflow/dist/style.css";
import "../styles/globals.css";

import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { useRouter } from "next/router";

import { wrapper, store } from "../Redux/store";
import { ProtectRoute } from "../contexts/auth";
import { useSelector } from "react-redux";
import { SessionProvider } from "next-auth/react";
import FullPageLoader from "../components/common/fullPageLoader";
import { UserProvider } from "@auth0/nextjs-auth0/client";

function MyApp({ Component, pageProps, session }) {
  const [queryClient] = React.useState(() => new QueryClient());

  const router = useRouter();
  const path = (/#!(\/.*)$/.exec(router.asPath) || [])[1];
  if (path) {
    router.replace(path);
  }
  const user = useSelector((state) => state.userDetails.isLogged);
  const isLoaderShow = useSelector((state) => state.loderShowHide.isLoaderShow);

  return (
    // <SessionProvider session={session}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            {isLoaderShow && <FullPageLoader />}
            <ProtectRoute user={user}>
              <UserProvider>  
                <Component key={router.asPath} {...pageProps} />
              </UserProvider>
            </ProtectRoute>
          </Hydrate>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Provider>
    // </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
