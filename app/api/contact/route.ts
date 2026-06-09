import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !port || !user || !pass) {
      console.error("Missing SMTP environment variables.");
      return NextResponse.json(
        {
          error: "SMTP configuration is missing on the server. Please check your environment variables.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(port, 10),
      secure: port === "465", // True for port 465, false for 587 or other SMTP ports
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${user}>`, // Authenticated sender email
      replyTo: email,              // Set reply-to as the sender's actual email
      to: "siddheshmoon908@gmail.com",
      subject: `Portfolio Contact: Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #8b5cf6; border-bottom: 1px solid #eaeaea; padding-bottom: 10px; margin-top: 0;">New Contact Form Message</h2>
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #8b5cf6; text-decoration: none;">${email}</a></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #8b5cf6; margin-top: 20px; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap; color: #333333;">${message}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email transmitted successfully." });
  } catch (error: any) {
    console.error("Nodemailer transmission error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to transmit message payload." },
      { status: 500 }
    );
  }
}
