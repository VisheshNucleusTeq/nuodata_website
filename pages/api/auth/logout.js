'use server'
import { getSession } from "@auth0/nextjs-auth0";

export default (req, res) => {
  const session = getSession({ req });
  let path = `${
    process.env.AUTH0_ISSUER_BASE_URL
  }/protocol/openid-connect/logout?post_logout_redirect_uri=${encodeURIComponent(
    process.env.NEXTAUTH_URL
  )}/sso/sso-logout`;

  if (session?.id_token) {
    path = path + `&id_token_hint=${session.id_token}`;
  } else {
    path = path + `&client_id=${process.env.AUTH0_CLIENT_ID}`;
  }
  res.redirect(path);
};