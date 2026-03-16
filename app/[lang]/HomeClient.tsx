"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"

type VimeoVideo = {
  id:number
  thumbnail_large:string
  title:string
}

export default function HomeClient(){

const pathname = usePathname()

const currentLang = pathname.startsWith("/ar") ? "ar" : "en"

const t = {
en:{
pause:"Pause Video",
play:"Play Video",
title:"#1 POST-PRODUCTION\nSTUDIO IN IRAQ",
studio:"SETO'S POST-PRODUCTION",
desc:`Professional video editing, color grading,
VFX and motion graphics for brands,
filmmakers and commercial productions.`,
viewWork:"View Work",
startProject:"Start Project",
servicesTitle:"#1 Post-Production Services in Iraq",
latestWork:"Latest Cinematic Work",
viewAll:"View All",
ctaTitle:"Work With Iraq's #1 Post-Production Studio",
ctaDesc:"Let's transform your footage into cinematic storytelling.",
ctaBtn:"Start Your Project"
},
ar:{
pause:"إيقاف الفيديو",
play:"تشغيل الفيديو",
title:"#1\nبوست برودكشن\nفي العراق",
studio:"سيتو بوست برودكشن",
desc:`مونتاج احترافي، تصحيح ألوان،
مؤثرات بصرية وموشن جرافيك
للعلامات التجارية وصناع الأفلام.`,
viewWork:"مشاهدة الأعمال",
startProject:"ابدأ مشروعك",
servicesTitle:"خدمات بوست برودكشن في العراق",
latestWork:"أحدث الأعمال",
viewAll:"عرض الكل",
ctaTitle:"اعمل مع أفضل استوديو بوست برودكشن في العراق",
ctaDesc:"دعنا نحول لقطاتك إلى قصة سينمائية.",
ctaBtn:"ابدأ مشروعك"
}
}[currentLang]

const services = currentLang === "ar"
?[
"مونتاج الفيديو",
"تصحيح الألوان",
"المؤثرات البصرية (VFX)",
"موشن جرافيك",
"تصميم الصوت",
"السرد السينمائي"
]
:[
"Video Editing",
"Color Grading",
"Visual Effects (VFX)",
"Motion Graphics",
"Sound Design",
"Cinematic Storytelling"
]

const [videos,setVideos] = useState<VimeoVideo[]>([])
const [playing,setPlaying] = useState<number | null>(null)
const [videoEnabled,setVideoEnabled] = useState(true)

useEffect(()=>{

fetch("https://vimeo.com/api/v2/setoiq/videos.json")
.then(res=>res.json())
.then(data=>setVideos(data.slice(0,6)))

},[])

return(

<div className="bg-black text-white overflow-x-hidden">

{/* HERO */}

<section className="relative h-screen w-full overflow-hidden -mt-24">

{videoEnabled && (

<iframe
className="
absolute
top-1/2
left-1/2
w-[260vw]
h-[260vh]
md:w-[180vw]
md:h-[180vh]
lg:w-[140vw]
lg:h-[140vh]
max-w-none
-translate-x-1/2
-translate-y-1/2
pointer-events-none
"
src="https://www.youtube.com/embed/QsS-ZfoRNDo?autoplay=1&mute=1&controls=0&start=6&end=67&loop=1&playlist=QsS-ZfoRNDo&modestbranding=1"
allow="autoplay"
/>

)}

<button
onClick={()=>setVideoEnabled(!videoEnabled)}
className={`absolute top-6 ${currentLang === "ar" ? "left-6" : "right-6"} z-20 border border-white/30 px-3 py-1 text-xs hover:border-white transition`}
>
{videoEnabled ? t.pause : t.play}
</button>

<div className="absolute inset-0 bg-black/60"></div>
<div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40"></div>

<div className="relative z-10 h-full flex items-center px-6 md:px-16">

<div className="max-w-[900px]">

<motion.h1
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:1}}
className={`font-bold tracking-tight whitespace-pre-line
${currentLang === "ar"
? "leading-[1.25] text-[42px] sm:text-[60px] md:text-[78px] lg:text-[96px]"
: "leading-[0.95] text-[38px] sm:text-[56px] md:text-[72px] lg:text-[90px]"
}`}
>
{t.title}
</motion.h1>

<motion.h2
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{delay:0.2}}
className="mt-6 text-[#e4da20] font-semibold text-[20px] sm:text-[26px] md:text-[34px]"
>
{t.studio}
</motion.h2>

<motion.p
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{delay:0.4}}
className="mt-6 text-neutral-300 text-[15px] sm:text-[17px] max-w-[420px]"
>
{t.desc}
</motion.p>

<motion.div
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{delay:0.6}}
className="flex gap-4 mt-10 flex-wrap"
>

<Link
href={`/${currentLang}/work`}
className="border border-[#e4da20] px-7 py-3 text-[#e4da20] uppercase text-sm hover:bg-[#e4da20] hover:text-black transition shadow-[0_0_10px_rgba(228,218,32,0.4)]"
>
{t.viewWork}
</Link>

<Link
href={`/${currentLang}/contact`}
className="border border-neutral-600 px-7 py-3 uppercase text-sm hover:border-white transition"
>
{t.startProject}
</Link>

</motion.div>

</div>

</div>

<div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce opacity-70">

<svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
</svg>

</div>

</section>

{/* SERVICES */}

<section className="px-6 md:px-16 py-24">

<div className="max-w-[1400px] mx-auto">

<h2 className="text-3xl text-[#e4da20] uppercase mb-12">
{t.servicesTitle}
</h2>

<div className="grid md:grid-cols-3 gap-8">

{services.map((service,index)=>(

<Link href={`/${currentLang}/about`} key={service}>

<motion.div
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{delay:index*0.1}}
whileHover={{y:-6}}
className="border border-neutral-900 p-8 transition bg-black/40 hover:border-[#e4da20] cursor-pointer"
>

<h3 className="uppercase tracking-wide text-lg hover:text-[#e4da20] transition">
{service}
</h3>

</motion.div>

</Link>

))}

</div>

</div>

</section>

{/* WORK */}

<section className="px-6 md:px-16 pb-28">

<div className="max-w-[1400px] mx-auto">

<div className="flex justify-between items-center mb-14">

<h2 className="text-3xl text-[#e4da20] uppercase">
{t.latestWork}
</h2>

<Link
href={`/${currentLang}/work`}
className="border border-neutral-700 px-6 py-3 hover:border-white transition"
>
{t.viewAll}
</Link>

</div>

<div className="grid md:grid-cols-3 gap-10">

{videos.map(video=>(

<div
key={video.id}
className="aspect-video bg-neutral-900 overflow-hidden cursor-pointer group"
onClick={()=>setPlaying(video.id)}
>

{playing===video.id ?(

<iframe
src={`https://player.vimeo.com/video/${video.id}?autoplay=1`}
className="w-full h-full"
allow="autoplay; fullscreen"
/>

):( 

<img
src={video.thumbnail_large}
alt="Cinematic Post Production Work Iraq"
className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700 group-hover:scale-110"
/>

)}

</div>

))}

</div>

</div>

</section>

{/* CTA */}

<section className="px-6 md:px-16 pb-20">

<div className="max-w-[800px] mx-auto text-center">

<h2
className={`text-[#e4da20] mb-8 font-bold whitespace-pre-line
${currentLang === "ar"
? "text-[42px] md:text-[52px] leading-[1.35]"
: "text-4xl leading-[1.05] uppercase"}
`}
>
{t.ctaTitle}
</h2>

<p className="text-neutral-400 mb-10">
{t.ctaDesc}
</p>

<Link
href={`/${currentLang}/contact`}
className="border border-[#e4da20] px-10 py-5 text-[#e4da20] uppercase hover:bg-[#e4da20] hover:text-black transition shadow-[0_0_15px_rgba(228,218,32,0.5)]"
>
{t.ctaBtn}
</Link>

</div>

</section>

</div>

)

}