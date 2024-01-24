import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "995061213404-vbdmb63jpqa8ua22u5jhlc9t9f4r8h3m.apps.googleusercontent.com", //process.env.GOOGLE_CLIENT_ID,
      clientSecret: "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", //process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  pages: {
    signIn: "/auth/signIn-123",
  },

  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@example.com")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    async session({ session, token, user }) {
      session.user.username = session.user.name;
      session.user.uid = token.sub;
      return session;
    },
  },
});

// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId:
//         "995061213404-vbdmb63jpqa8ua22u5jhlc9t9f4r8h3m.apps.googleusercontent.com", //process.env.GOOGLE_CLIENT_ID,
//       clientSecret: "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", //process.env.GOOGLE_CLIENT_SECRET
//     }),
//   ],
//   secret: "nuodata@123#",
//   callbacks: {
//     async session({ session, token, user }) {
//       session.jti = token.jti;
//       return session;
//     },
//     // async jwt({ token, user, account, profile, isNewUser }) {
//     //   if (user) {
//     //     token.id = user.id;
//     //   }
//     //   if (account) {
//     //     token.accessToken = account.access_token;
//     //   }
//     //   return token;
//     // },
//   },
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: '/auth/signin',
//   },
// });
