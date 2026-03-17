"use client"

import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { FaPlay } from "react-icons/fa"
import { motion, useScroll, useTransform } from "framer-motion"

type VimeoVideo = {
  id: number
  thumbnail_large: string
  title: string
}

// --- 1. مكون البطاقة مع البارالاكس ---
function WorkCard({ video, lang, idx, isArabic }: { video: VimeoVideo; lang: string; idx: number; isArabic: boolean }) {
  const cardRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const yParallax = useTransform(scrollYProgress, [0, 1], [(idx % 3) * 60, (idx % 3) * -60])

  return (
    <Link href={`/${lang}/work/${video.id}`}>
      <motion.div
        ref={cardRef}
        style={{ y: yParallax }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -6 }}
        className="cursor-pointer group"
      >
        <div className="aspect-video relative overflow-hidden bg-black">
          <img
            src={video.thumbnail_large}
            className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            alt={`${isArabic ? "سيتو بوست برودكشن" : "Seto Post Production"} - ${video.title}`}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <FaPlay className="text-white text-2xl opacity-90 group-hover:scale-110 transition group-hover:text-[#e4da20]" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-2 mb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <span className="text-[10px] tracking-[0.2em] text-[#e4da20] font-mono">
              Project #{ (idx + 1).toString().padStart(2, '0') }
            </span>
            <div className="w-6 h-[1px] bg-[#e4da20]" />
          </div>
          <p className="uppercase text-white text-sm font-medium group-hover:text-[#e4da20] transition-colors duration-300">
            {video.title}
          </p>
        </div>
      </motion.div>
    </Link>
  )
}

// --- 2. الكود الأساسي ---
export default function WorkClient() {
  const { lang } = useParams<{ lang: string }>()
  const isArabic = lang === "ar"

  const title = isArabic ? "سيتو بوست برودكشن" : "SETO'S POST-PRODUCTION"
  const latestWork = isArabic ? "أحدث الأعمال" : "LATEST WORK"
  const loadingText = isArabic ? "جاري التحميل..." : "LOADING..."

  const [videos, setVideos] = useState<VimeoVideo[]>([])
  const [visible, setVisible] = useState(9)
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)

  const loadRef = useRef<HTMLDivElement | null>(null)

  // FETCH VIDEOS
  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch("/api/vimeo")
        const data = await res.json()
        
        // حماية: إذا البيانات مصفوفة نحدث الحالة، إذا لا نتركها فارغة حتى ما يضرب الكود
        if (Array.isArray(data)) {
          setVideos(data)
        } else {
          console.error("API did not return an array:", data)
          setVideos([])
        }
        
        setPageLoading(false)
      } catch (err) {
        console.error(err)
        setVideos([])
        setPageLoading(false)
      }
    }
    loadVideos()
  }, [])

  // INFINITE SCROLL
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !loading && visible < videos.length) {
          setLoading(true)
          setTimeout(() => {
            setVisible(v => v + 6)
            setLoading(false)
          }, 1000)
        }
      },
      { threshold: 1 }
    )
    if (loadRef.current) observer.observe(loadRef.current)
    return () => observer.disconnect()
  }, [loading, visible, videos.length])

  /* LOADING SCREEN */
  if (pageLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="text-[#e4da20] text-sm tracking-widest animate-pulse">
          {loadingText}
        </div>
      </div>
    )
  }

  // حماية من الشاشة السودة: إذا ماكو فيديوهات إعرض رسالة بدل الفراغ
  if (!pageLoading && videos.length === 0) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black px-6 text-center">
        <p className="text-[#e4da20] text-lg font-bold uppercase tracking-widest mb-2">
          {isArabic ? "لا توجد أعمال لعرضها حالياً" : "NO WORKS TO DISPLAY"}
        </p>
        <p className="text-white/50 text-xs tracking-widest uppercase">
          {isArabic ? "يرجى التحقق من اتصال API" : "Please check API connection"}
        </p>
      </div>
    )
  }

  const heroVideo = videos[0]

  return (
    <div className="pt-5 pb-32 overflow-x-hidden bg-black">
      <h1 className="sr-only">
        Seto's Post Production Iraq | #1 Post Production Studio in Iraq
      </h1>

      {/* HERO */}
      {heroVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative mb-24 w-full"
        >
          <div className="aspect-[16/9] md:aspect-[24/8] overflow-hidden w-full relative">
            <iframe
              src={`https://player.vimeo.com/video/${heroVideo.id}?background=1&autoplay=1&muted=1&loop=1&autopause=0`}
              className="absolute top-1/2 left-1/2 w-[200%] h-[200%] md:w-[150%] md:h-[200%] -translate-x-1/2 -translate-y-1/2 grayscale brightness-[0.65] pointer-events-none"
              allow="autoplay; fullscreen; picture-in-picture"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
            <motion.h2
              initial={{ opacity: 0, y: 80, scale: 0.95, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="uppercase text-3xl sm:text-4xl md:text-7xl font-semibold text-[#e4da20]"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 60, scale: 0.95, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.8, delay: 0.4, ease: "easeOut" }}
              className="uppercase text-sm md:text-xl text-white tracking-widest mt-4"
            >
              {latestWork}
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-4 md:px-10">
        {videos.slice(1, visible + 1).map((video, idx) => (
          <WorkCard 
            key={video.id} 
            video={video} 
            lang={lang as string} 
            idx={idx} 
            isArabic={isArabic} 
          />
        ))}
      </div>

      {/* LOAD MORE */}
      {visible < videos.length && (
        <div ref={loadRef} className="flex justify-center mt-20 h-20">
          {loading && (
            <div className="text-white text-sm tracking-widest animate-pulse">
              {loadingText}
            </div>
          )}
        </div>
      )}
      
    </div>
  )
}