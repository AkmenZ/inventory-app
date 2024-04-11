import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
    firstName: string;
    lastName: string;
    role: string;
  }
  interface Session {
    user: User & {
      username: string;
      firstName: string;
      lastName: string;
      role: string;
    };
    token: {
      username: string;
      firstName: string;
      lastName: string;
      role: string;
    };
  }
}
