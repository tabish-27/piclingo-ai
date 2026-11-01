import React, { useEffect, useState } from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark")
    
    // Apply theme on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark"
        if(savedTheme === "dark"){
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
        setTheme(savedTheme)
    }, [])
    
    useEffect(()=>{
        if(theme==="dark"){
            document.documentElement.classList.add("dark")
        }
        else{
            document.documentElement.classList.remove("dark")
        }
        localStorage.setItem("theme", theme)
        
        // Dispatch custom event for theme change
        window.dispatchEvent(new Event('themeChange'))
    }, [theme])

    const themeHandler = () =>{
        const newTheme = theme==="dark" ? "light" : "dark"
        setTheme(newTheme)
    }

    return (
        <button onClick={themeHandler} className="p-2 rounded-full bg-slate-200 dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 cursor-pointer">
            {theme === "dark" ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
        </button>
    )
}

export default ThemeToggle