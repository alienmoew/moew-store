"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Search,
  ShoppingCart,
  User as UserIcon,
  Menu,
  LogOut,
  Package,
  Gamepad2,
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

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0B0F]/90 backdrop-blur-2xl supports-[backdrop-filter]:bg-[#0B0B0F]/80">
      {/* Subtle gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent" />
      
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-[#8B5CF6]/30 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <Gamepad2 className="relative h-8 w-8 text-[#A78BFA] transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 drop-shadow-[0_0_15px_rgba(167,139,250,0.6)]" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] bg-clip-text text-transparent group-hover:from-white group-hover:to-[#A78BFA] transition-all duration-300">
            Moew Store
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                pathname === link.href
                  ? "text-white bg-[#8B5CF6]/20 text-[#C4B5FD]"
                  : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
              {/* Animated underline */}
              <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#8B5CF6] rounded-full transition-all duration-300 ${
                pathname === link.href ? "w-6" : "group-hover:w-4"
              }`} />
            </Link>
          ))}
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex items-center relative max-w-xs flex-1 mx-6 group">
          <Search className="absolute left-3 h-4 w-4 text-zinc-500 transition-all duration-300 group-focus-within:scale-125 group-focus-within:text-[#8B5CF6]" />
          <Input
            type="text"
            placeholder="Tìm kiếm game..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/30 focus:ring-offset-0 focus:ring-offset-[#0B0B0F] h-9 rounded-full transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          {/* Search icon - Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-zinc-400 hover:text-white hover:bg-white/10"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Cart */}
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-zinc-400 hover:text-white hover:bg-white/10"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-gradient-to-br from-[#EF4444] to-[#DC2626] text-[10px] font-bold text-white flex items-center justify-center shadow-lg shadow-[#EF4444]/30">
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
                  className="hidden sm:flex text-zinc-400 hover:text-white hover:bg-white/10"
                />
              }
            >
              <UserIcon className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-52 bg-[#111118]/95 backdrop-blur-xl border-white/10"
            >
              {user ? (
                <>
                  <div className="px-2 py-1.5 text-sm text-white truncate border-b border-white/10 mb-1">
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
          <Sheet>
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
              className="w-72 bg-[#111118] border-l border-white/5 p-0"
              showCloseButton={false}
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                  <Link href="/" className="flex items-center gap-2">
                    <Gamepad2 className="h-6 w-6 text-[#A78BFA]" />
                    <span className="text-lg font-bold bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] bg-clip-text text-transparent">
                      Moew Store
                    </span>
                  </Link>
                </div>

                {/* Mobile Search */}
                <div className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input
                      type="text"
                      placeholder="Tìm kiếm game..."
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500"
                    />
                  </div>
                </div>

                {/* Mobile Nav Links */}
                <nav className="flex flex-col px-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        pathname === link.href
                          ? "text-[#C4B5FD] bg-[#8B5CF6]/15"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/cart"
                    className="px-4 py-3 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Giỏ hàng
                  </Link>
                </nav>

                {/* Mobile Auth */}
                <div className="mt-auto p-4 border-t border-white/5 space-y-2">
                  {user ? (
                    <>
                      <div className="px-2 pb-2 mb-2 text-sm text-zinc-500 border-b border-white/5 truncate">
                        Đang đăng nhập: {user.email}
                      </div>
                      <Link href="/profile" className="block w-full">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/5"
                        >
                          <UserIcon className="h-4 w-4 mr-2" /> Tài khoản cá nhân
                        </Button>
                      </Link>
                      <Link href="/orders" className="block w-full">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/5"
                        >
                          <Package className="h-4 w-4 mr-2" /> Lịch sử đơn hàng
                        </Button>
                      </Link>
                      <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className="w-full justify-start text-[#EF4444] hover:text-[#EF4444] hover:bg-[#EF4444]/10"
                      >
                        <LogOut className="h-4 w-4 mr-2" /> Đăng xuất
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="block">
                        <Button className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
                          Đăng nhập
                        </Button>
                      </Link>
                      <Link href="/register" className="block">
                        <Button
                          variant="outline"
                          className="w-full border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
                        >
                          Đăng ký
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}