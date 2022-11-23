import "antd/dist/antd.css";
import "../styles/globals.css";
import { ProtectRoute } from "../contexts/auth";
function MyApp({ Component, pageProps }) {
  return (
    <ProtectRoute>
      <Component {...pageProps} />
    </ProtectRoute>
  );
}

export default MyApp;
