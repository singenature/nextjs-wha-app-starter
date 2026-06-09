import AppLoading from "../components/app-loading";
import { Suspense } from "react";
import { ShieldCheck, Zap, Gift } from "lucide-react";

async function ApiVersion() {
  const response = await fetch("https://api.codingthailand.com/api/version");
  const apiInfo = await response.json();
  return (
    <span className="font-semibold text-[#0068ff]">v{apiInfo.data.version}</span>
  );
}

const features = [
  {
    icon: ShieldCheck,
    iconBg: "#e6faf1",
    iconColor: "#03ca77",
    title: "ปลอดภัย 100%",
    desc: "ระบบรักษาความปลอดภัยระดับสูง ข้อมูลส่วนตัวและการทำธุรกรรมได้รับการปกป้องตลอดเวลา",
  },
  {
    icon: Zap,
    iconBg: "#e6f0ff",
    iconColor: "#0068ff",
    title: "รวดเร็ว ทันใจ",
    desc: "การทำรายการรวดเร็วในทุกขั้นตอน ตั้งแต่เลือกสินค้าจนถึงชำระเงินใน 3 ขั้นตอน",
  },
  {
    icon: Gift,
    iconBg: "#fff6ea",
    iconColor: "#faa828",
    title: "สะสมคะแนน",
    desc: "รับคะแนนสะสมทุกครั้งที่ซื้อสินค้า แลกรับส่วนลดและของรางวัลพิเศษมากมาย",
  },
];

// http://localhost:3000/about
export default function AboutPage() {
  return (
    <div>
      {/* Hero section */}
      <section className="bg-gradient-to-br from-[#f2f7ff] via-white to-white px-6 py-20 text-center">
        <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-[-0.04em] text-[#001f3e] sm:text-5xl">
          เกี่ยวกับเรา
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#66798b]">
          เราคือระบบ E-Commerce สำหรับยุคใหม่ที่มุ่งมั่นส่งมอบ
          ประสบการณ์การช้อปปิ้งออนไลน์ที่ดีที่สุดให้กับคุณ
          ปลอดภัย รวดเร็ว และครบวงจร
        </p>
      </section>

      {/* Features grid */}
      <section className="bg-[#f2f4f5] px-6 py-16">
        <div className="mx-auto max-w-(--breakpoint-lg)">
          <h2 className="mb-10 text-center text-2xl font-bold text-[#001f3e]">
            ทำไมต้องเลือกเรา
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded border border-[#e6e9ec] bg-white p-6 shadow-[0_0.125rem_0.25rem_rgba(0,0,0,0.075)] transition-shadow hover:shadow-[0_0.25rem_0.75rem_rgba(0,0,0,0.1)]"
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded"
                  style={{ backgroundColor: f.iconBg }}
                >
                  <f.icon className="size-5" style={{ color: f.iconColor }} />
                </div>
                <h3 className="text-lg font-semibold text-[#001f3e]">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#66798b]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API version info */}
      <section className="border-t border-[#e6e9ec] bg-white px-6 py-8">
        <div className="mx-auto max-w-(--breakpoint-lg) text-center text-sm text-[#66798b]">
          API Version:{" "}
          <Suspense fallback={<AppLoading />}>
            <ApiVersion />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
