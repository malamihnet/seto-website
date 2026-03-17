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

// --- 1. مكون البطاقة (بدون تغيير في الديزاين) ---
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

// --- 2. الكود الأساسي المعدل للسرعة ---
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

  // FETCH VIDEOS - تم إضافة الكاش لزيادة السرعة
  useEffect(() => {
    async function loadVideos() {
      try {
        // نستخدم force-cache لضمان فتح الصفحة فوراً في المرات القادمة
        const res = await fetch("/api/vimeo", { cache: 'no-store' }) 
        const data = await res.json()
        
        if (Array.isArray(data)) {
          setVideos(data)
        }
        
        // إيقاف اللودينج فوراً عند استلام البيانات
        setPageLoading(false)
      } catch (err) {
        console.error(err)
        setPageLoading(false)
      }
    }
    loadVideos()
  }, [])

  // INFINITE SCROLL - تحميل فوري عند السكرول
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        // تم حذف الـ setTimeout ليكون التحميل لحظياً
        if (entry.isIntersecting && visible < videos.length) {
          setVisible(v => v + 6)
        }
      },
      { threshold: 0.1 } // استجابة أسرع عند الوصول للحافة
    )
    if (loadRef.current) observer.observe(loadRef.current)
    return () => observer.disconnect()
  }, [visible, videos.length])

  /* شاشة التحميل - ستختفي بسرعة أكبر الآن */
  if (pageLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="text-[#e4da20] text-sm tracking-widest animate-pulse">
          {loadingText}
        </div>
      </div>
    )
  }

  const heroVideo = videos[0]

  return (
    <div className="pt-5 pb-32 overflow-x-hidden bg-black">
      <h1 className="sr-only"> Seto's Post Production Iraq </h1>

      {/* HERO SECTION */}
      {heroVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-24 w-full"
        >
          <div className="aspect-[16/9] md:aspect-[24/8] overflow-hidden w-full relative">
            <iframe
              src={`https://player.vimeo.com/video/${heroVideo.id}?background=1&autoplay=1&muted=1&loop=1&autopause=0`}
              className="absolute top-1/2 left-1/2 w-[200%] h-[200%] md:w-[150%] md:h-[200%] -translate-x-1/2 -translate-y-1/2 grayscale brightness-[0.65] pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="uppercase text-3xl sm:text-4xl md:text-7xl font-semibold text-[#e4da20]"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="uppercase text-sm md:text-xl text-white tracking-widest mt-4"
            >
              {latestWork}
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* GRID SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-4 md:px-10">
        {videos.slice(1, visible + 1).map((video, idx) => (
          <WorkCard key={video.id} video={video} lang={lang as string} idx={idx} isArabic={isArabic} />
        ))}
      </div>

      {/* TRIGGER LOAD MORE */}
      {visible < videos.length && <div ref={loadRef} className="h-10" />}
      
    </div>
  )
}