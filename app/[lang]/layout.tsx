"use client"

import { usePathname } from "next/navigation"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

export default function LangLayout({
children
}:{
children:React.ReactNode
}){

const pathname = usePathname()

const isArabic = pathname.startsWith("/ar")

return(

<div
dir={isArabic ? "rtl" : "ltr"}
lang={isArabic ? "ar" : "en"}
className={isArabic ? "font-ar" : "font-en"}
>

<Navbar/>

<main className="min-h-screen">
{children}
</main>

<Footer/>

</div>

)

}