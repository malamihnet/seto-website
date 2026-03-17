"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"

import {
FaFilm,
FaPalette,
FaMagic,
FaShapes,
FaVolumeUp,
FaBullhorn,
FaBuilding,
FaVideo,
FaMobileAlt,
FaPenNib,
FaRocket
} from "react-icons/fa"

export default function AboutClient(){

const { lang } = useParams<{ lang: string }>()

const safeLang = lang || "en"
const isArabic = safeLang === "ar"

const services = [
{title:isArabic?"مونتاج الفيديو":"Video Editing",slug:"video-editing",icon:FaFilm},
{title:isArabic?"تصحيح الألوان":"Color Grading",slug:"color-grading",icon:FaPalette},
{title:isArabic?"المؤثرات البصرية (VFX)":"Visual Effects (VFX)",slug:"visual-effects",icon:FaMagic},
{title:isArabic?"موشن جرافيك":"Motion Graphics",slug:"motion-graphics",icon:FaShapes},
{title:isArabic?"تصميم الصوت ودمج الصوت":"Sound Design & Audio Mixing",slug:"sound-design-audio-mixing",icon:FaVolumeUp},
{title:isArabic?"بوست برودكشن للإعلانات":"Commercial Post-Production",slug:"commercial-post-production",icon:FaBullhorn},
{title:isArabic?"أفلام العقارات":"Real Estate Films",slug:"real-estate-films",icon:FaBuilding},
{title:isArabic?"مونتاج الأفلام والوثائقيات":"Film & Documentary Editing",slug:"film-documentary-editing",icon:FaVideo},
{title:isArabic?"إنتاج فيديو للسوشيال ميديا":"Social Media Video Production",slug:"social-media-video-production",icon:FaMobileAlt},
{title:isArabic?"السرد السينمائي":"Cinematic Storytelling",slug:"cinematic-storytelling",icon:FaPenNib},
{title:isArabic?"تهيئة الفيديو للمنصات الرقمية":"Video Optimization for Digital Platforms",slug:"video-optimization-for-digital-platforms",icon:FaRocket}
]

// حل مشكلة تخطي المتصفح للأنيميشن
const [isMounted, setIsMounted] = useState(false)

useEffect(()=>{
setIsMounted(true)
},[])

return(

<div className={`bg-black text-white overflow-x-hidden ${isArabic?"text-right":""}`}>

{/* HERO - مطابق للرئيسية 100% */}
<section className="relative h-screen w-full overflow-hidden -mt-24">

{/* فيديو الخلفية بنفس إعدادات الرئيسية */}
<motion.div
    initial={{ opacity: 0 }}
    animate={isMounted ? { opacity: 1 } : { opacity: 0 }}
    transition={{ duration: 1.8, ease: "easeOut" }}
    className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
>
    <iframe
        className="
          absolute
          top-1/2
          left-1/2
          w-auto
          min-w-[178vh] 
          h-[100dvh]
          md:w-[180vw]
          md:h-[180vh]
          lg:w-[140vw]
          lg:h-[140vh]
          max-w-none
          -translate-x-1/2
          -translate-y-1/2
          object-cover
          scale-150
          pointer-events-none
        "
        src="https://player.vimeo.com/video/881850748?background=1&autoplay=1&loop=1&muted=1&byline=0&title=0"
        allow="autoplay; fullscreen"
    />
</motion.div>

{/* طبقات السواد والتدرج مطابقة للرئيسية */}
<div className="absolute inset-0 bg-black/60 z-10"></div>
<div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 z-10"></div>

{/* حاوية النصوص بنفس أبعاد الرئيسية */}
<div className="relative z-20 h-full flex items-center px-6 md:px-16">
  <div className="max-w-[900px]">
    
    {/* العنوان الرئيسي (أبيض كبير) */}
    <motion.h1 
    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
    animate={isMounted ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 40, filter: "blur(10px)" }}
    transition={{ duration: 1.5, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
    className={`font-bold tracking-tight whitespace-pre-line m-0
    ${isArabic
    ? "leading-[1.25] text-[42px] sm:text-[60px] md:text-[78px] lg:text-[96px]"
    : "leading-[0.95] text-[38px] sm:text-[56px] md:text-[72px] lg:text-[90px]"
    }`}
    >
      {isArabic ? "تعرف على سيتو\nبوست برودكشن" : "About Seto's\nPOST-PRODUCTION"}
    </motion.h1>

    {/* العنوان الفرعي (أصفر متوسط) */}
    <motion.h2
    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
    animate={isMounted ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 30, filter: "blur(8px)" }}
    transition={{ duration: 1.5, delay: 2.3, ease: [0.25, 0.1, 0.25, 1] }}
    className="mt-6 text-[#e4da20] font-semibold text-[20px] sm:text-[26px] md:text-[34px] m-0"
    >
      {isArabic ? "الأول في #1 العراق" : "IRAQ'S #1 STUDIO"}
    </motion.h2>

    {/* الوصف (رصاصي صغير) */}
    <motion.p 
    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
    animate={isMounted ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(6px)" }}
    transition={{ duration: 1.5, delay: 3.1, ease: [0.25, 0.1, 0.25, 1] }}
    className="mt-6 text-neutral-300 text-[15px] sm:text-[17px] max-w-[600px] m-0"
    >
    {isArabic
    ?"Seto’s Post-Production هو استوديو بوست برودكشن سينمائي متخصص في مونتاج الفيديو الاحترافي وتصحيح الألوان والمؤثرات البصرية والموشن جرافيك للعلامات التجارية وصناع الأفلام والإنتاجات الإعلانية."
    :"Seto’s Post-Production is Iraq’s #1 cinematic post-production studio specializing in professional video editing, color grading, visual effects and motion graphics for brands, filmmakers and commercial productions."
    }
    </motion.p>
  </div>
</div>

</section>

{/* المحتوى الباقي - مع ضبط المسافات (Padding) */}
<div className="px-6 md:px-16 pt-24 pb-40">
<div className="max-w-[1400px] mx-auto">

{/* SERVICES */}

<section className="mb-24">

<motion.h2 
initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
viewport={{ once: true, margin: "-50px" }}
transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
className="text-3xl text-[#e4da20] uppercase mb-12"
>
{isArabic?"خدمات البوست برودكشن":"Post-Production Services"}
</motion.h2>

<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

{services.map((service,index)=>{

const Icon = service.icon

return(

<Link key={service.slug} href={`/${safeLang}/services/${service.slug}`}>

<motion.div
initial={{ opacity: 0, scale: 0.85 }}
whileInView={{ opacity: 1, scale: 1 }}
viewport={{ once: true, margin: "-50px" }}
transition={{ 
  type: "spring", 
  stiffness: 80, 
  damping: 15, 
  delay: index * 0.1 
}}
whileHover={{ scale: 1.03, borderColor: "#e4da20" }}
className="relative border border-neutral-800 p-7 transition-all duration-300 group overflow-hidden cursor-pointer h-full flex items-center bg-black/40"
>

<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[#e4da20]/10 blur-2xl"></div>

<div className="flex items-center gap-4 relative z-10 w-full">

<motion.div
  initial={{ opacity: 0, x: isArabic ? 15 : -15 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.6, delay: (index * 0.1) + 0.2 }}
>
  <Icon className="text-[#e4da20] text-2xl group-hover:scale-110 transition-transform duration-300"/>
</motion.div>

<motion.p 
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.6, delay: (index * 0.1) + 0.3 }}
  className="uppercase text-white tracking-wide text-sm md:text-base group-hover:text-[#e4da20] transition-colors duration-300 m-0"
>
  {service.title}
</motion.p>

</div>

</motion.div>

</Link>

)

})}

</div>

</section>

{/* CTA */}

<section className="text-center relative pt-16 pb-16">

<div className="absolute left-1/2 -translate-x-1/2 top-[-120px] w-[600px] h-[300px] bg-[#e4da20]/15 blur-[140px] pointer-events-none"></div>

<div className="relative z-10">
  <motion.h2 
  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
  className="text-4xl md:text-5xl text-[#e4da20] uppercase mb-8 m-0"
  >
  {isArabic?"اعمل معنا في أفضل استوديو بوست برودكشن في العراق":"Work With Iraq's #1 Post-Production Studio"}
  </motion.h2>

  <motion.p 
  initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
  className="text-neutral-400 mb-10 max-w-[700px] mx-auto text-lg mt-6"
  >
  {isArabic
  ?"مونتاج احترافي، تصحيح ألوان، مؤثرات بصرية وسرد سينمائي للمشاريع الإعلانية وصناع الأفلام والعلامات التجارية."
  :"Professional editing, color grading, VFX and cinematic storytelling for brands, filmmakers and commercial productions."
  }
  </motion.p>

  <motion.div
  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
  >
    <Link
    href={`/${safeLang}/contact`}
    className="inline-block border border-[#e4da20] px-12 py-5 text-[#e4da20] uppercase hover:bg-[#e4da20] hover:text-black transition shadow-[0_0_40px_rgba(228,218,32,0.25)]"
    >
    {isArabic?"ابدأ مشروعك":"Start Your Project"}
    </Link>
  </motion.div>
</div>

</section>

</div>
</div>

</div>

)
}