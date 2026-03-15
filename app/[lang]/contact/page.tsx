import ContactClient from "./ContactClient"

export const metadata = {

title:"Contact | Seto's Post Production | Iraq's #1 Post Production Studio",

description:
"Contact Seto's Post Production in Baghdad. Professional video editing, color grading, VFX and motion graphics services in Iraq.",

keywords:[
"post production studio iraq",
"video editing iraq",
"color grading iraq",
"vfx studio iraq",
"motion graphics iraq"
]

}

export default function Page({params}:{params:{lang:string}}){

return <ContactClient lang={params.lang}/>

}