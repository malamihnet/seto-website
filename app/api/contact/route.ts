import nodemailer from "nodemailer"

export async function POST(req: Request){
  try {
    const data = await req.json()

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: `"Seto Website" <${process.env.EMAIL_USER}>`,
      to: "info@satar.me",
      subject: "New Project Inquiry — Seto's Post Production",
      html: `
      <div style="background:#0b0b0b;padding:40px;font-family:Arial,Helvetica,sans-serif">
      <div style="max-width:620px;margin:auto;background:#111;border:1px solid #333;padding:40px">
      <h1 style="color:#e4da20;font-size:28px;margin-bottom:20px">SETO'S POST-PRODUCTION</h1>
      <p style="color:#aaa;font-size:15px;margin-bottom:30px">New project inquiry received from the website.</p>
      <div style="border-top:1px solid #333;padding-top:25px">
      <p style="color:#fff;margin-bottom:20px"><strong>Name</strong><br/>${data.name}</p>
      <p style="color:#fff;margin-bottom:20px"><strong>Email</strong><br/>${data.email}</p>
      <p style="color:#fff;margin-bottom:20px"><strong>Project Type</strong><br/>${data.project}</p>
      <p style="color:#fff;margin-bottom:20px"><strong>Message</strong><br/>${data.message}</p>
      </div>
      <hr style="border:none;border-top:1px solid #333;margin:30px 0"/>
      <p style="color:#777;font-size:13px">This message was sent from the Seto's Post-Production website contact form.</p>
      </div>
      </div>
      `
    })

    return Response.json({success:true})

  } catch (error: any) {
    // هذا السطر هو اللي راح ينقذنا ويطبع الخطأ بالسيرفر
    console.error("EMAIL ERROR:", error.message);
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}