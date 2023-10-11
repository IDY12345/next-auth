import { AuthOptions, ISODateString, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/database/mongo.config";
import { User as UserModel} from "@/model/User";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";


export type CustomSession={
    user?:CustomUser;
    expires:ISODateString;  
}

export type CustomUser={
    id?:string|null,
    name?:string|null,
    email?:string|null,
    role?:string|null,
    avatar?:string|null
}


export const authOptions: AuthOptions = {
    pages:{
        signIn:"/login",
    },
    callbacks:{
        async signIn({ user, account, profile, email, credentials }) {

            try {
                connect();
                const findUser=await UserModel.findOne({email:user.email})
                if(findUser){
                    return true
                }
                await UserModel.create({name:user.name,email:user.email,role:"User"});
                return true;
            } catch (error) {
                console.log("Sign In Error",error)
                return false;   
            }

           
          },

          async jwt({ token, user }:{token:JWT,user:CustomUser}) {
            if(user)
            {
                user.role=user?.role==null ? "User":user?.role
                token.user=user;
            }
            return token
          },

          async session({ session, token,user }:{session:CustomSession,token:JWT,user:User}) {
            session.user=token.user as CustomUser;

            return session
          },
    },
    providers: [
        CredentialsProvider({
            name: "Next Auth",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Enter Your Email",
                },
                password: {
                    label: "Password",
                    type: "password",
                }
            },
            async authorize(credentials, req) {
                connect();

                const user=await UserModel.findOne({email:credentials?.email});

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
          })
    ]
}