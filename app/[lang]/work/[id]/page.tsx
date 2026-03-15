import ProjectClient from "./ProjectClient"

export async function generateMetadata({ params }) {

const { id } = await params

const res = await fetch(`https://vimeo.com/api/v2/video/${id}.json`)
const data = await res.json()

const video = data?.[0]

if(!video){
return {
title: "Project | Seto's Post Production",
description: "Seto's Post Production video portfolio"
}
}

return {
title: `${video.title} | Seto's Post Production`,
description: video.description?.slice(0,160) || "Seto's Post Production video editing portfolio",
openGraph:{
title: video.title,
images:[video.thumbnail_large]
}
}

}

export default async function Page({ params }) {

const { id, lang } = await params

return <ProjectClient id={id} lang={lang} />

}