import {connect} from '@/database/mongo.config'
import { NextRequest,NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'
import { User } from '@/model/User';

//For DB connection
connect();

export async function POST(request:NextRequest)
{
    const salt=bcrypt.genSaltSync(10);
    const password=bcrypt.hashSync("123456",salt);
    await User.create({
        email:"admin@gmail.com",
        password:password,
        name:"Admin",
        role:"Admin"
    })

    return NextResponse.json({status:200,message:"Admin User Created Successfully"})
}