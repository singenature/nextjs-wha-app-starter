import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { contactSchema } from "@/lib/validations/contact"

type ApiResponse<T> = { success: true; data: T } | { success: false; error: string }

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<{ message: string }>>> {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const body: unknown = await req.json()

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง" },
      { status: 400 }
    )
  }

  const { name, email, message } = parsed.data

  const receiver = process.env.CONTACT_RECEIVER_EMAIL
  if (!receiver) {
    return NextResponse.json(
      { success: false, error: "ระบบยังไม่ได้ตั้งค่าผู้รับอีเมล" },
      { status: 500 }
    )
  }

  const { error } = await resend.emails.send({
    from:    "Contact Form <onboarding@resend.dev>",
    to:      receiver,
    replyTo: email,
    subject: `[ติดต่อเรา] ข้อความจาก ${name}`,
    html: `
      <p><strong>ชื่อ:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>ข้อความ:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  })

  if (error) {
    return NextResponse.json(
      { success: false, error: "ส่งอีเมลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true, data: { message: "ส่งข้อความสำเร็จแล้ว" } })
}
