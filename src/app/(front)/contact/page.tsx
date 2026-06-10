import type { Metadata } from "next"
import { Mail, Phone, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import ContactForm from "./contact-form"

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description: "ส่งข้อความหาเราได้ตลอดเวลา เราพร้อมตอบกลับคุณโดยเร็วที่สุด",
}

const contactItems = [
  {
    icon: Mail,
    label: "อีเมล",
    value: "contact@ecommerce.th",
  },
  {
    icon: Phone,
    label: "เบอร์โทร",
    value: "02-xxx-xxxx",
  },
  {
    icon: Clock,
    label: "เวลาทำการ",
    value: "จันทร์–ศุกร์ 9:00–18:00 น.",
  },
]

// http://localhost:3000/contact
export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f2f4f5]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f2f7ff] via-white to-white px-6 py-16 text-center">
        <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-[-0.04em] text-[#001f3e] sm:text-5xl">
          ติดต่อเรา
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[#66798b]">
          มีคำถาม หรือต้องการความช่วยเหลือ? ส่งข้อความหาเราได้เลย
        </p>
      </section>

      {/* Content */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-(--breakpoint-lg)">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.6fr] md:gap-12">

            {/* Left — Contact Info */}
            <div>
              <h2 className="text-xl font-bold text-[#001f3e]">ข้อมูลติดต่อ</h2>
              <div className="mt-6 space-y-5">
                {contactItems.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#e6f0ff]">
                      <Icon className="size-4 text-[#0068ff]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#66798b]">
                        {label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-[#001f3e]">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-7 bg-[#e6e9ec]" />

              <p className="text-sm leading-relaxed text-[#66798b]">
                เราพร้อมตอบกลับทุกข้อสงสัยและรับฟังความคิดเห็นของคุณ
                เพื่อปรับปรุงบริการให้ดียิ่งขึ้น
              </p>
            </div>

            {/* Right — Form */}
            <div className="rounded border border-[#e6e9ec] bg-white p-6 shadow-[0_0.125rem_0.25rem_rgba(0,0,0,0.075)] sm:p-8">
              <h2 className="mb-6 text-xl font-bold text-[#001f3e]">ส่งข้อความ</h2>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
