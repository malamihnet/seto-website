import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default async function robots(): Promise<MetadataRoute.Robots> {
  // جلب الـ Host تلقائياً لضمان صحة رابط السايت ماب مهما كان الدومين
  const headersList = await headers()
  const host = headersList.get('host') || 'setoproduction.com'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const siteUrl = `${protocol}://${host}`

  return {
    rules: {
      userAgent: '*', // السماح لجميع محركات البحث (Google, Bing, etc.)
      allow: '/',      // السماح بزحف جميع الصفحات
      disallow: [
        '/api/',       // منع أرشفة روابط العمليات البرمجية
        '/_next/',     // منع أرشفة ملفات النظام الخاصة بـ Next.js
        '/static/',    // منع أرشفة الملفات الاستاتيكية الخام
      ],
    },
    // ربط ملف الـ Sitemap بالـ Robots لإرشاد جوجل للخريطة فوراً
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}