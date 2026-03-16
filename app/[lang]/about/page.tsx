import AboutClient from "./AboutClient"

export const metadata = {
  title: "About | Seto's Post Production | Iraq's #1 Post Production Studio",

  description:
    "Seto's Post Production is Iraq's leading cinematic post production studio specializing in video editing, color grading, VFX, motion graphics and commercial video production for brands and filmmakers.",

  keywords: [
    "post production iraq",
    "video editing iraq",
    "color grading iraq",
    "vfx iraq",
    "motion graphics iraq",
    "film editing iraq",
    "commercial video production iraq",
    "cinematic editing iraq",
    "seto post production"
  ],

  openGraph: {
    title: "Seto's Post Production",
    description:
      "Iraq's #1 cinematic post production studio for video editing, color grading and VFX.",
    images: [
      {
        url: "/seo-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Seto's Post Production Iraq video editing studio"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Seto's Post Production",
    description:
      "Iraq's #1 cinematic post production studio for video editing, color grading and VFX.",
    images: ["/seo-cover.jpg"]
  }
}

type PageProps = {
  params: {
    lang: string
  }
}

export default function Page({ params }: PageProps) {
return <AboutClient />
}