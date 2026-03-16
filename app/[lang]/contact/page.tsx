import ContactClient from "./ContactClient"
import { headers } from "next/headers"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const isArabic = lang === "ar"

  // كشف الدومين تلقائياً للروابط والصور
  const headersList = await headers()
  const host = headersList.get("host") || ""
  const protocol = host.includes("localhost") ? "http" : "https"
  const siteUrl = `${protocol}://${host}`

  return {
    title: isArabic
      ? "تواصل معنا | سيتو بوست برودكشن - #1 في العراق"
      : "Contact Us | Seto's Post Production - Iraq's #1 Studio",
    
    description: isArabic
      ? "تواصل مع سيتو بوست برودكشن في بغداد. أفضل خدمات المونتاج، تصحيح الألوان، والمؤثرات البصرية في العراق."
      : "Contact Seto's Post Production in Baghdad. Professional video editing, color grading, and VFX services in Iraq.",

    alternates: {
      canonical: `${siteUrl}/${lang}/contact`,
      languages: {
        ar: `${siteUrl}/ar/contact`,
        en: `${siteUrl}/en/contact`
      }
    },

    openGraph: {
      title: isArabic ? "تواصل معنا | سيتو بوست برودكشن" : "Contact Us | Seto's Post Production",
      description: isArabic ? "لنبدأ العمل على مشروعك القادم." : "Let's start working on your next project.",
      url: `${siteUrl}/${lang}/contact`,
      siteName: "Seto's Post Production",
      images: [{ url: `${siteUrl}/seo-cover.jpg`, width: 1200, height: 630 }],
      locale: isArabic ? "ar_IQ" : "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: isArabic ? "تواصل معنا | سيتو بوست برودكشن" : "Contact Us | Seto's Post Production",
      images: [`${siteUrl}/seo-cover.jpg`],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  // نمرر الـ params للـ Client Component إذا احتاج لغة معينة
  return <ContactClient />
}