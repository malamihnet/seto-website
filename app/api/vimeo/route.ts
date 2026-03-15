export async function GET() {

const res = await fetch(
"https://api.vimeo.com/users/setoiq/videos?per_page=100",
{
headers:{
Authorization:`Bearer ${process.env.VIMEO_TOKEN}`
}
}
)

const data = await res.json()

const videos = data.data.map((v:any)=>({

id:Number(v.uri.split("/").pop()),
title:v.name,
thumbnail_large:v.pictures.sizes[v.pictures.sizes.length-1].link

}))

return Response.json(videos)

}