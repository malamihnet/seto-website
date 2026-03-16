"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FaArrowLeft, FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa"

type VimeoVideo = { id: number; title: string; description: string }

export default function ProjectClient({ id, lang }: { id: string; lang: string }) {
  const isArabic = lang === "ar"
  const [video, setVideo] = useState<VimeoVideo | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!id) return
    async function loadVideo() {
      try {
        const res = await fetch(`https://vimeo.com/api/v2/video/${id}.json`)
        const data = await res.json()
        if (data && data[0]) setVideo(data[0])
        else setError(true)
      } catch { setError(true) }
    }
    loadVideo()
  }, [id])

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="mb-6 text-neutral-400 font-light">{isArabic ? "تعذر تحميل الفيديو" : "Failed to load video"}</p>
          <Link href={`/${lang}/work`} className="inline-flex items-center gap-2 text-[#e4da20] uppercase text-xs tracking-widest hover:underline">
            {isArabic ? <FaLongArrowAltRight /> : <FaLongArrowAltLeft />}
            {isArabic ? "العودة للأعمال" : "Back To Work"}
          </Link>
        </div>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-10 h-10 border-t-2 border-[#e4da20] border-solid rounded-full animate-spin" />
      </div>
    )
  }

  const cleanDescription = video.description
    ?.replace(/<br\s*\/?>/gi, " ")
    ?.replace("Post-Production:", isArabic ? "إخراج فني وبوست برودكشن بواسطة " : "POST PRODUCTION BY ")
    ?.trim()

  return (
    <div className={`min-h-screen bg-black text-white pt-10 pb-40 px-6 md:px-16 ${isArabic ? "text-right font-ar" : "font-en"}`}>
      
      {/* Back Button */}
      <div className="max-w-[1200px] mx-auto mb-12">
        <Link href={`/${lang}/work`} className="group inline-flex items-center gap-3 text-white/50 hover:text-[#e4da20] transition-colors uppercase text-[10px] tracking-[0.3em]">
           {isArabic ? <FaLongArrowAltRight className="group-hover:translate-x-2 transition-transform"/> : <FaLongArrowAltLeft className="group-hover:-translate-x-2 transition-transform"/>}
           {isArabic ? "العودة للمعرض" : "Back to Showcase"}
        </Link>
      </div>

      {/* CUSTOM PLAYER FRAME - تصغير الحجم هنا إلى 70% */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="flex justify-center mb-24 relative"
      >
        {/* العرض أصبح md:w-[70%] للتحكم في الحجم المطلب */}
        <div className="relative w-full md:w-[70%] aspect-video group">
          
          <div className="absolute inset-0 pointer-events-none z-10 border border-white/10 rounded-2xl" />
          
          <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40">
             <img src="/logo.svg" className="w-[40px] md:w-[50px] opacity-80" alt="Seto Logo" />
          </div>

          <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(228,218,32,0.15)] bg-zinc-950">
            <iframe 
              src={`https://player.vimeo.com/video/${video.id}?color=e4da20&title=0&byline=0&portrait=0&badge=0&share=0&watch_later=0`} 
              className="w-full h-full scale-[1.01]" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowFullScreen 
            />
          </div>
          
          <div className="absolute -bottom-12 left-0 right-0 flex justify-between items-center px-2 opacity-30">
            <span className="text-[10px] tracking-[0.5em] uppercase">Seto Production © 2026</span>
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-[#e4da20] animate-pulse" />
              <span className="text-[10px] tracking-[0.2em] uppercase italic">Cinematic Grade</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Project Details */}
      <div className="max-w-[800px] mx-auto text-center mt-32">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
        >
          <span className="text-[#e4da20] text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6 block">Featured Project</span>
          <h1 className="text-4xl md:text-7xl uppercase mb-10 font-bold tracking-tight leading-tight italic">
            {video.title}
          </h1>
          
          <div className="w-20 h-[1px] bg-white/20 mx-auto mb-10" />
          
          <p className="text-neutral-400 text-base md:text-xl mb-20 leading-relaxed font-light px-4">
            {cleanDescription}
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <Link href={`/${lang}/contact`} className="relative group overflow-hidden bg-[#e4da20] text-black px-12 py-4 uppercase text-[11px] font-bold tracking-[0.2em] rounded-full transition-all">
            <span className="relative z-10">{isArabic ? "ابدأ مشروعك الآن" : "Start Your Project"}</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
          
          <Link href={`/${lang}/work`} className="text-white/60 hover:text-white uppercase text-[10px] tracking-[0.4em] transition-colors border-b border-white/10 pb-1">
            {isArabic ? "استعراض المزيد" : "Explore More"}
          </Link>
        </div>
      </div>
    </div>
  )
}