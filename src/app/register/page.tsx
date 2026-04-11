"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Crown, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { register } from "@/app/auth/actions";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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
      setPassword("");
      setConfirmPassword("");
      const form = document.getElementById("register-form") as HTMLFormElement;
      if (form) form.reset();
    }

    setLoading(false);
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#6366F1]/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 dots-pattern opacity-20" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <Crown className="h-10 w-10 text-gradient-luxury" />
            <span className="text-3xl font-bold text-white">
              Moew Store
            </span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-4">
            <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
            <span className="text-xs text-[#A78BFA] font-medium uppercase tracking-wider">Get Started</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Tạo tài khoản mới</h1>
          <p className="text-[#A1A1AA]">
            Đăng ký để trải nghiệm mua sắm game tốt nhất
          </p>
        </div>

        {/* Register Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/20 via-[#6366F1]/10 to-[#8B5CF6]/20 rounded-2xl blur-xl opacity-50" />

          <div className="relative bg-[#111118] border border-white/10 rounded-2xl p-8 space-y-6">
            {/* Error & Success Messages */}
            {error && (
              <div className="flex items-start gap-3 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl p-4 text-sm text-[#EF4444]">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="flex items-start gap-3 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-xl p-4 text-sm text-[#22C55E]">
                <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                <p>{success}</p>
              </div>
            )}

            {/* Registration Form */}
            <form id="register-form" action={handleRegister} className="space-y-5">
              <div className="space-y-3">
                <label htmlFor="email" className="text-sm font-medium text-white ml-1">
                  Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 transition-all duration-300 group-focus-within:text-[#8B5CF6]" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 rounded-xl transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="password" className="text-sm font-medium text-white ml-1">
                  Mật khẩu
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 transition-all duration-300 group-focus-within:text-[#8B5CF6]" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ít nhất 6 ký tự"
                    className="pl-11 pr-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 rounded-xl transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-white ml-1">
                  Xác nhận mật khẩu
                </label>
                <div className="relative group">
                  <Lock className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors",
                    passwordsMatch ? "text-[#22C55E]" : "text-zinc-500"
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
                      "pl-11 pr-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-[#8B5CF6]/20 rounded-xl transition-all duration-300",
                      confirmPassword && !passwordsMatch ? "border-[#EF4444] focus:border-[#EF4444]" : "focus:border-[#8B5CF6]",
                      passwordsMatch && "border-[#22C55E]/50 focus:border-[#22C55E]"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmPassword && !passwordsMatch && (
                  <p className="text-xs text-[#EF4444] mt-1 ml-1 flex items-center gap-1">
                    <span>•</span> Mật khẩu không khớp
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading || (confirmPassword.length > 0 && !passwordsMatch)}
                className="w-full h-14 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#A78BFA] hover:to-[#8B5CF6] text-white font-bold text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#8B5CF6]/30"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang xử lý...
                  </div>
                ) : (
                  "Tạo tài khoản"
                )}
              </Button>
            </form>

            {/* Login Link */}
            <p className="text-center text-base text-[#A1A1AA]">
              Đã có tài khoản?{" "}
              <Link href="/login" className="text-[#8B5CF6] hover:text-[#A78BFA] font-medium transition-colors">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}