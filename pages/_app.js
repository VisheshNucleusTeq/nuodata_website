import React from "react";
import "antd/dist/antd.css";
import "../styles/globals.css";
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


// import { QueryClient, QueryClientProvider } from "react-query";

// import "antd/dist/antd.css";
// import "../styles/globals.css";
// import { ProtectRoute } from "../contexts/auth";

// const queryClient = new QueryClient();

// function MyApp({ Component, pageProps }) {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ProtectRoute>
//         <Component {...pageProps} />
//       </ProtectRoute>
//     </QueryClientProvider>
//   );
// }

// export default MyApp;