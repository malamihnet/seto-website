import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // جلب الـ Host تلقائياً من الطلب (Request)
  const headersList = await headers()
  const host = headersList.get('host') || 'setoproduction.com'
  
  // تحديد البروتوكول (http لـ localhost و https للموقع الحي)
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const baseUrl = `${protocol}://${host}`
  
  const languages = ['ar', 'en']
  const staticRoutes = ['', '/work', '/about', '/contact']
  
  const serviceSlugs = [
    "video-editing", "color-grading", "vfx", "motion-graphics",
    "post-production-commercials", "sound-design", "audio-mixing",
    "social-media-video-production", "film-documentary-editing",
    "real-estate-films", "digital-platform-video-optimization", "cinematic-storytelling"
  ]

  let videoRoutes: string[] = []
  try {
    // نستخدم baseUrl الديناميكي هنا أيضاً
    const res = await fetch(`${baseUrl}/api/vimeo`, { 
        next: { revalidate: 3600 } 
    })
    
    if (res.ok) {
      const videos = await res.json()
      videoRoutes = videos.map((v: any) => `/work/${v.id}`)
    }
  } catch (e) {
    console.error("Sitemap dynamic fetch failed")
  }

  const allRelativePaths = [
    ...staticRoutes,
    ...serviceSlugs.map(slug => `/services/${slug}`),
    ...videoRoutes
  ]

  return languages.flatMap((lang) =>
    allRelativePaths.map((path) => ({
      url: `${baseUrl}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as any,
      priority: path === '' ? 1.0 : 0.8,
    }))
  )
}