type registerErrorType={
    email?:string;
    name?:string;
    password?:string;
}

type loginErrorType={
    email?:string;
    password?:string;
}

//Forgot Password Payload Type

type ForgotPasswordType={
    email?:string
}