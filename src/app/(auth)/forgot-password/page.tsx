'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<loginErrorType>()

    const handleSubmit=(event:React.FormEvent)=>
    {
        event.preventDefault();
        setLoading(true)
        axios.post("/api/auth/forgot-password",{email:email})
        .then((res)=>
        {
            setLoading(false)
            const response=res.data;
            if(response.status==200)
            {
                //Email Sent
                toast.success(response.message)
            }
            else if(response.status==400)
            {
                setErrors(response.errors)
            }
            else if(response.status==500)
            {
                toast.error(response.message)
            }
        })
        .catch((err)=>
        {
            setLoading(false)
            console.log("Error : ",err)
        })
        
    }

  return (
    <>
    <ToastContainer />
    <div className='h-screen w-screen flex justify-center items-center'>
        <div className='w-[500px] p-5 rounded-lg shadow-lg'>
            <h1 className='text-2xl font-bold'>Forgot Password?</h1>
            <p>To Recover Your Password.Please Enter Your Email Below ,You Will Recieve an Email to Change Your Password.</p>
            <form onSubmit={handleSubmit}>
                <div className='mt-5'>
                    <label className='block font-bold p-1 text-xl'>Email</label>
                    <input type="email"
                     placeholder='example@gmail.com' 
                     className='w-full outline-green-300 h-10 border rounded-md p-2'
                     onChange={(e)=>
                    {
                        setEmail(e.target.value)
                    }}
                     />
                     <span className='text-red-500'>{errors?.email}</span>
                </div>
                <div className='mt-5 flex justify-center items-center p-1'>
                    <button className='w-1/2 bg-black p-2 rounded-lg text-white' disabled={loading}>
                        {loading?"Sending...":"Send"}
                    </button>
                </div>
            </form>
        </div>
    </div>
    </>

  )
}

export default ForgotPassword