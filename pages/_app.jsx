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
import { useDispatch, useSelector } from "react-redux";
import FullPageLoader from "../components/common/fullPageLoader";

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());
  
  const router = useRouter();
  const path = (/#!(\/.*)$/.exec(router.asPath) || [])[1];
  if (path) {
    router.replace(path);
  }
  const user = useSelector((state) => state.userDetails.isLogged);
  const isLoaderShow = useSelector((state) => state.loderShowHide.isLoaderShow);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {isLoaderShow && <FullPageLoader />}
          <ProtectRoute user={user}>
            <Component key={router.asPath} {...pageProps} />
          </ProtectRoute>
        </Hydrate>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
