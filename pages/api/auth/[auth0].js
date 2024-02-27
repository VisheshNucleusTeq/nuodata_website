// import { handleAuth } from "@auth0/nextjs-auth0";
import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0";

const logoutUrl = [
  `${process.env.AUTH0_ISSUER_BASE_URL}/protocol/openid-connect/logout?`,
  `client_id=${process.env.AUTH0_CLIENT_ID}`,
  `&returnTo=${process.env.AUTH0_BASE_URL}/sso/sso-logout`,
  `&logout_uri=${process.env.AUTH0_BASE_URL}/sso/sso-logout`,
  `&post_logout_redirect_uri=${process.env.AUTH0_BASE_URL}/sso/sso-logout`,
];
export default handleAuth({
  login: handleLogin({
    returnTo: "/sso/sso-login",
  }),
  logout: handleLogout({ returnTo: logoutUrl.join("") }),
});
