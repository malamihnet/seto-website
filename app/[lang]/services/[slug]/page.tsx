import ServiceClient from "./ServiceClient"
import { headers } from "next/headers"

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const isArabic = lang === "ar"

  // كشف الدومين تلقائياً للروابط والصور لضمان عمل الـ OG Tag
  const headersList = await headers()
  const host = headersList.get("host") || ""
  const protocol = host.includes("localhost") ? "http" : "https"
  const siteUrl = `${protocol}://${host}`

  const title = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const servicesArabic: any = {
    "video-editing": "مونتاج الفيديو السينمائي",
    "color-grading": "تصحيح الألوان السينمائي",
    "vfx": "المؤثرات البصرية VFX",
    "motion-graphics": "الموشن جرافيك",
    "post-production-commercials": "بوست برودكشن للإعلانات",
    "sound-design": "تصميم الصوت",
    "sound-design-audio-mixing": "تصميم ودمج الصوت",
    "audio-mixing": "دمج الصوت الاحترافي",
    "social-media-video-production": "إنتاج فيديوهات السوشيال ميديا",
    "film-documentary-editing": "مونتاج الأفلام والوثائقيات",
    "real-estate-films": "أفلام العقارات الفاخرة",
    "digital-platform-video-optimization": "تهيئة الفيديو للمنصات الرقمية",
    "cinematic-storytelling": "السرد القصصي السينمائي"
  }

  const serviceName = isArabic ? servicesArabic[slug] || title : title

  return {
    title: isArabic
      ? `${serviceName} | سيتو بوست برودكشن #1 في العراق`
      : `${serviceName} Services | Seto's Post Production Iraq`,

    description: isArabic
      ? `خدمات ${serviceName} احترافية بمعايير عالمية في العراق. نستخدم أحدث تقنيات البوست برودكشن لرفع جودة مشروعك.`
      : `World-class ${serviceName} services in Iraq. We use advanced post-production pipelines to elevate your cinematic projects.`,

    alternates: {
      canonical: `${siteUrl}/${lang}/services/${slug}`,
      languages: {
        ar: `${siteUrl}/ar/services/${slug}`,
        en: `${siteUrl}/en/services/${slug}`
      }
    },

    openGraph: {
      title: isArabic
        ? `خدمة ${serviceName} - سيتو بوست برودكشن`
        : `${serviceName} Service - Seto's Post Production`,
      url: `${siteUrl}/${lang}/services/${slug}`,
      siteName: "Seto's Post Production",
      images: [
        {
          url: `${siteUrl}/seo-cover.jpg`,
          width: 1200,
          height: 630
        }
      ],
      locale: isArabic ? "ar_IQ" : "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: isArabic ? serviceName : `${serviceName} Services`,
      images: [`${siteUrl}/seo-cover.jpg`],
    },
  }
}

export default async function Page({
  params
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  return <ServiceClient slug={slug} lang={lang} />
}