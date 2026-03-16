"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useParams } from "next/navigation"

export default function ContactClient(){

const { lang } = useParams<{ lang:string }>()
const isArabic = lang === "ar"

const [loading,setLoading] = useState(false)
const [success,setSuccess] = useState(false)
const [error,setError] = useState(false)

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
}
setLoading(false)
}

return(
<div className={`bg-black text-white pt-32 pb-40 px-6 md:px-16 overflow-hidden ${isArabic?"text-right":"text-left"}`}>
<div className="max-w-[1200px] mx-auto">

{/* HERO SECTION */}
<section className="relative mb-32">
<div className="absolute left-1/2 -translate-x-1/2 top-[-120px] w-[600px] h-[300px] bg-[#e4da20]/20 blur-[160px]"></div>
<motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1}}>
<h1 className="text-4xl md:text-7xl font-bold uppercase mb-8">
<span className="text-[#e4da20] block">
{isArabic ? "تواصل معنا" : "Contact"}
</span>
{isArabic ? "سيتو بوست برودكشن" : "Seto's Post-Production"}
</h1>
<p className="text-neutral-300 max-w-[700px] text-lg leading-relaxed">
{isArabic
? "اعمل مع أفضل استوديو بوست برودكشن سينمائي في العراق. دعنا نتحدث عن مشروعك القادم."
: "Work with Iraq's #1 cinematic post-production studio. Let's discuss your next project."
}
</p>
</motion.div>
</section>

{/* CONTACT GRID */}
<section className="grid md:grid-cols-2 gap-16">

{/* STUDIO INFO */}
<div>
<h2 className="text-2xl text-[#e4da20] uppercase mb-8 font-semibold tracking-wider">
{isArabic ? "معلومات الاستوديو" : "Studio Information"}
</h2>
<div className="space-y-8 text-neutral-300">
<p>
<b className="text-white uppercase text-xs tracking-widest block mb-2">{isArabic ? "الموقع" : "Location"}</b>
{isArabic ? "بغداد — اليرموك، العراق" : "Baghdad — Al Yamrouk, Iraq"}
</p>
<p>
<b className="text-white uppercase text-xs tracking-widest block mb-2">{isArabic ? "الهاتف" : "Phone"}</b>
<a href="tel:+9647811111977" dir="ltr" className="inline-block hover:text-[#e4da20] transition">
+964 781 111 1977
</a>
</p>
<p>
<b className="text-white uppercase text-xs tracking-widest block mb-2">{isArabic ? "البريد الإلكتروني" : "Email"}</b>
<a href="mailto:info@satar.me" className="hover:text-[#e4da20] transition">
info@satar.me
</a>
</p>
<p>
<b className="text-white uppercase text-xs tracking-widest block mb-2">WhatsApp</b>
<a href="https://wa.me/9647811111977" target="_blank" className="hover:text-[#e4da20] transition">
{isArabic ? "ابدأ محادثة واتساب" : "Start WhatsApp Chat"}
</a>
</p>
</div>
</div>

{/* FORM SECTION */}
<div>
<h2 className="text-2xl text-[#e4da20] uppercase mb-8 font-semibold tracking-wider">
{isArabic ? "ابدأ مشروعك" : "Start a Project"}
</h2>
<form onSubmit={handleSubmit} className="space-y-6">
<input name="name" placeholder={isArabic ? "الاسم" : "Name"} required className="w-full bg-black border border-neutral-800 p-4 focus:border-[#e4da20] outline-none transition" />
<input name="email" type="email" placeholder={isArabic ? "البريد الإلكتروني" : "Email"} required className="w-full bg-black border border-neutral-800 p-4 focus:border-[#e4da20] outline-none transition" />
<input name="project" placeholder={isArabic ? "نوع المشروع" : "Project Type"} className="w-full bg-black border border-neutral-800 p-4 focus:border-[#e4da20] outline-none transition" />
<textarea name="message" placeholder={isArabic ? "حدثنا عن مشروعك" : "Tell us about your project"} rows={5} required className="w-full bg-black border border-neutral-800 p-4 focus:border-[#e4da20] outline-none transition" />
<button type="submit" disabled={loading} className="border border-[#e4da20] px-10 py-4 text-[#e4da20] uppercase hover:bg-[#e4da20] hover:text-black transition flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(228,218,32,0.15)] disabled:opacity-50">
{loading ? (
<>
<span className="w-4 h-4 border-2 border-[#e4da20] border-t-transparent rounded-full animate-spin"></span>
{isArabic ? "جارٍ الإرسال..." : "Sending..."}
</>
):( 
<>{isArabic ? "إرسال الرسالة" : "Send Message"}</>
)}
</button>
{error && <p className="text-red-500 text-sm mt-2">{isArabic ? "حدث خطأ، حاول مرة أخرى." : "Error occurred, try again."}</p>}
</form>
</div>

</section>
</div>

{/* SUCCESS POPUP */}
{success && (
<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
<motion.div initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} className="bg-neutral-900 border border-[#e4da20] max-w-[420px] p-10 text-center shadow-2xl">
<h3 className="text-2xl text-[#e4da20] uppercase mb-4 font-bold">{isArabic ? "تم استلام الرسالة" : "Message Received"}</h3>
<p className="text-neutral-300 mb-8 leading-relaxed">
{isArabic ? "شكراً لتواصلك مع سيتو بوست برودكشن. سنراجع مشروعك ونتواصل معك قريباً." : "Thank you for contacting Seto's Post-Production. We will review your project shortly."}
</p>
<button onClick={()=>setSuccess(false)} className="border border-[#e4da20] px-8 py-3 text-[#e4da20] hover:bg-[#e4da20] hover:text-black transition uppercase text-sm tracking-widest font-bold">
{isArabic ? "إغلاق" : "Close"}
</button>
</motion.div>
</div>
)}
</div>
)
}