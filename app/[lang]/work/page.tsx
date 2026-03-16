import WorkClient from "./WorkClient"

export const metadata = {
title:"Portfolio | Seto's Post Production Iraq",
description:"Explore the portfolio of Seto's Post Production, Iraq's leading cinematic post production studio specializing in video editing, color grading, VFX and commercial storytelling.",
openGraph:{
title:"Seto's Post Production Portfolio",
description:"Watch the latest cinematic work from Seto's Post Production studio in Iraq.",
images:[
{
url:"/seo-cover.jpg",
width:1200,
height:630
}
]
}
}

export default function Page({
params
}:{
params:{lang:string}
}){

return <WorkClient />

}