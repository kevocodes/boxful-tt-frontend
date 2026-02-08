import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    accessToken: string;
    name: string;
    lastname: string;
    role: string;
    emailVerified: boolean;
  }

  interface Session {
    user: User & DefaultSession["user"];
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    accessToken: string;
    name: string;
    lastname: string;
    role: string;
    emailVerified: boolean;
  }
}
