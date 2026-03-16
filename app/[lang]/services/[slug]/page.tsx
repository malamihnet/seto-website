import ServiceClient from "./ServiceClient"

type Params = {
  lang?: string
  slug?: string
}

export async function generateMetadata({
  params
}:{
  params: Params
}){

const slug = params?.slug ?? "service"

const title = slug
.split("-")
.map(word => word.charAt(0).toUpperCase() + word.slice(1))
.join(" ")

return {
title: `${title} | Seto's Post Production`,
description: `Professional ${title} services by Seto's Post Production studio in Iraq.`
}

}

export default function Page({
params
}:{
params: Params
}){

const slug = params?.slug ?? "service"
const lang = params?.lang ?? "en"

return <ServiceClient slug={slug} lang={lang} />

}