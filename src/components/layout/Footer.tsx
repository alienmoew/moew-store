import Link from "next/link";
import { Crown, Gamepad2, Mail, Twitter, Github, Disc } from "lucide-react";
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

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Disc, href: "#", label: "Discord" },
  { icon: Github, href: "#", label: "Github" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#0A0A0E] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#6366F1]/5 rounded-full blur-[100px]" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 py-12 md:py-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#8B5CF6]/30 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <Crown className="relative h-8 w-8 text-gradient-luxury transition-all duration-300 group-hover:scale-110" />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-gradient-luxury transition-all duration-300">
                Moew Store
              </span>
            </Link>
            <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-sm">
              Cửa hàng game digital hiện đại. Khám phá hàng ngàn tựa game hấp
              dẫn với giá tốt nhất, bản quyền chính hãng.
            </p>

            {/* Newsletter */}
            <div className="space-y-3 pt-2">
              <p className="text-sm font-medium text-white">Nhận tin khuyến mãi</p>
              <div className="flex gap-2">
                <div className="relative flex-1 max-w-xs">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    type="email"
                    placeholder="Email của bạn..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 outline-none transition-all text-sm"
                  />
                </div>
                <button className="px-4 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#A78BFA] hover:to-[#8B5CF6] text-white rounded-xl font-medium text-sm transition-all duration-300">
                  Đăng ký
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/10 transition-all duration-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]" />
              Sản phẩm
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#A1A1AA] hover:text-[#A78BFA] transition-colors duration-300 hover:pl-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]" />
              Hỗ trợ
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#A1A1AA] hover:text-[#A78BFA] transition-colors duration-300 hover:pl-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]" />
              Pháp lý
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#A1A1AA] hover:text-[#A78BFA] transition-colors duration-300 hover:pl-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="text-xs text-[#A1A1AA]">
            © 2026 Moew Store. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#A1A1AA]/60">
            <Gamepad2 className="w-3 h-3 text-[#8B5CF6]" />
            Made with passion for gamers
          </div>
        </div>
      </div>
    </footer>
  );
}