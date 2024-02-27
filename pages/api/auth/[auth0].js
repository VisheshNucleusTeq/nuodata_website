'use server'
import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
export default handleAuth({
  login: handleLogin({
    returnTo: "/sso/sso-login",
  }),
});