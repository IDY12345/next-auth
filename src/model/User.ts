import mongoose,{Schema} from "mongoose";

const userSchema=new Schema({
    name:{
        required:[true,"Name Field is Required"],
        type:Schema.Types.String,   
    },
    email:{
        required:[true,"Email Field is Required"],
        type:String,
        trim:true,
        lowercase:true,
        unique:true,
    },
    password:{
        required:false,
        type:String,
    },
    avatar:{
        required:false,
        type:String
    },
    role:{
        required:false,
        type:String,
        default:"User", 
    },
    password_reset_token:{
        required:false,
        type:String,
        trim:true,
    },
})

export const User=mongoose.models.User || mongoose.model("User",userSchema);