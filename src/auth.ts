import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginFormValues } from "./types/auth";
import { AuthService } from "./services/auth.service";
import { getErrorMessage } from "./utils/error";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Start Session",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as LoginFormValues;

        if (!email || !password) {
          return null;
        }

        try {
          const response = await AuthService.login({ email, password });
          const { data } = response;

          if (data && data.access_token && data.user) {
            return {
              id: data.user.id,
              accessToken: data.access_token,
              name: data.user.name,
              lastname: data.user.lastname,
              email: data.user.email,
              role: data.user.role,
              emailVerified: data.user.emailVerified,
            };
          }

          return null;
        } catch (error) {
          console.error("Login error:", getErrorMessage(error));
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.name = user.name;
        token.lastname = user.lastname;
        token.role = user.role;
        token.emailVerified = user.emailVerified as boolean;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.lastname = token.lastname as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
