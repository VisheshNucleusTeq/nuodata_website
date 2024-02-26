// import NextAuth from "next-auth";
// import KeycloakProvider from "next-auth/providers/keycloak";

// export default NextAuth({
//   providers: [
//     KeycloakProvider({
//       clientId: "nuodata-auth",
//       clientSecret: "ZSWUY1Yf4jJiYgZDIDx9TOnZ6zzJBE57",
//       issuer: "https://api.dev.nuodata.io/identity/realms/nuodata",
//     }),
//   ],
//   pages: {
//     signIn: "/auth/signIn-123",
//   },
//   callbacks: {
//     async session({ session, token, user }) {
//       session.user.id = token.id;
//       session.accessToken = token.accessToken;
//       return session;
//     },
//     async jwt({ token, user, account, profile, isNewUser }) {
//       if (user) {
//         token.id = user.id;
//       }
//       if (account) {
//         token.accessToken = account.access_token;
//       }
//       return token;
//     },
//   },
//   // callbacks: {
//   //   async signIn({ account, profile }) {
//   //     if (account.provider === "keycloak") {
//   //       return profile.email_verified && profile.email.endsWith("@example.com");
//   //     }
//   //     return true;
//   //   },
//   //   async session({ session, token, user }) {
//   //     session.user.username = session.user.name;
//   //     session.user.uid = token.sub;
//   //     return session;
//   //   },
//   // },
// });