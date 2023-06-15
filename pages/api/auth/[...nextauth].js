import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "995061213404-vbdmb63jpqa8ua22u5jhlc9t9f4r8h3m.apps.googleusercontent.com", //process.env.GOOGLE_CLIENT_ID,
      clientSecret: "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", //process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  secret: "nuodata@123#",
  callbacks: {
    async session({ session, token, user }) {
      session.jti = token.jti;
      return session;
    },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   if (user) {
    //     token.id = user.id;
    //   }
    //   if (account) {
    //     token.accessToken = account.access_token;
    //   }
    //   return token;
    // },
  },
  session: {
    strategy: "jwt",
  },
});
