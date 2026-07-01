import { betterAuth, roblox } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },
    databaseHooks: {
        user: {
            create: {
                before: (user) => {
                    return {
                        data: {
                            ...user,
                            role: user.role || "user"
                        }
                    };
                }
            }
        }
    },
    database: mongodbAdapter(db, {
        client
    }),
    user: {
        additionalFields: {
            role: {
                default: "user",
            },
            plan: {
                defaultValue: "user_free",
            }
        }
    },
    // plugins: [
    //     admin()
    // ]
});