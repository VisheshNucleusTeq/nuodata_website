// import { handleAuth } from "@auth0/nextjs-auth0";
import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
export default handleAuth({
  login: handleLogin({
    returnTo: "/sso/sso-login",
  }),
});