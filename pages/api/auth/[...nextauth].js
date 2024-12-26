import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "1.0A",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.oauth_token;
        token.accessTokenSecret = account.oauth_token_secret;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.accessTokenSecret = token.accessTokenSecret;
      
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
