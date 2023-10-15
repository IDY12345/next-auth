'use client'
import React,{useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ResetPassword({params}:{params:{email:string}}) {


    const params1=useSearchParams();

    const [authState, setAuthState] = useState({
        password:"",
        password_confirmation:""
    })
    const [errors, setErrors] = useState<registerErrorType>()
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit=(event:React.FormEvent)=>
    {
        event.preventDefault();
        setLoading(true);
        axios.post("/api/auth/reset-password",{
            email:params.email,
            signature:params1.get("signature"),
            password:authState.password,
            password_confirmation:authState.password_confirmation
        })

        .then((res)=>
        {
            setLoading(false)
            const response=res.data;
            if(response.status==400)
            {
                toast.error(response.message)
            }
            else if(response.status==200)
            {
                toast.success(response.message)
            }
        })
        .catch((err)=>
        {
            setLoading(false);
            console.log("Error : ",err)
        })
    }

  return (
    <>
    <ToastContainer />
    <div className='h-screen w-screen flex justify-center items-center'>
        <div className='w-[500px] p-5 rounded-lg shadow-lg'>
            <h1 className='text-2xl font-bold'>Reset Password</h1>
            <p>Please Enter Your New Password!</p>
            <form onSubmit={handleSubmit}>
                <div className='mt-5'>
                    <label className='block font-bold p-1 text-xl'>Password</label>
                    <input type="password"
                     placeholder='Password' 
                     className='w-full outline-green-300 h-10 border rounded-md p-2'
                     onChange={(e)=>
                    {
                        setAuthState({...authState,password:e.target.value})
                    }}
                     />
                     <span className='text-red-500'>{errors?.password}</span>
                     <label className='block font-bold p-1 text-xl'>Confirm Password</label>
                    <input type="password"
                     placeholder='Confirm Password' 
                     className='w-full outline-green-300 h-10 border rounded-md p-2'
                     onChange={(e)=>
                    {
                        setAuthState({...authState,password_confirmation:e.target.value})
                    }}
                     />
                </div>
                <div className='mt-5 flex justify-center items-center p-1'>
                    <button className='w-1/2 bg-black p-2 rounded-lg text-white' disabled={loading}>
                        {loading?"Resetting...":"Reset"}
                    </button>
                </div>
                <div className='mt-5 flex justify-center items-center p-1'>
                    <Link href={'/login'} className='text-white w-1/2 text-center bg-black border rounded-lg p-2'>Back To Login</Link>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default ResetPassword