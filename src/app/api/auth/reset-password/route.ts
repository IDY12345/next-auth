import { User } from "@/model/User";
import { NextRequest,NextResponse } from "next/server";
import cryptoRandomString from "crypto-random-string";
import Cryptr from "cryptr";
import {render} from '@react-email/render'
import ForgotPasswordEmail from "@/emails/ForgotPasswordEmail";
import bcrypt from 'bcryptjs'
import { connect } from "@/database/mongo.config";
import vine,{errors} from '@vinejs/vine'
import ErrorReporter from '@/validator/ErrorReporter';
import { resetPasswordSchema } from "@/validator/authSchema";

connect()

export async function POST(request:NextRequest){
    const payload:ResetPasswordType=await request.json()

    //You have to add validation here to check both password are same.
    try{
    const validator = vine.compile(resetPasswordSchema)
        validator.errorReporter = () => new ErrorReporter()
        // const body=await request.json();
        const output=await validator.validate(payload)


    //To Decrypt String

    const cryptr = new Cryptr(process.env.NEXTAUTH_SECRET!);
    const decryptedString=cryptr.decrypt(payload.email!)

    const user=await User.findOne({email:decryptedString,password_reset_token:payload.signature})

    if(user==null || user==undefined) 
    {
        return NextResponse.json({
            status:400,
            message:"Reset URL is Not Correct.Please Try Again!"
        })
    }

    const salt=bcrypt.genSaltSync(10);
    const newPassword=bcrypt.hashSync(output.password!,salt);
    user.password=newPassword;
    user.password_reset_token=null;
    await user.save()

    return NextResponse.json({
        status:200,
        message:"Password Changed Successfully.Please Login With the New Password!"
    })
}catch(error)
{
    if (error instanceof errors.E_VALIDATION_ERROR) {
        return NextResponse.json({status:400,errors:error.messages },{status:200})
      }
}
}