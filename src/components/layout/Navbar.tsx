"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  User as UserIcon,
  Menu,
  LogOut,
  Package,
  Crown,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logout } from "@/app/auth/actions";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/games", label: "Games" },
  { href: "/categories", label: "Danh mục" },
];

export default function Navbar({ user, cartCount = 0 }: { user: any, cartCount?: number }) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-[#0B0B0F]/95 backdrop-blur-2xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/60 to-transparent" />

      <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-[#8B5CF6]/40 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <Crown className="relative h-8 w-8 text-gradient-luxury transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 drop-shadow-[0_0_15px_rgba(167,139,250,0.6)]" />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-white via-[#A78BFA] to-white bg-clip-text text-transparent group-hover:bg-gradient-to-r group-hover:from-[#8B5CF6] group-hover:via-[#A78BFA] group-hover:to-[#8B5CF6] bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite] transition-all duration-300">
              Moew Store
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                pathname === link.href
                  ? "text-white bg-gradient-to-r from-[#8B5CF6]/20 to-[#6366F1]/20 border border-[#8B5CF6]/30"
                  : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
              {/* Animated underline */}
              <span
                className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] rounded-full transition-all duration-300 ${
                  pathname === link.href ? "w-8" : "w-0 group-hover:w-6"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex items-center relative max-w-xs flex-1 mx-6 group">
          <Search className="absolute left-4 h-4 w-4 text-zinc-500 transition-all duration-300 group-focus-within:scale-125 group-focus-within:text-[#8B5CF6]" />
          <Input
            type="text"
            placeholder="Tìm kiếm game..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 pr-4 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 focus:ring-offset-0 focus:ring-offset-[#0B0B0F] h-10 rounded-xl transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20 shadow-sm"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Search icon - Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-zinc-400 hover:text-white hover:bg-white/10"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Cart with enhanced styling */}
          <Link href="/cart" className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] text-[10px] font-bold text-white flex items-center justify-center shadow-lg shadow-[#8B5CF6]/40 animate-pulse">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          {/* User Menu - Desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden sm:flex text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                />
              }
            >
              <UserIcon className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 glass-premium border border-[#8B5CF6]/20"
            >
              {user ? (
                <>
                  <div className="px-3 py-3 text-sm text-white truncate border-b border-white/10 mb-1 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                    {user.email}
                  </div>
                  <DropdownMenuItem
                    render={<Link href="/profile" />}
                    className="cursor-pointer text-zinc-400 hover:text-white focus:text-white"
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    Tài khoản cá nhân
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    render={<Link href="/orders" />}
                    className="cursor-pointer text-zinc-400 hover:text-white focus:text-white"
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Lịch sử đơn hàng
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-[#EF4444] hover:text-[#EF4444] focus:text-[#EF4444]"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    render={<Link href="/login" />}
                    className="cursor-pointer text-zinc-400 hover:text-white focus:text-white"
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    Đăng nhập
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    render={<Link href="/register" />}
                    className="cursor-pointer text-zinc-400 hover:text-white focus:text-white"
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Đăng ký
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-zinc-400 hover:text-white hover:bg-white/10"
                />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 bg-[#0B0B0F] border-l border-white/5 p-0 overflow-hidden"
              showCloseButton={false}
            >
              {/* Mobile Menu Header with gradient */}
              <div className="relative px-6 py-6 bg-gradient-to-br from-[#8B5CF6]/10 to-transparent">
                <div className="absolute inset-0 aurora-bg opacity-30" />
                <div className="relative flex flex-col items-start space-y-4">
                  <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                    <Crown className="h-8 w-8 text-gradient-luxury" />
                    <span className="text-xl font-bold text-white">Moew Store</span>
                  </Link>
                </div>
              </div>

              {/* Mobile Search */}
              <div className="p-4 border-b border-white/5">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm game..."
                    className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 rounded-xl"
                  />
                </div>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col px-4 py-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-4 rounded-xl text-base font-medium transition-colors ${
                      pathname === link.href
                        ? "text-white bg-gradient-to-r from-[#8B5CF6]/20 to-[#6366F1]/10 border border-[#8B5CF6]/30"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-4 rounded-xl text-base font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-3"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Giỏ hàng
                  {cartCount > 0 && (
                    <span className="ml-auto px-2 py-0.5 rounded-full bg-[#8B5CF6] text-xs font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </nav>

              {/* Mobile Auth */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5 space-y-3 bg-[#0B0B0F]/80 backdrop-blur-xl">
                {user ? (
                  <>
                    <div className="px-3 pb-3 mb-2 text-sm text-zinc-500 border-b border-white/5 truncate flex items-center gap-2">
                      <Sparkles className="w-3 h-3" />
                      {user.email}
                    </div>
                    <Link href="/orders" className="block w-full" onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl"
                      >
                        <Package className="h-4 w-4 mr-2" /> Lịch sử đơn hàng
                      </Button>
                    </Link>
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      className="w-full justify-start text-[#EF4444] hover:text-[#EF4444] hover:bg-[#EF4444]/10 rounded-xl"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Đăng xuất
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#A78BFA] hover:to-[#8B5CF6] text-white rounded-xl font-medium">
                        Đăng nhập
                      </Button>
                    </Link>
                    <Link href="/register" className="block" onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl"
                      >
                        Đăng ký
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Bottom gradient glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent opacity-50" />
    </header>
  );
}