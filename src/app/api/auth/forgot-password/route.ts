import { User } from "@/model/User";
import { NextRequest,NextResponse } from "next/server";
import cryptoRandomString from "crypto-random-string";
import Cryptr from "cryptr";
import {render} from '@react-email/render'
import ForgotPasswordEmail from "@/emails/ForgotPasswordEmail";
import { sendEmail } from "@/config/mail";

export async function POST(request:NextRequest)
{
    const payload:ForgotPasswordType=await request.json()

    //Check User Email First

    const user=await User.findOne({email:payload.email})

    if(user==null)
    {
        return NextResponse.json({status:400,errors:{
            email:"No User Found With This Email."
        },
    })
    }

    //Generate Random String

    const randomStr=cryptoRandomString({length: 64, type: 'alphanumeric'});

    user.password_reset_token=randomStr;
    await user.save()


    //Encypt User Email

    const cryptr = new Cryptr(process.env.NEXTAUTH_SECRET!);
    const encryptedEmail=cryptr.encrypt(user.email);


    const url=`${process.env.APP_URL!}/reset-password/${encryptedEmail}?signature=${randomStr}`;

    try {
        const html=render(ForgotPasswordEmail({
            params:{
                name:user.name,
                url:url
            }
        }))

        //Send Email To User 

        await sendEmail(payload.email!,"Reset Password",html)

        return NextResponse.json({
                status:200,
                message:"Email sent successfully.Please Check Your Email"
        })
    } catch (error) {
        console.log("")
    }

}