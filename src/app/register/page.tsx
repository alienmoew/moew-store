"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Gamepad2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { register } from "@/app/auth/actions";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Password validation state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  async function handleRegister(formData: FormData) {
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const result = await register(formData);
    
    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setSuccess(result.success);
      // Xóa form
      setPassword("");
      setConfirmPassword("");
      const form = document.getElementById("register-form") as HTMLFormElement;
      if (form) form.reset();
    }
    
    setLoading(false);
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#8B5CF6]/3 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Gamepad2 className="h-8 w-8 text-[#8B5CF6]" />
            <span className="text-2xl font-bold text-gradient-purple">
              Moew Store
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Tạo tài khoản mới</h1>
          <p className="text-[#A1A1AA] mt-2">
            Đăng ký để trải nghiệm mua sắm game tốt nhất
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-[#111118] border border-white/10 rounded-2xl p-8 space-y-6 glow-purple">
          {/* Error & Success Messages */}
          {error && (
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg p-3 text-sm text-[#EF4444]">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            </div>
          )}
          
          {success && (
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-lg p-3 text-sm text-[#22C55E]">
                <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                <p>{success}</p>
              </div>
            </div>
          )}

          {/* Registration Form */}
          <form id="register-form" action={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#A1A1AA]"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A1A1AA]" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-[#A1A1AA]/50 focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[#A1A1AA]"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A1A1AA]" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ít nhất 6 ký tự"
                  className="pl-10 pr-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-[#A1A1AA]/50 focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-[#A1A1AA]"
              >
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <Lock className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors",
                  passwordsMatch ? "text-[#22C55E]" : "text-[#A1A1AA]"
                )} />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  className={cn(
                    "pl-10 pr-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-[#A1A1AA]/50 focus:ring-[#8B5CF6]/20",
                    confirmPassword && !passwordsMatch ? "border-[#EF4444] focus:border-[#EF4444]" : "focus:border-[#8B5CF6]",
                    passwordsMatch && "border-[#22C55E]/50 focus:border-[#22C55E]"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-white transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-xs text-[#EF4444] mt-1">
                  Mật khẩu không khớp
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading || (confirmPassword.length > 0 && !passwordsMatch)}
              className="w-full h-12 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white font-medium text-sm transition-all duration-200 mt-2"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang xử lý...
                </div>
              ) : (
                "Đăng ký tài khoản"
              )}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-[#A1A1AA]">
            Đã có tài khoản?{" "}
            <Link
              href="/login"
              className="text-[#8B5CF6] hover:text-[#A78BFA] font-medium transition-colors"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Thêm utility cn nếu chưa được import tự động từ utils
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
