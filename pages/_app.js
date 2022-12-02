import React from "react";
import "antd/dist/antd.css";
import "../styles/globals.css";
import "animate.css/animate.min.css";

// import "../public/assets/js/jquery.min.js"
// import "../public/assets/js/custom"
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ProtectRoute } from "../contexts/auth";

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ProtectRoute>
          <Component {...pageProps} />
        </ProtectRoute>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}