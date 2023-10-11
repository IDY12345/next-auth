import React from 'react'

function ForgotPassword() {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <div className='w-[500px] p-5 rounded-lg shadow-lg'>
            <h1 className='text-2xl font-bold'>Forgot Password?</h1>
            <p>To Recover Your Password.Please Enter Your Email Below ,You Will Recieve an Email to Change Your Password.</p>
            <form>
                <div className='mt-5'>
                    <label className='block font-bold p-1 text-xl'>Email</label>
                    <input type="email" placeholder='example@gmail.com' className='w-full outline-green-300 h-10 border rounded-md p-2'/>
                </div>
                <div className='mt-5 flex justify-center items-center p-1'>
                    <button className='w-1/2 bg-black p-2 rounded-lg text-white'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ForgotPassword