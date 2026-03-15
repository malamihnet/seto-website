"use client"

import { motion } from "framer-motion"
import Link from "next/link"

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

export default function AboutClient({ lang }: { lang: string }) {

const isArabic = lang === "ar"

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

return(

<div className={`bg-black text-white pt-32 pb-40 px-6 md:px-16 overflow-hidden ${isArabic?"text-right":""}`}>

<div className="max-w-[1400px] mx-auto">

{/* HERO */}

<section className="relative mb-24">

<div className="absolute left-1/2 -translate-x-1/2 top-[-120px] w-[700px] h-[400px] bg-[#e4da20]/20 blur-[180px] pointer-events-none"></div>

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:1}}
>

<h1 className="text-4xl md:text-7xl font-bold leading-[1.1] mb-9">

<span className="text-[#e4da20] block mb-2">
{isArabic ? "الأول في العراق" : "Iraq's #1"}
</span>

{isArabic ? "استوديو بوست برودكشن سينمائي" : "Post-Production Studio"}

</h1>

<p className="text-neutral-300 max-w-[850px] text-lg leading-relaxed">
{isArabic
?"Seto’s Post-Production هو استوديو بوست برودكشن سينمائي متخصص في مونتاج الفيديو الاحترافي وتصحيح الألوان والمؤثرات البصرية والموشن جرافيك للعلامات التجارية وصناع الأفلام والإنتاجات الإعلانية."
:"Seto’s Post-Production is Iraq’s #1 cinematic post-production studio specializing in professional video editing, color grading, visual effects and motion graphics for brands, filmmakers and commercial productions."
}
</p>

</motion.div>

</section>


{/* SERVICES */}

<section className="mb-24">

<h2 className="text-3xl text-[#e4da20] uppercase mb-12">
{isArabic?"خدمات البوست برودكشن":"Post-Production Services"}
</h2>

<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

{services.map((service,index)=>{

const Icon = service.icon

return(

<Link key={service.slug} href={`/${lang}/services/${service.slug}`}>

<motion.div
initial={{opacity:0,y:20}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{delay:index*0.05}}
className="relative border border-neutral-800 hover:border-[#e4da20] p-7 transition group overflow-hidden cursor-pointer"
>

<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[#e4da20]/10 blur-2xl"></div>

<div className="flex items-center gap-3 relative z-10">

<Icon className="text-[#e4da20] text-lg"/>

<p className="uppercase text-white tracking-wide text-sm group-hover:text-[#e4da20] transition">
{service.title}
</p>

</div>

</motion.div>

</Link>

)

})}

</div>

</section>

{/* CTA */}

<section className="text-center relative">

<div className="absolute left-1/2 -translate-x-1/2 top-[-120px] w-[600px] h-[300px] bg-[#e4da20]/15 blur-[140px] pointer-events-none"></div>

<h2 className="text-4xl md:text-5xl text-[#e4da20] uppercase mb-8">
{isArabic?"اعمل معنا في أفضل استوديو بوست برودكشن في العراق":"Work With Iraq's #1 Post-Production Studio"}
</h2>

<p className="text-neutral-400 mb-10 max-w-[700px] mx-auto">
{isArabic
?"مونتاج احترافي، تصحيح ألوان، مؤثرات بصرية وسرد سينمائي للمشاريع الإعلانية وصناع الأفلام والعلامات التجارية."
:"Professional editing, color grading, VFX and cinematic storytelling for brands, filmmakers and commercial productions."
}
</p>

<Link
href={`/${lang}/contact`}
className="inline-block border border-[#e4da20] px-12 py-5 text-[#e4da20] uppercase hover:bg-[#e4da20] hover:text-black transition shadow-[0_0_40px_rgba(228,218,32,0.25)]"
>

{isArabic?"ابدأ مشروعك":"Start Your Project"}

</Link>

</section>

</div>
</div>

)
}