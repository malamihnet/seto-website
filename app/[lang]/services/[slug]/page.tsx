"use client"

import { motion } from "framer-motion"
import { use } from "react"
import Link from "next/link"

export default function Page({
params
}:{
params: Promise<{ lang:string; slug:string }>
}){

const { slug, lang } = use(params)

const title = slug
.split("-")
.map(word => word.charAt(0).toUpperCase() + word.slice(1))
.join(" ")

return(

<div className="pt-28 pb-40 px-6 md:px-16 max-w-[1400px] mx-auto text-white">

{/* HERO */}

<section className="mb-32">

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:1}}
className="max-w-[900px]"
>

<h1 className="text-5xl md:text-7xl text-[#e4da20] uppercase mb-8 leading-tight">
{title} Services
</h1>

<p className="text-neutral-300 text-xl leading-relaxed">
Professional <strong>{title}</strong> services by <strong>Seto's Post-Production</strong>, 
Iraq's leading cinematic post-production studio specializing in high-end editing, 
advanced color grading, visual effects and cinematic storytelling for brands, 
commercial productions and filmmakers.
</p>

</motion.div>

</section>


{/* INTRO SEO */}

<section className="grid md:grid-cols-2 gap-20 mb-32">

<motion.div
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{duration:1}}
>

<h2 className="text-3xl text-[#e4da20] uppercase mb-6">
Professional {title}
</h2>

<p className="text-neutral-300 leading-relaxed mb-6">
At <strong>Seto's Post-Production</strong>, we deliver world-class <strong>{title}</strong> 
services designed to transform raw footage into cinematic visual experiences. 
Our workflow combines storytelling, pacing, visual rhythm and modern post-production 
technology to create powerful content that connects with audiences.
</p>

<p className="text-neutral-400 leading-relaxed">
From commercial advertising to branded films and real estate productions, 
our studio ensures every frame meets the highest cinematic standards.
</p>

</motion.div>


<motion.div
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{duration:1}}
>

<h2 className="text-3xl text-[#e4da20] uppercase mb-6">
Our Approach
</h2>

<p className="text-neutral-300 leading-relaxed mb-6">
Our team focuses on narrative structure, emotion, rhythm and visual clarity 
to craft compelling visual stories. Every project is treated with a cinematic 
mindset that elevates the final result.
</p>

<p className="text-neutral-400 leading-relaxed">
Using modern post-production pipelines, advanced color science and creative 
editing techniques, we ensure each project delivers maximum visual impact.
</p>

</motion.div>

</section>


{/* FEATURES */}

<section className="mb-32">

<h2 className="text-3xl text-[#e4da20] uppercase mb-14">
What You Get
</h2>

<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

{[
"Cinematic Editing Workflow",
"Professional Visual Storytelling",
"Advanced Color Science",
"High-End Post-Production Pipeline",
"Creative Narrative Structure",
"Optimized Content For Digital Platforms"
].map((item,index)=>(

<motion.div
key={item}
initial={{opacity:0,y:20}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{delay:index*0.06}}
className="border border-neutral-800 p-8 hover:border-[#e4da20] transition"
>

<p className="uppercase text-sm tracking-widest">
{item}
</p>

</motion.div>

))}

</div>

</section>


{/* WORKFLOW */}

<section className="mb-32">

<h2 className="text-3xl text-[#e4da20] uppercase mb-12">
Our Workflow
</h2>

<div className="grid md:grid-cols-4 gap-10">

{[
"Footage Review",
"Cinematic Editing",
"Color & Visual Enhancement",
"Final Master Delivery"
].map((step,index)=>(

<motion.div
key={step}
initial={{opacity:0,y:20}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{delay:index*0.1}}
>

<p className="text-5xl text-[#e4da20] mb-4">
0{index+1}
</p>

<p className="text-neutral-300 uppercase tracking-wider">
{step}
</p>

</motion.div>

))}

</div>

</section>


{/* CTA */}

<section className="text-center">

<motion.div
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{duration:1}}
>

<h2 className="text-4xl text-[#e4da20] uppercase mb-8">
Start Your Project
</h2>

<p className="text-neutral-400 max-w-[700px] mx-auto mb-12">
Work with <strong>Seto's Post-Production</strong>, Iraq's premier cinematic 
post-production studio delivering professional editing, color grading and 
visual effects for commercial productions and brands.
</p>

<Link
href={`/${lang}/contact`}
className="border border-[#e4da20] px-12 py-5 text-[#e4da20] uppercase hover:bg-[#e4da20] hover:text-black transition"
>
Start a Project
</Link>

</motion.div>

</section>

</div>

)

}