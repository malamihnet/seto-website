import HomeClient from "./HomeClient"

export const dynamic = "force-dynamic"
export const revalidate = 0

type PageProps = {
  params: {
    lang: string
  }
}

export default function Page({ params }: PageProps) {
return <HomeClient />
}

export async function generateMetadata({ params }: PageProps) {

  const isArabic = params.lang === "ar"

  return {
    title: isArabic
      ? "سيتو بوست برودكشن | #1 استوديو مونتاج فيديو في العراق"
      : "Seto's Post Production | #1 Post Production Studio in Iraq",

    description: isArabic
      ? "سيتو بوست برودكشن هو #1 استوديو بوست برودكشن سينمائي في العراق متخصص في مونتاج الفيديو وتصحيح الألوان والمؤثرات البصرية والموشن جرافيك."
      : "Seto's Post Production is the #1 cinematic post production studio in Iraq specializing in video editing, color grading, VFX and motion graphics.",

    alternates: {
      canonical: isArabic
        ? "https://setospost.com/ar"
        : "https://setospost.com/en",
      languages: {
        ar: "https://setospost.com/ar",
        en: "https://setospost.com/en"
      }
    },

    openGraph: {
      title: isArabic
        ? "سيتو بوست برودكشن | #1 استوديو مونتاج فيديو في العراق"
        : "Seto's Post Production | #1 Post Production Studio in Iraq",

      description: isArabic
        ? "أفضل استوديو مونتاج فيديو وتصحيح ألوان في العراق."
        : "The #1 cinematic post production studio in Iraq.",

      images: [
        {
          url: "/seo-cover.jpg",
          width: 1200,
          height: 630,
          alt: "Seto Post Production Studio Iraq"
        }
      ]
    }
  }
}