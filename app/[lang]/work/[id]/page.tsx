import ProjectClient from "./ProjectClient"
import { headers } from "next/headers"

type Params = { lang: string; id: string }

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { id, lang } = await params
  const isArabic = lang === "ar"
  const headersList = await headers()
  const host = headersList.get("host") || ""
  const siteUrl = `${host.includes("localhost") ? "http" : "https"}://${host}`

  try {
    const res = await fetch(`https://vimeo.com/api/v2/video/${id}.json`)
    const data = await res.json()
    const title = data?.[0]?.title || "Video"

    return {
      title: `${title} | ${isArabic ? "سيتو بوست برودكشن" : "Seto's Post Production"}`,
      description: data?.[0]?.description || "Cinematic video production.",
      alternates: {
        canonical: `${siteUrl}/${lang}/work/${id}`,
        languages: { ar: `${siteUrl}/ar/work/${id}`, en: `${siteUrl}/en/work/${id}` }
      },
      openGraph: {
        images: [{ url: data?.[0]?.thumbnail_large || `${siteUrl}/seo-cover.jpg` }],
      }
    }
  } catch {
    return { title: "Video | Seto's Post Production" }
  }
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id, lang } = await params
  const cleanId = String(id || "").replace(/\D/g, "")

  if (!cleanId) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Invalid Project</div>

  return <ProjectClient id={cleanId} lang={lang} />
}