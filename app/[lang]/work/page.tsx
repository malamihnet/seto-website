import WorkClient from "./WorkClient"
import { headers } from "next/headers"

export const dynamic = "force-dynamic"

// هذا السطر يخلي الصفحة "تطير" لأنها تحفظ البيانات لمدة ساعة 
export const revalidate = 3600 

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params
  // نمرر اللغة فقط، والـ Client هو اللي يسحب البيانات مثل ما كان كودك الأصلي
  return <WorkClient />
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params
  const lang = resolvedParams?.lang || "en"
  const isArabic = lang === "ar"

  const headersList = await headers()
  const host = headersList.get("host") || ""
  const protocol = host.includes("localhost") ? "http" : "https"
  const siteUrl = `${protocol}://${host}`

  return {
    title: isArabic
      ? "أعمالنا | سيتو بوست برودكشن - #1 في البوست برودكشن بالعراق"
      : "Our Work | Seto's Post Production - Iraq's #1 Post-Production Studio",
    description: isArabic
      ? "تصفح معرض أعمال سيتو بوست برودكشن. شاهد أحدث المشاريع السينمائية، تصحيح الألوان، والمؤثرات البصرية التي جعلتنا الأفضل في العراق."
      : "Explore Seto's Post Production portfolio. See the cinematic projects, color grading, and VFX work that made us #1 in Iraq.",
    alternates: {
      canonical: `${siteUrl}/${lang}/work`,
      languages: { ar: `${siteUrl}/ar/work`, en: `${siteUrl}/en/work` }
    },
    openGraph: {
      title: isArabic ? "أعمالنا | سيتو بوست برودكشن" : "Our Work | Seto's Post Production",
      url: `${siteUrl}/${lang}/work`,
      siteName: "Seto's Post Production",
      images: [{ url: `${siteUrl}/seo-cover.jpg`, width: 1200, height: 630 }],
      locale: isArabic ? "ar_IQ" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      images: [`${siteUrl}/seo-cover.jpg`],
    },
  }
}