"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { FaVimeoV, FaInstagram, FaFacebookF, FaBars, FaTimes } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar(){

const [open,setOpen] = useState(false)

const pathname = usePathname()

const segments = pathname.split("/")
const lang = segments[1] === "ar" ? "ar" : "en"

const isRTL = lang === "ar"

const switchLang = lang === "en" ? "ar" : "en"
const switchLabel = lang === "en" ? "AR" : "EN"

const newPath = `/${switchLang}${pathname.replace(/^\/(en|ar)/,"") || ""}`

const menu = lang === "ar"
?[
{ name:"الرئيسية", link:`/ar` },
{ name:"من نحن", link:`/ar/about` },
{ name:"الأعمال", link:`/ar/work` },
{ name:"اتصل بنا", link:`/ar/contact` }
]
:[
{ name:"Home", link:`/en` },
{ name:"About", link:`/en/about` },
{ name:"Work", link:`/en/work` },
{ name:"Contact", link:`/en/contact` }
]

return(

<nav className="sticky top-0 z-50 bg-black" dir={isRTL ? "rtl" : "ltr"}>

<div className="max-w-[1400px] mx-auto flex items-center justify-between px-10 py-5">

<Link href={`/${lang}`} className="logo-link">

<img
src="/logo.svg"
alt="Seto's"
className="logo w-[55px] md:w-[70px]"
/>

</Link>

<div className="hidden md:flex gap-10 text-sm tracking-wide">

{menu.map(item=>(
<Link key={item.name} href={item.link} className="nav-link">
{item.name}
</Link>
))}

</div>

<div className="hidden md:flex items-center gap-6 text-xl">

<a
href="https://vimeo.com/setoiq"
className="hover:text-[#e4da20] transition"
>
<FaVimeoV/>
</a>

<a
href="https://instagram.com/setoiq"
className="hover:text-[#e4da20] transition"
>
<FaInstagram/>
</a>

<Link
href={newPath}
className="text-sm ml-3 hover:text-[#e4da20] transition"
>
{switchLabel}
</Link>

</div>

<button
onClick={()=>setOpen(!open)}
className="md:hidden text-white text-xl z-[60]"
>

{open ? <FaTimes/> : <FaBars/>}

</button>

</div>

<AnimatePresence>

{open && (

<motion.div
initial={{x:isRTL ? "-100%" : "100%"}}
animate={{x:0}}
exit={{x:isRTL ? "-100%" : "100%"}}
transition={{duration:0.45}}
className="fixed top-0 right-0 w-full h-screen bg-black flex flex-col items-center justify-center gap-10 z-40"
>

{menu.map((item,i)=>(

<motion.div
key={item.name}
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{delay:i*0.1}}
>

<Link
href={item.link}
onClick={()=>setOpen(false)}
className="uppercase text-2xl tracking-widest"
>

{item.name}

</Link>

</motion.div>

))}

<Link
href={newPath}
onClick={()=>setOpen(false)}
className="uppercase text-lg text-neutral-400 hover:text-[#e4da20]"
>

{switchLabel}

</Link>

<div className="flex gap-6 text-3xl mt-6">

<a href="https://vimeo.com/setoiq"><FaVimeoV/></a>
<a href="https://instagram.com/setoiq"><FaInstagram/></a>
<a href="#"><FaFacebookF/></a>

</div>

</motion.div>

)}

</AnimatePresence>

</nav>

)

}