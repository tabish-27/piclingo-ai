import React, { useState } from 'react'
import { MdEmail, MdLocationPin, MdPhone } from "react-icons/md";
import SummaryApi from '../helpers/SummaryApi';
import { toast } from 'react-toastify';

const ContactUs = () => {
//   const {user} = useSelector(state => state.auth)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
        return {
          ...prev,
          [name]: value
        }
    })
  }
  // console.log("input data", data)

  const handleSubmit = async(e) =>{
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(SummaryApi.contactUs.url, {
        method: SummaryApi.contactUs.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })  

      const dataApi = await response.json()
      if(dataApi.success){
        toast.success(dataApi.message)
        setData({
          name: "",
          email:"",
          message: "",
        })
      }
      if(dataApi.error){
        console.log("inside try support", dataApi.message)
        toast.error(dataApi.message)
      }
    } 
    catch (error) {
      console.log("error occured in EditProfile", error)
      toast.warning("Error updating profile")
    }
    setLoading(false)
  }

  return (
    <section className="min-h-screen py-12 p-4 md:px-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Need Help?</h2>
        <p className="text-center opacity-50 mb-10">Our support team is here to assist you. Reach out anytime!</p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div className="dark:bg-[#333333] bg-slate-100 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" name="name" value={data.name} required placeholder="Full Name" onChange={handleOnChange} className="input-field"/>
              <input type="email" name="email" value={data.email} required placeholder="Email Address" onChange={handleOnChange} className="input-field"/>
              <textarea type="text" name="message" value={data.message} required placeholder="Your Message" rows="5" onChange={handleOnChange} className="input-field"/>
              <button className="btn-2 py-2 font-semibold">{loading ? "Sending..." : "Send Message"}</button>
            </form>
          </div>

          {/* Contact Info / Help Options */}
          <div className="dark:bg-[#333333] bg-slate-100 p-6 rounded-2xl flex flex-col justify-between">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Quick Help</h3>
              <ul className="space-y-3 ">
                <li className='flex gap-2 items-center'>
                  <i className='opacity-75'><MdEmail/></i> 
                  <p className='opacity-75'>Email: </p>
                  <span className="opacity-100">support@piclingo.com</span>
                </li>
                <li className='flex gap-2 items-center'>
                  <i className='opacity-75'><MdPhone/></i> 
                  <p className='opacity-75'>Phone: </p>
                  <span className="opacity-100">+91 98765 43210</span>
                </li>
                <li className='flex gap-2 items-center'>
                  <i className='opacity-75'><MdLocationPin/></i> 
                  <p className='opacity-75'>Address: </p>
                  <span className="opacity-100">Ayodhya, UP, India</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">FAQs</h4>
              <p className="text-sm opacity-75">Visit our <a href="#" className="color-plus underline hover:no-underline">FAQ section</a> to find answers to common questions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default ContactUs;