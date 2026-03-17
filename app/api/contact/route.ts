import { Resend } from 'resend';

// المفتاح الجديد والفعال
const resend = new Resend('re_beicCDYG_BjfSDYESimzjDtaF9A3Bgq6M');

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // إرسال الإيميل باستخدام Resend
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'info@satar.me',
      subject: 'New Project Inquiry — Seto\'s Post Production',
      html: `
        <div style="background:#0b0b0b; padding:40px; font-family:sans-serif; color:#fff;">
          <div style="max-width:600px; margin:auto; background:#111; border:1px solid #333; padding:40px;">
            <h1 style="color:#e4da20; font-size:24px; margin-bottom:20px;">SETO'S POST-PRODUCTION</h1>
            <p style="color:#aaa; font-size:14px; margin-bottom:30px;">New project inquiry received from the website.</p>
            
            <div style="border-top:1px solid #333; padding-top:20px;">
              <p style="margin-bottom:15px;"><strong>Name:</strong><br/>${data.name}</p>
              <p style="margin-bottom:15px;"><strong>Email:</strong><br/>${data.email}</p>
              <p style="margin-bottom:15px;"><strong>Project Type:</strong><br/>${data.project}</p>
              <p style="margin-bottom:15px;"><strong>Message:</strong><br/>${data.message}</p>
            </div>
            
            <hr style="border:none; border-top:1px solid #333; margin:30px 0;"/>
            <p style="color:#555; font-size:12px;">Sent via Seto's Contact Form.</p>
          </div>
        </div>
      `
    });

    if (result.error) {
      console.error("RESEND ERROR:", result.error);
      return Response.json({ success: false, error: result.error }, { status: 500 });
    }

    return Response.json({ success: true });

  } catch (error: any) {
    console.error("API ERROR:", error.message);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}