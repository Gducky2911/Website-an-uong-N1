import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import Github from "next-auth/providers/github";
import { prisma } from "./connect";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: Boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: Boolean;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // Facebook({
    //     clientId: process.env.FACEBOOK_ID!,
    //     clientSecret: process.env.FACEBOOK_SECRET!,
    // })
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
      }

      return session;
    },
    async jwt({ token }) {
      const userInDb = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });
      token.isAdmin = userInDb?.isAdmin!;
      return token;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
