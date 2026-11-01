import React from "react";
import aboutImg from "../assets/photo-about.avif";
import { FiUpload } from "react-icons/fi";
import { GiSparkles } from "react-icons/gi";
import { LuBrainCircuit, LuZap } from "react-icons/lu";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { SlPeople } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import TypewriterText from "../animations/TypewriterText";
import Team from "../components/Team";
import InteractiveCard from "../animations/InteractiveCard";
import { GoArrowRight } from "react-icons/go";

const features = [
  {
    icon: <LuZap size={28} />,
    title: "Instant Results",
    desc: "Get caption suggestions in seconds, no matter how complex your image is.",
  },
  {
    icon: <LuBrainCircuit size={28} />,
    title: "Contextual Understanding",
    desc: "Our AI understands the context, mood, and elements in your image for relevant captions.",
  },
  {
    icon: <SlPeople size={28} />,
    title: "Audience Focused",
    desc: "Captions are designed to engage your audience and increase social media interaction.",
  },
];

const worksArray = [
  {
    icon: <FiUpload />,
    iconTitle: "Upload",
    desc: "Upload your image through our simple and intuitive interface.",
  },
  {
    icon: <LuBrainCircuit />,
    iconTitle: "Analyze",
    desc: "Our AI analyzes your image, identifying objects, scenes, emotions, and context.",
  },
  {
    icon: <GiSparkles />,
    iconTitle: "Generate",
    desc: "The system generates multiple caption options based on the image analysis.",
  },
  {
    icon: <FaEnvelopeOpenText />,
    iconTitle: "Choose",
    desc: "You select the caption that best fits your needs or use our suggestions as inspiration.",
  },
];

const About = () => {
  const navigate = useNavigate()
  
  return (
    <section className="w-screen mt-24 overflow-x-hidden">
      <div className="text-5xl font-bold text-center">
        <TypewriterText text="About PicLingo" />
      </div>
      <p className="max-w-[80%] sm:max-w-[50%] text-xl text-center text-slate-700 dark:text-slate-300 mt-2 mx-auto py-2">
        Our AI-powered image caption recommendation system helps content
        creators, marketers, and social media enthusiasts generate engaging
        captions for their images.
      </p>

      {/* Our Mission */}
      <section className="w-[90%] mx-auto flex flex-wrap max-md:flex-col justify-around items-start max-md:items-center py-10 gap-x-8 max-md:gap-y-8">
        <div className="w-1/2 max-md:w-[90%] flex flex-col justify-around max-md:gap-2">
          <p className="text-2xl font-bold max-md:text-center">Our Mission</p>
          <p className="text-slate-700 dark:text-slate-300 max-md:text-center mt-2">
            We believe that every image tells a story, and the right caption can
            enhance that story. Our mission is to help you find the perfect
            words to complement your visual content, saving you time and
            boosting engagement.
          </p>

          {/* How it works */}
          <p className="text-2xl font-bold max-md:text-center mt-6">How It Works</p>
          <div className="flex flex-col gap-6 mt-6 w-full">
            {worksArray.map((item, index) => (
              <div key={index} 
                
              className="card-effect-border group bg-slate-300 dark:bg-[#202020] p-5 sm:p-6 rounded-xl"
              >
                <div className="card-effect-overlay" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="card-effect-icon w-12 h-12 flex items-center justify-center rounded-full bg-[#64748B] dark:bg-[#1a1a1a] text-slate-700 dark:text-slate-300 shrink-0">
                    <i className="text-xl">{item.icon}</i>
                  </div>
                  <div>
                    <h3 className="card-effect-title text-lg font-bold text-slate-700 dark:text-white">
                      {item.iconTitle}
                    </h3>
                    <p className="card-effect-desc text-sm text-slate-700 dark:text-slate-300 group-hover:text-black dark:group-hover:text-white ">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image part */}
        <InteractiveCard className="max-w-[620px] w-full md:w-[40%] rounded-lg overflow-hidden max-md:ml-0">
          <img src={aboutImg} alt="About" className="w-full h-auto object-cover" />
        </InteractiveCard>
      </section>


      {/* Key Features */}
      <section className="py-20 px-6">
        <h2 className="text-5xl font-bold text-center mb-16 tracking-wide">
          Key{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r text-gradient">
            Features
          </span>
        </h2>

        <div className="grid gap-12 md:grid-cols-3 max-w-[90%] mx-auto">
          {features.map((item, index) => (
            <div key={index} className="card-effect-border group  bg-slate-300 dark:bg-[#202020] p-8 rounded-2xl" >
              <div className="card-effect-overlay" />
              <div className="card-effect-icon w-16 h-16 mx-auto mb-5 bg-[#64748B] dark:bg-[#1a1a1a] rounded-full flex items-center justify-center text-slate-700 dark:text-slate-300">
                {item.icon}
              </div>
              <h3 className="card-effect-title text-2xl font-bold text-center mb-2 text-slate-700 dark:text-white">
                {item.title}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-[1rem] leading-relaxed text-center group-hover:text-black dark:group-hover:text-white ">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <Team />

      {/* Ready to Try It */}
      <section className="min-w-[40%] mx-auto flex flex-col gap-4 justify-center items-center py-10 mb-10">
        <div className="text-2xl font-bold text-center">
          <TypewriterText text="Ready to Try It?" />
        </div>
        <p className="text-slate-700 dark:text-slate-300 text-center max-w-[80%]">
          Upload your first image and experience the power of AI-generated
          caption recommendations.
        </p>
        <Link
          to="/upload"
          className="btn w-[40%] max-w-[420px] max-sm:w-[60%] flex justify-center items-center gap-2 text-gray-900 dark:text-white/87"
        >
          <i className="text-gray-900 dark:text-white/87">
            <FiUpload />
          </i>
          <p className="text-gray-900 dark:text-white/87">Get Started</p>
        </Link>
      </section>

      {/* <section className="w-full dark:bg-[#333333] bg-slate-100"> */}
        <div className="w-[90%] max-w-6xl mx-auto my-12 p-8 dark:bg-[#3f3f3f] bg-slate-100 rounded-2xl  shadow-xl hover:shadow-2xl transition-shadow duration-300 group" >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-bold mb-2 group-hover:underline transition-all duration-200">
                Have any questions or feedback?
              </h2>
              <p className="text-lg opacity-90">We’d love to hear from you! Click to get in touch.</p>
            </div>
            <button onClick={()=>navigate('/contact-us')} className="btn flex items-center gap-2 px-6 py-3 mt-4 md:mt-0 font-semibold rounded-lg shadow-md transition" >
              Contact Us <GoArrowRight/>
            </button>
          </div>
        </div>
      {/* </section> */}

    </section>
  );
};

export default About;



/* <div className="flex flex-col gap-6 mt-6">
            {worksArray.map((item, index) => (
              <div
                key={index}
                className="relative group bg-slate-300 dark:bg-[#202020] p-5 rounded-xl border border-gray-800 shadow-md transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#64748B] dark:bg-[#1a1a1a] text-slate-700 dark:text-slate-300">
                    <i className="text-xl">{item.icon}</i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-700 dark:text-white group-hover:text-blue-400 transition-colors">
                      {item.iconTitle}
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-white transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div> */






// import React from 'react'
// import aboutImg from '../assets/photo-about.avif'
// import { FiUpload } from 'react-icons/fi'
// import { GiSparkles } from 'react-icons/gi'
// import { LuBrainCircuit, LuZap } from 'react-icons/lu'
// import { FaEnvelopeOpenText } from 'react-icons/fa'
// import { SlPeople } from 'react-icons/sl'
// import { Link } from 'react-router-dom'
// import TypewriterText from '../animations/TypewriterText'
// import Team from '../components/Team'

// const About = () => {
//   const worksArray = [
//     {
//       icon: <FiUpload/>,
//       iconTitle: "Upload",
//       desc: "Upload your image through our simple and intuitive interface."
//     },
//     {
//       icon: <LuBrainCircuit/>,
//       iconTitle: "Analyze",
//       desc: "Our AI analyzes your image, identifying objects, scenes, emotions, and context."
//     },
//     {
//       icon: <GiSparkles/>,
//       iconTitle: "Generate",
//       desc: "The system generates multiple caption options based on the image analysis."
//     },
//     {
//       icon: <FaEnvelopeOpenText/>,
//       iconTitle: "Choose",
//       desc: "You select the caption that best fits your needs or use our suggestions as inspiration."
//     }
//   ]
//   const featuresArray =[
//     {
//       icon: <LuZap/>,
//       iconName: "Instant Results",
//       desc: "Get caption suggestions in seconds, no matter how complex your image is."
//     },
//     {
//       icon: <LuBrainCircuit/>,
//       iconName: "Contextual Understanding",
//       desc: "Our AI understands the context, mood, and elements in your image for relevant captions."
//     },
//     {
//       icon: <SlPeople/>,
//       iconName: "Audience Focused",
//       desc: "Captions are designed to engage your audience and increase social media interaction."
//     },
//   ]

//   return (
//     <section className='w-screen mt-24 overflow-x-hidden '>
//       <div className='text-5xl font-bold text-center'> <TypewriterText text="About PicLingo"/> </div>
//       <p className='max-w-[80%] sm:max-w-[50%] text-xl text-center text-slate-700 dark:text-slate-300 mt-2 mx-auto py-2'>Our AI-powered image caption recommendation system helps content creators, marketers, and social media enthusiasts generate engaging captions for their images.</p>

//       {/* our mission */}
//       <section className='w-[90%] mx-auto flex max-md:flex-col justify-around max-md:items-center py-10 max-md:gap-8'>
//         <div className='w-1/2 max-md:w-[75%] flex flex-col justify-around max-md:gap-2'>
//           <p className=' text-2xl font-bold max-md:text-center'>Our Mission</p>
//           <p className='text-slate-700 dark:text-slate-300 max-md:text-center '>We believe that every image tells a story, and the right caption can enhance that story. Our mission is to help you find the perfect words to complement your visual content, saving you time and boosting engagement.</p>
//           <p className=' text-2xl font-bold max-md:text-center'>How It Works</p>
//           {
//             worksArray.map((data, index)=>{
//               return(
//                 <div key={index} className='flex max-md:flex-col items-center gap-2'>
//                   <div className='w-12 h-12 rounded-full flex justify-center items-center bg-[#64748B] dark:bg-[#202020] text-slate-700 dark:text-slate-400'>
//                     <i className='text-xl'>{data.icon}</i>
//                   </div>
//                   <div>
//                     <p className='text-lg font-bold max-md:text-center'>{data.iconTitle}</p>
//                     <p className='text-sm font-sm text-slate-700 dark:text-slate-300 max-md:text-center'>{data.desc}</p>
//                   </div>
//                 </div>
//               )
//             })
//           }
//         </div> 

//         <div className='max-w-[620px] max-h-[480px] overflow-hidden rounded-lg object-scale-down'>
//           <img src={aboutImg} alt='' className='w-full object-cover'/>
//         </div>
//       </section>

//       {/* key features */}
//       <section className='w-[90%] mx-auto py-8'>
//         <p className='text-2xl font-bold text-center'>Key Features</p>
//         <div className='py-4 mt-4 flex max-md:flex-col justify-around items-around max-md:items-center max-md:gap-4'>  
//           {
//             featuresArray.map((data, index)=>{
//               return(
//                 <div key={index} className='w-[30%] max-md:w-[80%] bg-slate-300 dark:bg-[#202020] border border-slate-700 rounded-lg flex flex-col justify-around gap-2 p-6'>
//                   <div className='h-12 w-12 rounded-full flex justify-center items-center bg-[#64748B] dark:bg-[#1a1a1a] text-slate-700 dark:text-slate-400'>
//                     <i className='text-3xl '>{data.icon}</i>
//                   </div>
//                   <p className='text-xl font-bold'>{data.iconTitle}</p>
//                   <p className='text-slate-700 dark:text-slate-300'>{data.desc}</p>
//                 </div>
//               )
//             })
//           }
//         </div>
//       </section>

//       {/* Team members */}
//       <Team/>


//       {/* Ready to try it */}
//       <section className='min-w-[40%] mx-auto flex flex-col gap-4 justify-center items-center py-10 mb-10'>
//         <div className='text-2xl font-bold text-center'> <TypewriterText text="Ready to Try It?"/> </div>
//         <p className='text-slate-700 dark:text-slate-300 text-center max-w-[80%]'>Upload your first image and experience the power of AI-generated caption recommendations.</p>
//         <Link to='/upload' className='btn w-[40%] max-w-[420px] max-sm:w-[60%] flex justify-center items-center gap-2 text-gray-900 dark:text-white/87'>
//           <i className='text-gray-900 dark:text-white/87'><FiUpload/></i>
//           <p className=' text-gray-900 dark:text-white/87 '>Get Started</p>
//         </Link>
//       </section>

      
//     </section>
//   )
// }

// export default About