"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaInstagram, FaVimeoV } from "react-icons/fa"

export default function Footer(){

const pathname = usePathname()
const lang = pathname.split("/")[1] === "ar" ? "ar" : "en"

const isArabic = lang === "ar"

/* TEXT */

const t = {

en:{
brandDesc:`Cinematic post-production studio based in Baghdad, Iraq.
Specializing in professional video editing, color grading,
visual effects and commercial storytelling.`,
contact:"Contact",
social:"Social",
nav:"Navigation",
home:"Home",
work:"Work",
about:"About",
contactPage:"Contact",
location:"Baghdad Al Yamrouk, Iraq",
powered:"Powered By"
},

ar:{
brandDesc:`استوديو بوست برودكشن في بغداد – العراق.
متخصصون في مونتاج الفيديو الاحترافي، تصحيح الألوان،
المؤثرات البصرية وصناعة الإعلانات.`,
contact:"تواصل",
social:"منصاتنا",
nav:"التصفح",
home:"الرئيسية",
work:"الأعمال",
about:"من نحن",
contactPage:"اتصل بنا",
location:"بغداد – اليرموك، العراق",
powered:"تشغيل وتطوير"
}

}[lang]

return(

<footer className="border-t border-neutral-900 bg-black" dir={isArabic ? "rtl" : "ltr"}>

<div className="max-w-[1500px] mx-auto px-6 md:px-16 py-20 grid md:grid-cols-4 gap-14 text-sm text-neutral-400">

{/* BRAND */}

<div>

<h3 className="text-white text-xl mb-6 tracking-widest">
Seto's
</h3>

<p className="leading-relaxed mb-6">
{t.brandDesc}
</p>

<p className="text-neutral-500">
{t.location}
</p>

</div>


{/* CONTACT */}

<div>

<h4 className="text-white mb-6 tracking-wider">
{t.contact}
</h4>

<div className="space-y-3">

<a
href={isArabic ? "tel:009647811111977" : "tel:+9647811111977"}
dir="ltr"
className={`block hover:text-[#e4da20] transition ${isArabic ? "text-right" : ""}`}
>
{isArabic ? "+964 781 111 1977" : "+964 781 111 1977"}
</a>

<a
href="mailto:info@satar.me"
className="block hover:text-[#e4da20] transition"
>
info@satar.me
</a>

</div>

</div>


{/* SOCIAL */}

<div>

<h4 className="text-white mb-6 tracking-wider">
{t.social}
</h4>

<div className="flex gap-6 text-xl">

<a
href="https://instagram.com/setoiq"
target="_blank"
className="hover:text-[#e4da20] transition"
>
<FaInstagram/>
</a>

<a
href="https://vimeo.com/setoiq"
target="_blank"
className="hover:text-[#e4da20] transition"
>
<FaVimeoV/>
</a>

</div>

</div>


{/* NAVIGATION */}

<div>

<h4 className="text-white mb-6 tracking-wider">
{t.nav}
</h4>

<div className="space-y-3">

<Link
href={`/${lang}`}
className="block hover:text-[#e4da20] transition"
>
{t.home}
</Link>

<Link
href={`/${lang}/work`}
className="block hover:text-[#e4da20] transition"
>
{t.work}
</Link>

<Link
href={`/${lang}/about`}
className="block hover:text-[#e4da20] transition"
>
{t.about}
</Link>

<Link
href={`/${lang}/contact`}
className="block hover:text-[#e4da20] transition"
>
{t.contactPage}
</Link>

</div>

</div>

</div>


{/* BOTTOM */}

<div className="border-t border-neutral-900">

<div className="max-w-[1500px] mx-auto px-6 md:px-16 py-8 text-xs text-neutral-500 text-center space-y-2">

<p>
© {new Date().getFullYear()} Seto's Post Production — Iraq
</p>

<p className="tracking-wide">

{t.powered}

<a
href="https://malamih.net"
target="_blank"
className="ml-2 text-neutral-300 hover:text-[#e4da20] transition"
>
malamih.net
</a>

</p>

</div>

</div>

</footer>

)

}