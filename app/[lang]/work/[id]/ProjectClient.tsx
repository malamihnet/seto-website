"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

type VimeoVideo = {
id:number
title:string
description:string
}

export default function ProjectClient({
id,
lang
}:{
id:string
lang:string
}){

const isArabic = lang === "ar"

const [video,setVideo] = useState<VimeoVideo | null>(null)

useEffect(()=>{

if(!id) return

fetch(`https://vimeo.com/api/v2/video/${id}.json`)
.then(res=>res.json())
.then(data=>{
if(data && data[0]) setVideo(data[0])
})

},[id])

if(!video){
return(
<div className="min-h-screen bg-black text-white flex items-center justify-center">
{isArabic ? "جاري التحميل..." : "Loading..."}
</div>
)
}

const cleanDescription = video.description
?.replace(/<br\s*\/?>/gi," ")
?.replace("Post-Production:","POST PRODUCTION BY ")
?.trim()

return(

<div className={`min-h-screen bg-black text-white pt-5 pb-32 px-6 md:px-16 ${isArabic ? "text-right" : ""}`}>

{/* VIDEO */}

<motion.div
initial={{opacity:0, scale:0.95}}
animate={{opacity:1, scale:1}}
transition={{duration:0.6}}
className="flex justify-center mb-20"
>

<div
style={{width:"1000px",maxWidth:"100%",aspectRatio:"16/9"}}
className="relative rounded-2xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
>

{/* LOGO */}

<img
src="/logo.svg"
className="absolute top-4 left-4 w-[35px] z-20 opacity-90 pointer-events-none"
/>

{/* VIMEO PLAYER */}

<iframe
src={`https://player.vimeo.com/video/${video.id}?color=e4da20&title=0&byline=0&portrait=0&badge=0&share=0&watch_later=0`}
className="w-full h-full"
allow="autoplay; fullscreen; picture-in-picture"
allowFullScreen
/>

</div>

</motion.div>

{/* TITLE */}

<div className="max-w-[900px] mx-auto text-center">

<h1 className="text-4xl md:text-6xl uppercase mb-8 font-semibold">
{video.title}
</h1>

<p className="text-neutral-400 text-lg mb-14 tracking-wide">
{cleanDescription}
</p>

<div className="flex flex-col md:flex-row gap-6 justify-center">

<Link
href={`/${lang}/work`}
className="border border-white px-8 py-3 uppercase text-sm tracking-widest hover:bg-white hover:text-black transition"
>
{isArabic ? "العودة للأعمال" : "Back To Work"}
</Link>

<Link
href={`/${lang}/contact`}
className="bg-[#e4da20] text-black px-8 py-3 uppercase text-sm tracking-widest hover:opacity-90 transition"
>
{isArabic ? "لنبدأ مشروعك" : "Let's Work Together"}
</Link>

</div>

</div>

</div>

)

}