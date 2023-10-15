type registerErrorType={
    email?:string;
    name?:string;
    password?:string;
}

type loginErrorType={
    email?:string;
    password?:string;
}

type confirmPasswordType={
    password?:string,
}

//Forgot Password Payload Type

type ForgotPasswordType={
    email?:string
}

type ResetPasswordType={
    email?:string,
    signature?:string,
    password?:string
    password_confirmation?:string
}