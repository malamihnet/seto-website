import nodemailer from "nodemailer"

export async function POST(req: Request){
  try {
    const data = await req.json()

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth:{
        user: "info@satar.me", 
        pass: "dqqsrqvhvbknkjix" // الباسورد الجديد مالتك
      },
      tls: {
        // هاي الإضافة تضمن إن الاتصال ميفشل بسبب فروقات السيرفرات
        rejectUnauthorized: false 
      }
    })

    await transporter.sendMail({
      from: `"Seto Website" <info@satar.me>`,
      to: "info@satar.me",
      subject: "New Project Inquiry — Seto's Post Production",
      html: `
      <div style="background:#0b0b0b;padding:40px;font-family:sans-serif;">
        <div style="max-width:600px;margin:auto;background:#111;padding:30px;border:1px solid #333;">
          <h1 style="color:#e4da20;">New Message</h1>
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
    console.error("EMAIL ERROR:", error.message);
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}