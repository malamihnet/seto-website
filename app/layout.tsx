import "./globals.css"
import { Special_Gothic_Expanded_One, Alexandria } from "next/font/google"
import Preloader from "@/components/Preloader"

const special = Special_Gothic_Expanded_One({
  subsets:["latin"],
  weight:"400",
  variable:"--font-en"
})

const alexandria = Alexandria({
  subsets:["arabic"],
  weight:["300","400","500","600","700"],
  variable:"--font-ar"
})

export default function RootLayout({
children
}:{
children:React.ReactNode
}){

return(

<html lang="en" className={`${special.variable} ${alexandria.variable}`}>

<body className="bg-black">

<Preloader/>

{children}

</body>

</html>

)

}