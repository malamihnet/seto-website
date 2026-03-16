import HomeClient from "./HomeClient"
import { headers } from "next/headers"

export const dynamic = "force-dynamic"
export const revalidate = 0

type PageProps = {
  params: Promise<{ lang: string }> | { lang: string }
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params
  const lang = resolvedParams?.lang || "en"
  const isArabic = lang === "ar"

  // Schema Markup المحدث مع رابط ديناميكي للصورة
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": isArabic ? "سيتو بوست برودكشن | Seto's Post Production" : "Seto's Post Production",
    "image": "https://setospost.com/seo-cover.jpg", // سيبقى للمحركات كمرجع أساسي
    "description": isArabic 
      ? "الاستوديو رقم #1 في العراق للبوست برودكشن السينمائي (Post-Production). الخيار الأول للعلامات التجارية وصناع الأفلام." 
      : "Iraq's #1 Cinematic Post-Production Studio. The premier choice for brands, filmmakers, and commercial productions.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Baghdad",
      "addressCountry": "IQ"
    },
    "url": isArabic ? "https://setospost.com/ar" : "https://setospost.com/en",
    "priceRange": "$$$"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <HomeClient lang={lang} />
    </>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params
  const lang = resolvedParams?.lang || "en"
  const isArabic = lang === "ar"

  // كشف الدومين تلقائياً لضمان عمل الصورة في واتساب وفيسبوك
  const headersList = await headers()
  const host = headersList.get("host") || ""
  const protocol = host.includes("localhost") ? "http" : "https"
  const siteUrl = `${protocol}://${host}`

  return {
    title: isArabic
      ? "سيتو بوست برودكشن | #1 استوديو بوست برودكشن في العراق"
      : "Seto's Post Production | #1 Post Production Studio in Iraq",

    description: isArabic
      ? "سيتو بوست برودكشن (Seto's Post Production) هو الاستوديو الأول في العراق المتخصص حصرياً في خدمات البوست برودكشن السينمائي المتكاملة للعلامات التجارية وصناع الأفلام."
      : "Seto's Post Production is Iraq's #1 cinematic post-production studio, providing top-tier post-production services for global brands and filmmakers.",

    keywords: isArabic
      ? ["بوست برودكشن", "بوست برودكشن في العراق", "استوديو بوست برودكشن", "Post Production Iraq", "سيتو بوست برودكشن", "بوست برودكشن سينمائي", "مونتاج فيديو", "تصحيح ألوان", "VFX"]
      : ["Post Production", "Post Production Studio", "Post Production Iraq", "Cinematic Post Production", "Seto Post Production", "VFX Studio Middle East", "Video Editing"],

    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        ar: `${siteUrl}/ar`,
        en: `${siteUrl}/en`
      }
    },

    openGraph: {
      title: isArabic
        ? "سيتو بوست برودكشن | #1 استوديو بوست برودكشن في العراق"
        : "Seto's Post Production | #1 Post Production Studio",
      description: isArabic
        ? "الاستوديو السينمائي الأول للبوست برودكشن في العراق."
        : "Iraq's #1 cinematic post-production studio.",
      url: `${siteUrl}/${lang}`,
      siteName: "Seto's Post Production",
      images: [
        {
          url: `${siteUrl}/seo-cover.jpg`, // التحديث الذكي للصورة هنا
          width: 1200,
          height: 630,
          alt: isArabic ? "سيتو بوست برودكشن في العراق" : "Seto's Post Production Studio in Iraq"
        }
      ],
      locale: isArabic ? "ar_IQ" : "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: isArabic
        ? "سيتو بوست برودكشن | #1 استوديو بوست برودكشن في العراق"
        : "Seto's Post Production | #1 Post Production Studio",
      description: isArabic
        ? "الاستوديو السينمائي الأول للبوست برودكشن في العراق."
        : "Iraq's #1 cinematic post-production studio.",
      images: [`${siteUrl}/seo-cover.jpg`], // وهنا أيضاً للتويتر
    },
  }
}