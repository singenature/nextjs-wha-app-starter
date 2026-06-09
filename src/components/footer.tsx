import Link from "next/link";

const columns = [
  {
    title: "บริการ",
    links: [
      { label: "สั่งซื้อสินค้า", href: "/product" },
      { label: "หลักสูตรเรียนรู้", href: "/course" },
      { label: "ตะกร้าสินค้า", href: "/cart" },
    ],
  },
  {
    title: "บริษัท",
    links: [
      { label: "เกี่ยวกับเรา", href: "/about" },
      { label: "นโยบายความเป็นส่วนตัว", href: "#" },
      { label: "ข้อกำหนดการใช้บริการ", href: "#" },
    ],
  },
  {
    title: "บัญชี",
    links: [
      { label: "เข้าสู่ระบบ", href: "/login" },
      { label: "สมัครสมาชิก", href: "/signup" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#001f3e] text-white">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-[#0068ff] text-sm font-bold text-white">
                E
              </span>
              <span className="text-lg font-bold text-white">Commerce</span>
            </div>
            <p className="text-sm leading-relaxed text-[#66798b]">
              ระบบ E-Commerce สำหรับยุคใหม่<br />
              ปลอดภัย รวดเร็ว ครบวงจร
            </p>
            <div className="mt-6 flex gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#03ca77]" />
              <span className="text-xs text-[#66798b]">ระบบออนไลน์</span>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-semibold text-white">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#66798b] transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p className="text-xs text-[#66798b]">
            © 2026 ระบบ E-Commerce. สงวนลิขสิทธิ์ทุกประการ.
          </p>
          <div className="flex gap-4 text-xs text-[#66798b]">
            <Link href="#" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</Link>
            <Link href="#" className="hover:text-white transition-colors">ข้อกำหนด</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
