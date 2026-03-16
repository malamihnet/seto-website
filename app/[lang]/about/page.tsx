import AboutClient from "./AboutClient"
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

  const headersList = await headers()
  const host = headersList.get("host") || ""
  const protocol = host.includes("localhost") ? "http" : "https"
  const siteUrl = `${protocol}://${host}`

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "ProfessionalService",
      "name": isArabic ? "سيتو بوست برودكشن" : "Seto's Post Production",
      "description": isArabic
        ? "تعرف على سيتو بوست برودكشن، الاستوديو السينمائي الأول في العراق المتخصص في خدمات ما بعد الإنتاج."
        : "Learn about Seto's Post Production, Iraq's #1 cinematic post-production studio.",
      "url": `${siteUrl}/${lang}/about`,
      "image": `${siteUrl}/seo-cover.jpg`
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <AboutClient />
    </>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params
  const lang = resolvedParams?.lang || "en"
  const isArabic = lang === "ar"

  const headersList = await headers()
  const host = headersList.get("host") || ""
  const protocol = host.includes("localhost") ? "http" : "https"
  const siteUrl = `${protocol}://${host}`

  return {
    // العنوان والوصف يتبع لغة الصفحة [lang]
    title: isArabic
      ? "من نحن | سيتو بوست برودكشن - الاستوديو رقم #1 في العراق"
      : "About Us | Seto's Post Production - Iraq's #1 Studio",

    description: isArabic
      ? "اكتشف قصة سيتو بوست برودكشن، الاستوديو الرائد في العراق لخدمات المونتاج وتصحيح الألوان السينمائي."
      : "Discover the story of Seto's Post Production, Iraq's leading studio for cinematic editing and color grading.",

    alternates: {
      canonical: `${siteUrl}/${lang}/about`,
      languages: {
        ar: `${siteUrl}/ar/about`,
        en: `${siteUrl}/en/about`
      }
    },

    openGraph: {
      title: isArabic
        ? "من نحن | سيتو بوست برودكشن"
        : "About Us | Seto's Post Production",
      description: isArabic
        ? "الاستوديو السينمائي الأول لخدمات البوست برودكشن في العراق."
        : "Iraq's #1 cinematic post-production studio.",
      url: `${siteUrl}/${lang}/about`,
      siteName: "Seto's Post Production",
      images: [
        {
          url: `${siteUrl}/seo-cover.jpg`,
          width: 1200,
          height: 630,
          alt: isArabic ? "سيتو بوست برودكشن" : "Seto's Post Production"
        }
      ],
      locale: isArabic ? "ar_IQ" : "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: isArabic
        ? "من نحن | سيتو بوست برودكشن"
        : "About Us | Seto's Post Production",
      images: [`${siteUrl}/seo-cover.jpg`],
    },
  }
}