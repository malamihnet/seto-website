import nodemailer from "nodemailer"

export async function POST(req: Request){
  try {
    const data = await req.json()

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth:{
        // جرب تكتبهم هنا مباشرة للفحص
        user: "info@satar.me", 
        pass: "ypzxyljpvqjvjezo" 
      },
      connectionTimeout: 15000, 
    })

    await transporter.sendMail({
      from: `"Seto Website" <info@satar.me>`,
      to: "info@satar.me",
      subject: "New Project Inquiry — Seto's Post Production",
      html: `
      <div style="background:#0b0b0b;padding:40px;font-family:Arial,Helvetica,sans-serif">
        <div style="max-width:620px;margin:auto;background:#111;border:1px solid #333;padding:40px">
          <h1 style="color:#e4da20;font-size:28px;margin-bottom:20px">SETO'S POST-PRODUCTION</h1>
          <p style="color:#fff"><strong>Name:</strong> ${data.name}</p>
          <p style="color:#fff"><strong>Email:</strong> ${data.email}</p>
          <p style="color:#fff"><strong>Project:</strong> ${data.project}</p>
          <p style="color:#fff"><strong>Message:</strong> ${data.message}</p>
        </div>
      </div>
      `
    })

    return Response.json({success:true})

  } catch (error: any) {
    // هذا السطر جداً مهم.. افتح الـ Logs وشوف شيكتبلك ورا كلمة ERROR
    console.error("EMAIL ERROR:", error.message);
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}