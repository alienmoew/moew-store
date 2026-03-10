import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  product: [
    { label: "Tất cả Games", href: "/games" },
    { label: "Danh mục", href: "/categories" },
    { label: "Game mới", href: "/games?sort=newest" },
    { label: "Bán chạy", href: "/games?sort=popular" },
  ],
  support: [
    { label: "Trung tâm hỗ trợ", href: "#" },
    { label: "Liên hệ", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  legal: [
    { label: "Điều khoản", href: "#" },
    { label: "Chính sách bảo mật", href: "#" },
    { label: "Hoàn tiền", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0A0A0E]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Gamepad2 className="h-6 w-6 text-[#8B5CF6]" />
              <span className="text-lg font-bold text-gradient-purple">
                Moew Store
              </span>
            </Link>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Cửa hàng game digital hiện đại. Khám phá hàng ngàn tựa game hấp
              dẫn với giá tốt nhất.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Sản phẩm</h3>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#A1A1AA] hover:text-[#A78BFA] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Hỗ trợ</h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#A1A1AA] hover:text-[#A78BFA] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Pháp lý</h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#A1A1AA] hover:text-[#A78BFA] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-white/5" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="text-xs text-[#A1A1AA]">
            © 2026 Moew Store. All rights reserved.
          </p>
          <p className="text-xs text-[#A1A1AA]/60">
            Made with 💜 for gamers
          </p>
        </div>
      </div>
    </footer>
  );
}
