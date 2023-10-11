import mongoose from 'mongoose'

export function connect()
{
    mongoose.connect(process.env.MONGODB_URI!,{
        tls:true,

    })
    .then(()=>
    {
        console.log("Database Connected Successfully.")
    })
    .catch((err)=>console.log(`There is some error : ${err}`))
}