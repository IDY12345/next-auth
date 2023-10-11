import {connect} from '@/database/mongo.config'
import { NextRequest,NextResponse } from 'next/server';
import {registerSchema} from '@/validator/authSchema'
import vine,{errors} from '@vinejs/vine'
import ErrorReporter from '@/validator/ErrorReporter';
import bcrypt from 'bcryptjs'
import { User } from '@/model/User';


interface UserPayload{
    name:string;
    email:string;
    password:string;
    avatar?:string;
}

//For DB connection
connect();

export async function POST(request:NextRequest)
{
    try {
        const validator = vine.compile(registerSchema)
        validator.errorReporter = () => new ErrorReporter()
        const body:UserPayload=await request.json();
        const output=await validator.validate(body)

        // Check If Email Already Exists??

        const user=await User.findOne({email:output.email})

        if(user)
        {
            return NextResponse.json({staus:400,errors:{
                email:"Email is already taken.Please Use another email to register."
            }},{status:200})
        }
        else
        {
            
        // * Encrypting the Password

        const salt=bcrypt.genSaltSync(10);

        output.password=bcrypt.hashSync(output.password,salt)

        await User.create(output)
        return NextResponse.json({status:200,message:"Account Created Successfully!Please Login to Your Account."},{status:200});
        }

    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json({status:400,errors:error.messages },{status:200})
          }
    }

}