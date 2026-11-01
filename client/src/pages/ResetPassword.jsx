import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import SummaryApi from '../helpers/SummaryApi'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from 'react-toastify'

const ResetPassword = () => {

    const {token} = useParams()
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [lenError, setLenError] = useState('')


    const handleReset = async(e) =>{
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.warning("Passwords don't match");
            return;
        }

        try {
            if(password.length < 8) {
                toast.warning("Password must be at least 8 characters long");
                return;
            }

            const res = await fetch(`${SummaryApi.resetPassword.url}/${token}`, {
                method: SummaryApi.resetPassword.method,
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({password})
            })

            const resData = await res.json()
            if(resData.success){
                toast.success(resData.message)
                setTimeout(() => navigate('/login'), 2000); // redirect to login
            }
            if(resData.error){
                toast.warning(resData.message)
            }
        } catch (err) {
            toast.error(err?.message || 'Reset failed')
        }
    }

  return (
    <div className="w-[50%] h-[80vh] flex flex-col gap-8 justify-center items-center mx-auto">
      <h2 className='text-5xl max-sm:text-3xl font-bold text-center'>Reset Your Password</h2>
      <form onSubmit={handleReset} className='flex flex-col'>
        <label className=' flex justify-between items-center relative'>
            <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={(e) => {
                const newVal = e.target.value
                setPassword(newVal), 
                setLenError(newVal.length < 8 ? "Minimum 8 characters required" : "")
            }}
            className='mx-auto input-field min-w-78 my-2'
            required
            />
            <i onClick={() => setShowPassword((prev) => !prev)} className='cursor-pointer absolute right-4'> {showPassword ? (<FaEyeSlash />) : (<FaEye />)}</i>
        </label>
        {lenError && <p className='text-red-400 -mt-1 text-sm ml-2'>{lenError}</p>}

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='mx-auto input-field min-w-78 my-2' 
          required
        />

        <button type="submit" className='btn mt-4'>Reset Password</button>
      </form>
    </div>
  )
}

export default ResetPassword