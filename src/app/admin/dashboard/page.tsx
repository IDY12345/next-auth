import React from 'react'
import { CustomSession, authOptions } from '@/app/api/auth/[...nextauth]/option'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import SignOut from '@/components/SignOut'

export default async function AdminDashboard() {
    const session:CustomSession|null=await getServerSession(authOptions)

  return (
    <div className='flex justify-center items-center px-10 pt-10 flex-col'>
        <h1>Welcome to the Admin Dashboard</h1>
        <h1 className='text-sm font-bold'>{JSON.stringify(session)}</h1>

        <SignOut type='Admin'/>
    </div>
  )
}
