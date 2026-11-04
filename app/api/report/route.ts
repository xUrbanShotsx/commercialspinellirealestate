import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { firstName, lastName, address, phone, email, propertyType } = await req.json();
    if (!firstName || !email || !address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Spinelli Commercial <onboarding@resend.dev>",
      to: ["info@spinellire.com"],
      replyTo: email,
      subject: `Commercial Report Request — ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #000;">
          <div style="background-color: #0D1F2D; padding: 24px 32px;">
            <h1 style="color: #ffffff; font-size: 20px; font-weight: 400; margin: 0;">Commercial Report Request</h1>
            <p style="color: #5BC2E7; font-size: 11px; margin: 4px 0 0; letter-spacing: 0.1em; text-transform: uppercase;">commercial.spinellirealestate.com.au</p>
          </div>
          <div style="padding: 32px; border: 1px solid #E8E5DF; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #7a7265; font-size: 13px; width: 140px;">Name</td><td style="padding: 8px 0; font-size: 13px;">${firstName} ${lastName}</td></tr>
              <tr><td style="padding: 8px 0; color: #7a7265; font-size: 13px;">Email</td><td style="padding: 8px 0; font-size: 13px;"><a href="mailto:${email}" style="color: #5BC2E7;">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; color: #7a7265; font-size: 13px;">Phone</td><td style="padding: 8px 0; font-size: 13px;"><a href="tel:${phone}" style="color: #5BC2E7;">${phone}</a></td></tr>` : ""}
              <tr><td style="padding: 8px 0; color: #7a7265; font-size: 13px;">Address</td><td style="padding: 8px 0; font-size: 13px;">${address}</td></tr>
              ${propertyType ? `<tr><td style="padding: 8px 0; color: #7a7265; font-size: 13px;">Property Type</td><td style="padding: 8px 0; font-size: 13px;">${propertyType}</td></tr>` : ""}
            </table>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Report request error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
