import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { ShoppingBasket } from "lucide-react";
import CountCartItem from "@/app/(front)/components/CountCartItem";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LogoutButton from "./logout-button";

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <nav className="sticky top-0 z-50 h-16 border-b border-border bg-white shadow-[0_-2px_4px_0_rgba(0,31,62,0.08)]">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <Link href="/cart">
          <Badge className="gap-1.5 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#0053cc]">
            <ShoppingBasket className="size-4" /> <CountCartItem /> ชิ้น
          </Badge>
        </Link>

        <div className="flex items-center gap-3">

          {
            !session && (
              <>
                <Button
                  asChild
                  className="hidden sm:inline-flex rounded border border-primary bg-transparent text-primary hover:bg-primary hover:text-white transition-colors"
                  variant="outline"
                >
                  <Link href="/login">เข้าสู่ระบบ</Link>
                </Button>
                <Button
                  asChild
                  className="rounded bg-primary text-white font-semibold hover:bg-[#0053cc] transition-colors"
                >
                  <Link href="/signup">สมัครสมาชิก</Link>
                </Button>
              </>
            )
          }

          {
            session && (
              <>
                <div className="hidden sm:flex items-center mr-2 text-[#001f3e] font-medium">
                  สวัสดี, {session.user.name}
                </div>
                <div>
                  <LogoutButton />
                </div>
              </>
            )
          }

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
