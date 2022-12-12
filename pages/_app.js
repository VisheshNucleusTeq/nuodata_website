import React from "react";
import "antd/dist/antd.css";
import "animate.css/animate.min.css";

import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";

import { wrapper, store } from "../Redux/store";
import { ProtectRoute } from "../contexts/auth";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ProtectRoute>
            <Component {...pageProps} />
          </ProtectRoute>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
// export default MyApp;
