import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getProfile, upsertProfile } from "./apiProfiles";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        console.log("USER ", user);
        await upsertProfile({ email: user.email, name: user.name });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const profile = await getProfile(session.user.email);
      session.user.profileId = profile.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
