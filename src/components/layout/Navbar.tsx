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

export default function Navbar({ user }: { user: any }) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-[#0B0B0F]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0B0B0F]/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Gamepad2 className="h-7 w-7 text-[#8B5CF6] transition-transform group-hover:scale-110" />
          <span className="text-xl font-bold text-gradient-purple">
            Moew Store
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "text-white bg-[#8B5CF6]/15 text-[#A78BFA]"
                  : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex items-center relative max-w-xs flex-1 mx-6">
          <Search className="absolute left-3 h-4 w-4 text-[#A1A1AA]" />
          <Input
            type="text"
            placeholder="Tìm kiếm game..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-[#A1A1AA] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20 h-9"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Search icon - Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-[#A1A1AA] hover:text-white hover:bg-white/5"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Cart */}
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-[#A1A1AA] hover:text-white hover:bg-white/5"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#8B5CF6] text-[10px] font-bold text-white flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>

          {/* User Menu - Desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden sm:flex text-[#A1A1AA] hover:text-white hover:bg-white/5"
                />
              }
            >
              <UserIcon className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-[#111118] border-white/10"
            >
              {user ? (
                <>
                  <div className="px-2 py-1.5 text-sm text-white truncate border-b border-white/10 mb-1">
                    {user.email}
                  </div>
                  <DropdownMenuItem
                    render={<Link href="/profile" />}
                    className="cursor-pointer text-[#A1A1AA] hover:text-white focus:text-white"
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    Tài khoản cá nhân
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    render={<Link href="/orders" />}
                    className="cursor-pointer text-[#A1A1AA] hover:text-white focus:text-white"
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
                    className="cursor-pointer text-[#A1A1AA] hover:text-white focus:text-white"
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    Đăng nhập
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    render={<Link href="/register" />}
                    className="cursor-pointer text-[#A1A1AA] hover:text-white focus:text-white"
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
                  className="md:hidden text-[#A1A1AA] hover:text-white hover:bg-white/5"
                />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 bg-[#111118] border-white/10 p-0"
              showCloseButton={false}
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <Link href="/" className="flex items-center gap-2">
                    <Gamepad2 className="h-6 w-6 text-[#8B5CF6]" />
                    <span className="text-lg font-bold text-gradient-purple">
                      Moew Store
                    </span>
                  </Link>
                </div>

                {/* Mobile Search */}
                <div className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A1A1AA]" />
                    <Input
                      type="text"
                      placeholder="Tìm kiếm game..."
                      className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-[#A1A1AA]"
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
                          ? "text-[#A78BFA] bg-[#8B5CF6]/15"
                          : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/cart"
                    className="px-4 py-3 rounded-lg text-sm font-medium text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Giỏ hàng
                  </Link>
                </nav>

                {/* Mobile Auth */}
                <div className="mt-auto p-4 border-t border-white/10 space-y-2">
                  {user ? (
                    <>
                      <div className="px-2 pb-2 mb-2 text-sm text-[#A1A1AA] border-b border-white/10 truncate">
                        Đang đăng nhập: {user.email}
                      </div>
                      <Link href="/profile" className="block w-full">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-[#A1A1AA] hover:text-white hover:bg-white/5"
                        >
                          <UserIcon className="h-4 w-4 mr-2" /> Tài khoản cá nhân
                        </Button>
                      </Link>
                      <Link href="/orders" className="block w-full">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-[#A1A1AA] hover:text-white hover:bg-white/5"
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
                        <Button className="w-full bg-[#8B5CF6] hover:bg-[#A78BFA] text-white">
                          Đăng nhập
                        </Button>
                      </Link>
                      <Link href="/register" className="block">
                        <Button
                          variant="outline"
                          className="w-full border-white/10 text-[#A1A1AA] hover:text-white hover:bg-white/5"
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
