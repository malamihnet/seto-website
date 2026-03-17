"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"

export default function NotFoundCatchAll() {
  const params = useParams()
  const lang = params?.lang || "ar"
  const isArabic = lang === "ar"

  return (
    <main className="h-screen w-full bg-black flex flex-col items-center justify-center text-center px-6 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#e4da20]/10 blur-[150px] pointer-events-none" />

      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-[10rem] md:text-[18rem] font-black text-white/5 leading-none absolute select-none"
      >
        404
      </motion.h1>

      <div className="relative z-10">
        <h2 className="text-[#e4da20] text-3xl md:text-5xl font-bold uppercase mb-4 tracking-tighter">
            {isArabic ? "المشهد مفقود" : "Scene Not Found"}
        </h2>
        <p className="text-white/60 text-sm md:text-lg tracking-[0.3em] uppercase mb-12">
            {isArabic ? "تم حذف هذا المشهد من النسخة النهائية" : "Deleted from the final cut"}
        </p>

        <Link 
          href={`/${lang}`} 
          className="inline-block border border-[#e4da20] px-10 py-4 text-[#e4da20] uppercase font-bold hover:bg-[#e4da20] hover:text-black transition-all duration-500"
        >
          {isArabic ? "العودة للمشهد الرئيسي" : "Back to Main Scene"}
        </Link>
      </div>
    </main>
  )
}