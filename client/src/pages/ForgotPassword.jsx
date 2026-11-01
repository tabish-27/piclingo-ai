import React, { useState } from 'react'
import SummaryApi from '../helpers/SummaryApi'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
  
    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(SummaryApi.forgotPassword.url, {
                method: SummaryApi.forgotPassword.method,
                headers: {
                "Content-Type" : "application/json",
                },
                body: JSON.stringify({email})
            })

            const resData = await res.json()
            if(resData.success){
                toast.success(resData.message)
            }
            if(resData.error){
                toast.warning(resData.message)
            }
        } 
        catch (error) {
            toast.warning(error?.message || 'Something went wrong')
        }
        finally{
            setLoading(false)
        }
    }


  return (
    <div className="w-[50%] h-[80vh] flex flex-col gap-8 justify-center items-center mx-auto">
      <h2 className='text-5xl max-sm:text-3xl font-bold text-center'>Forgot Password</h2>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='mx-auto input-field min-w-78'
          required
        />
        <button type="submit" className='btn btn-bg btn-plus mt-4'>{loading ? 'Sending...' : 'Send Reset Link'}</button>
      </form>
    </div>
  )
}

export default ForgotPassword