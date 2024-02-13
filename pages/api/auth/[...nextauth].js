import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export default NextAuth({
  providers: [
    KeycloakProvider({
      clientId: "nuodate-auth", 
      clientSecret: "ZSWUY1Yf4jJiYgZDIDx9TOnZ6zzJBE57", 
      issuer: "https://api.dev.nuodata.io/identity/realms/nuodata",
    }),
  ],
  pages: {
    signIn: "/auth/signIn-123",
  },

  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "keycloak") {
        return profile.email_verified && profile.email.endsWith("@example.com");
      }
      return true;
    },
    async session({ session, token, user }) {
      session.user.username = session.user.name;
      session.user.uid = token.sub;
      return session;
    },
  },
});
