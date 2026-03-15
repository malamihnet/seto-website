"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function Preloader(){

const pathname = usePathname()

const [loading,setLoading] = useState(false)

useEffect(()=>{

setLoading(true)

const timer = setTimeout(()=>{
setLoading(false)
},1200)

return ()=>clearTimeout(timer)

},[pathname])

return(

<AnimatePresence>

{loading && (

<motion.div
initial={{y:0}}
exit={{y:"-100%"}}
transition={{duration:0.9,ease:"easeInOut"}}
className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center gap-12"
>

<motion.img
src="/logo.svg"
alt="Seto"
className="w-[110px]"
initial={{opacity:0,scale:0.7,rotate:-30}}
animate={{opacity:1,scale:1,rotate:0}}
transition={{duration:1}}
/>

<div className="w-[160px] h-[2px] bg-neutral-800 overflow-hidden">

<motion.div
initial={{x:"-100%"}}
animate={{x:"100%"}}
transition={{
duration:1,
ease:"easeInOut"
}}
className="w-full h-full bg-[#e4da20]"
/>

</div>

<p className="text-xs tracking-[6px] uppercase text-neutral-400">
Loading
</p>

</motion.div>

)}

</AnimatePresence>

)

}