"use client"

import { usePathname } from "next/navigation"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

export default function LangLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isArabic = pathname.startsWith("/ar")

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      lang={isArabic ? "ar" : "en"}
      className={isArabic ? "font-ar" : "font-en"}
    >
      <Navbar />

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />

      {/* Schema.org JSON-LD - تم نقله ليكون داخل الـ return */}
      <script
        type="application/ld+json" // تصحيح بسيط: ld+json بدلاً من ld-json
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Seto Post Production",
            "alternateName": "سيتو بوست برودكشن",
            "image": "https://satar.me/seo-cover.jpg",
            "logo": "https://satar.me/favicon.ico",
            "url": "https://satar.me",
            "telephone": "+9647811111977",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "بغداد / اليرموك",
              "addressLocality": "Baghdad",
              "addressCountry": "IQ"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 33.3128,
              "longitude": 44.3615
            },
            "description": "The leading post-production studio in Iraq, specializing in color grading, cinematic editing, and visual effects.",
            "sameAs": [
              "https://www.instagram.com/setoiq",
              "https://vimeo.com/setoiq"
            ],
            "priceRange": "$$",
            "areaServed": {
              "@type": "Country",
              "name": "Iraq"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Post Production Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Color Grading"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Video Editing"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Visual Effects (VFX)"
                  }
                }
              ]
            }
          })
        }}
      />
    </div>
  )
}