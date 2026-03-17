"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa"

export default function ContactClient(){

const { lang } = useParams<{ lang:string }>()
const isArabic = lang === "ar"
const [isMounted, setIsMounted] = useState(false)

const [loading,setLoading] = useState(false)
const [success,setSuccess] = useState(false)
const [error,setError] = useState(false)

useEffect(() => {
  setIsMounted(true)
}, [])

const handleSubmit = async (e:any)=>{
e.preventDefault()
setLoading(true)
setError(false)

const form = new FormData(e.target)
const data = {
name:form.get("name"),
email:form.get("email"),
project:form.get("project"),
message:form.get("message")
}

try{
const res = await fetch("/api/contact",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify(data)
})

if(res.ok){
setSuccess(true)
e.target.reset()
}else{
setError(true)
}
}catch{
setError(true)
}finally {
setLoading(false)
}
}

return(
<div className={`bg-black text-white pt-32 pb-40 px-6 md:px-16 overflow-hidden ${isArabic?"text-right":"text-left"}`}>
<div className="max-w-[1200px] mx-auto">

{/* HERO SECTION */}
<section className="relative mb-24">
<div className="absolute left-1/2 -translate-x-1/2 top-[-120px] w-[600px] h-[300px] bg-[#e4da20]/20 blur-[160px] pointer-events-none"></div>
<div className="relative z-10">
<motion.h1 
initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
animate={isMounted ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
transition={{ duration: 1.2, delay: 0.2 }}
className="text-4xl md:text-7xl font-bold uppercase mb-8 m-0"
>
<span className="text-[#e4da20] block mb-2">
{isArabic ? "تواصل معنا" : "Contact"}
</span>
{isArabic ? "سيتو بوست برودكشن" : "Seto's Post-Production"}
</motion.h1>
<motion.p 
initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
animate={isMounted ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
transition={{ duration: 1.2, delay: 0.4 }}
className="text-neutral-300 max-w-[700px] text-lg leading-relaxed m-0 mt-6"
>
{isArabic
? "اعمل مع أفضل استوديو بوست برودكشن سينمائي في العراق. دعنا نتحدث عن مشروعك القادم."
: "Work with Iraq's #1 cinematic post-production studio. Let's discuss your next project."
}
</motion.p>
</div>
</section>

{/* CONTACT GRID */}
<section className="grid md:grid-cols-2 gap-20">

{/* STUDIO INFO */}
<motion.div
initial={{ opacity: 0, x: isArabic ? 40 : -40 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
transition={{ duration: 1 }}
>
<h2 className="text-2xl text-[#e4da20] uppercase mb-10 font-semibold tracking-wider">
{isArabic ? "معلومات الاستوديو" : "Studio Information"}
</h2>
<div className="space-y-10">

{/* الموقع */}
<motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
  <b className="text-white uppercase text-xs tracking-[0.2em] block mb-3 flex items-center gap-2">
    <FaMapMarkerAlt className="text-[#e4da20]"/> {isArabic ? "الموقع" : "Location"}
  </b>
  <span className="text-neutral-400 text-lg">{isArabic ? "بغداد — اليرموك، العراق" : "Baghdad — Al Yamrouk, Iraq"}</span>
</motion.div>

{/* الهاتف - هنا التعديل للرقم المعكوس */}
<motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
  <b className="text-white uppercase text-xs tracking-[0.2em] block mb-3 flex items-center gap-2">
    <FaPhoneAlt className="text-[#e4da20]"/> {isArabic ? "الهاتف" : "Phone"}
  </b>
  <a 
    href="tel:+9647811111977" 
    dir="ltr" 
    className={`inline-block text-neutral-400 text-lg hover:text-[#e4da20] transition-colors duration-300 ${isArabic ? "w-full text-right" : ""}`}
  >
    +964 781 111 1977
  </a>
</motion.div>

{/* البريد الإلكتروني */}
<motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
  <b className="text-white uppercase text-xs tracking-[0.2em] block mb-3 flex items-center gap-2">
    <FaEnvelope className="text-[#e4da20]"/> {isArabic ? "البريد الإلكتروني" : "Email"}
  </b>
  <a href="mailto:info@satar.me" className="text-neutral-400 text-lg hover:text-[#e4da20] transition-colors duration-300">
    info@satar.me
  </a>
</motion.div>

{/* واتساب */}
<motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
  <b className="text-white uppercase text-xs tracking-[0.2em] block mb-3 flex items-center gap-2">
    <FaWhatsapp className="text-[#e4da20]"/> WhatsApp
  </b>
  <a href="https://wa.me/9647811111977" target="_blank" className="text-neutral-400 text-lg hover:text-[#e4da20] transition-colors duration-300">
    {isArabic ? "ابدأ محادثة واتساب" : "Start WhatsApp Chat"}
  </a>
</motion.div>

</div>
</motion.div>

{/* FORM SECTION */}
<motion.div
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 1 }}
>
<h2 className="text-2xl text-[#e4da20] uppercase mb-10 font-semibold tracking-wider">
{isArabic ? "ابدأ مشروعك" : "Start a Project"}
</h2>
<form onSubmit={handleSubmit} className="space-y-6">
<input name="name" placeholder={isArabic ? "الاسم" : "Name"} required className="w-full bg-transparent border-b border-neutral-800 p-4 focus:border-[#e4da20] outline-none transition-all duration-500 placeholder:text-neutral-600" />
<input name="email" type="email" placeholder={isArabic ? "البريد الإلكتروني" : "Email"} required className="w-full bg-transparent border-b border-neutral-800 p-4 focus:border-[#e4da20] outline-none transition-all duration-500 placeholder:text-neutral-600" />
<input name="project" placeholder={isArabic ? "نوع المشروع" : "Project Type"} className="w-full bg-transparent border-b border-neutral-800 p-4 focus:border-[#e4da20] outline-none transition-all duration-500 placeholder:text-neutral-600" />
<textarea name="message" placeholder={isArabic ? "حدثنا عن مشروعك" : "Tell us about your project"} rows={4} required className="w-full bg-transparent border-b border-neutral-800 p-4 focus:border-[#e4da20] outline-none transition-all duration-500 placeholder:text-neutral-600" />

<button 
  type="submit" 
  disabled={loading} 
  className="relative border border-[#e4da20] px-12 py-5 text-[#e4da20] uppercase hover:bg-[#e4da20] hover:text-black transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(228,218,32,0.1)] disabled:opacity-50 w-full md:w-auto overflow-hidden group"
>
  <span className="relative z-10 flex items-center gap-3">
    {loading ? (
      <>
        <span className="w-5 h-5 border-2 border-[#e4da20] border-t-transparent rounded-full animate-spin group-hover:border-black"></span>
        {isArabic ? "جارٍ الإرسال..." : "Sending..."}
      </>
    ):( 
      <>{isArabic ? "إرسال الرسالة" : "Send Message"}</>
    )}
  </span>
</button>
{error && <p className="text-red-500 text-sm mt-4 font-medium">{isArabic ? "حدث خطأ بالخادم، يرجى المحاولة لاحقاً." : "Server error occurred, please try again."}</p>}
</form>
</motion.div>

</section>
</div>

{/* SUCCESS POPUP */}
<AnimatePresence>
{success && (
<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md px-4 text-center">
<motion.div 
initial={{ scale: 0.8, opacity: 0, y: 20 }}
animate={{ scale: 1, opacity: 1, y: 0 }}
exit={{ scale: 0.8, opacity: 0, y: 20 }}
className="bg-neutral-900 border border-[#e4da20] max-w-[450px] w-full p-12 shadow-[0_0_80px_rgba(228,218,32,0.15)] relative"
>
  <div className="absolute top-0 left-0 w-full h-1 bg-[#e4da20]"></div>
  <div className="text-6xl mb-6">💛</div>
  <h3 className="text-3xl text-white uppercase mb-4 font-bold tracking-tight">
    {isArabic ? "وصلت الرسالة!" : "Message Sent!"}
  </h3>
  <p className="text-neutral-400 mb-10 leading-relaxed text-lg">
    {isArabic 
      ? "شكراً لتواصلك. فريق سيتو راح يراجع مشروعك ويرجعلك بأقرب وقت ممكن. خليك قريب! 😊" 
      : "Thanks for reaching out! Seto's team will review your project and get back to you soon. Stay tuned! 😊"}
  </p>
  <button 
    onClick={()=>setSuccess(false)} 
    className="w-full border border-[#e4da20] py-4 text-[#e4da20] hover:bg-[#e4da20] hover:text-black transition-all duration-500 uppercase text-sm tracking-[0.2em] font-bold"
  >
    {isArabic ? "تمام" : "Done"}
  </button>
</motion.div>
</div>
)}
</AnimatePresence>

</div>
)
}