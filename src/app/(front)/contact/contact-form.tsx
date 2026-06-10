"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact"

export default function ContactForm() {
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  })

  const onSubmit = (values: ContactFormValues) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
        const json: { success: boolean; error?: string } = await res.json()

        if (!json.success) {
          toast.error(json.error ?? "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง")
          return
        }

        form.reset()
        setSuccess(true)
      } catch {
        toast.error("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง")
      }
    })
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e6faf1]">
          <CheckCircle className="size-8 text-[#03ca77]" />
        </div>
        <h3 className="text-xl font-bold text-[#001f3e]">ส่งข้อความสำเร็จ!</h3>
        <p className="text-sm leading-relaxed text-[#66798b]">
          ขอบคุณที่ติดต่อเรา เราจะตอบกลับภายใน 1–2 วันทำการ
        </p>
        <Button
          className="mt-2 rounded-[100px] bg-primary px-8 font-semibold text-white hover:bg-[#0053cc] transition-colors"
          onClick={() => setSuccess(false)}
        >
          ส่งข้อความอีกครั้ง
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-[#001f3e]">ชื่อ</FormLabel>
              <FormControl>
                <Input placeholder="กรอกชื่อของคุณ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-[#001f3e]">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-[#001f3e]">ข้อความ</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="พิมพ์ข้อความที่ต้องการ..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full rounded-[100px] bg-primary font-semibold text-white hover:bg-[#0053cc] transition-colors disabled:opacity-60"
        >
          {isPending ? "กำลังส่ง..." : "ส่งข้อความ"}
        </Button>
      </form>
    </Form>
  )
}
