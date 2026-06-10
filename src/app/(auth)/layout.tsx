import type { Metadata } from "next";
import { Prompt, Lora } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";

const loraHeading = Lora({ subsets: ['latin'], variable: '--font-heading' });

export const promptFont = Prompt({
  weight: ['400', '500', '700'],
  subsets: ['thai'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ระบบ ล็อกอิน",
  description: "เรียนรู้การเขียน Nex.tjs",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={cn(promptFont.className, loraHeading.variable)}
    >
      <body className="bg-[#f2f7ff]">
        {children}
      </body>
    </html>
  );
}
