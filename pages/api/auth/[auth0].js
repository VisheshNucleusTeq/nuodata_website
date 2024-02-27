// // import { handleAuth } from "@auth0/nextjs-auth0";
// import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
// export default handleAuth({
//   login: handleLogin({
//     returnTo: "/sso/sso-login",
//   }),
// });

// import { handleAuth } from "@auth0/nextjs-auth0";
import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
const auth = handleAuth({
  login: handleLogin({
    returnTo: "/sso/sso-login",
  }),
}); // Create authentication middleware using handleAuth function

export default auth; // Export auth as the default export

export { auth as GET, auth as POST }; // Export auth as named exports for both GET and POST methods