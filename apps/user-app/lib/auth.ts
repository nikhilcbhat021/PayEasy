import NextAuth, { NextAuthConfig, Session, User, NextAuthResult } from "next-auth"
import { AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import * as db from '@repo/db/index.ts'
import { JWT } from "next-auth/jwt";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { GoogleProfile } from "next-auth/providers/google";
import { GitHubProfile } from "next-auth/providers/github";
import { randomUUID } from "crypto";

export const authOptions:NextAuthConfig = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                number: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            // TODO: User credentials type from next-aut
            async authorize(credentials: Partial<Record<"number" | "password", unknown>>) {
                // Do zod validation, OTP validation here
                if (!credentials?.number || !credentials?.password) {
                    throw new Error("Email and password are required");
                }
                const hashedPassword = await bcrypt.hash(credentials.password as string, 10);
                console.log(hashedPassword);
                const existingUser = await db.prismaClient.user.findFirst({
                    where: {
                        number: credentials.number
                    }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password as string, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            number: Number(existingUser.number)
                        } 

                        // return user;
                    }
                    // console.log("----------- NULL -----------");
                    return null;
                } else {
                    const createdUser = await db.prismaClient.user.create({
                        data: {
                            email: `${randomUUID()}.gmail.com`,
                            number: credentials.number as string,
                            password: hashedPassword,
                            balance: {
                                create: {
                                    amount: 0,
                                    locked: 0
                                }
                            }
                        },
                        omit: {
                            email: true,
                            password: true,
                            createdAt: true,
                        }
                    })

                    // console.log(createdUser);
                    return {
                        ...createdUser,
                        number: Number(createdUser.number)
                    };
                }
            }
        }),
        // GitHub({
        //     clientId: process.env.AUTH_GITHUB_ID,
        //     clientSecret: process.env.AUTH_GITHUB_SECRET,
        //     async profile(profile:GitHubProfile) {
        //         console.error("------------------")
        //         console.error(profile);
        //         console.error("------------------")
        //         return {
        //             ...profile,
        //             id: profile.id.toString(), // Convert id to string
        //             provider: profile.type,
        //             number: Number(profile.number) || 9113288329
        //         }
        //     }
        // }),
        // Google({
        //     clientId: process.env.CUSTOM_NAME__AUTH_GOOGLE_ID,
        //     clientSecret: process.env.CUSTOM_NAME__AUTH_GOOGLE_SECRET,

        //     async profile(profile) {
        //         console.error("------------------")
        //         console.error(profile.sub);
        //         console.error("------------------")
        //         return {
        //             ...profile,
        //             id: profile.sub.toString(), // Convert id to string
        //             provider: "User",
        //             number: Number(profile?.number) || 9113288329
        //         }
        //     }
        // })
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        jwt({ token, user }) {
            if (user) {
                // token.email = user.email;
                user.email = user.email ?? undefined;
                token.number = Number(user.number);
                token.id = user.id;
                token.profile = user?.provider;
            }
            return token;
        },
        session({ session, token }: {
            session: Session,
            token: JWT
        }) {
            // console.log("token");
            // console.log(token);
            if (session.user) {
                session.user.id = token.sub || "";
            }

            if (token?.number && session && session?.user) {
                // console.log("Number is - " + token.number);
                session.user.number = Number(token.number);
            }
            
            const ret = {
                ...session,
                user: {
                    ...session.user,
                    email: token.email ?? undefined,
                    id: token.sub as string,
                    number: token.number as number,
                    provider: token.provider as string
                }
            }

            return ret;
        },
    },
    // pages: {
        // signIn: '/api/auth/signin',
        // signOut: '/api/auth/signout'
    // }
    // trustHost: true
}

const result = NextAuth(authOptions);

export const handlers:NextAuthResult["handlers"] = result["handlers"];
export const signIn:NextAuthResult["signIn"] = result["signIn"];
export const signOut:NextAuthResult["signOut"] = result["signOut"];
export const auth:NextAuthResult["auth"] = result["auth"];

