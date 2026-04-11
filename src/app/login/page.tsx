"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginWithEmail, loginWithGoogle } from "@/app/auth/actions";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleEmailLogin(formData: FormData) {
    setLoading(true);
    setError("");
    const result = await loginWithEmail(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    setError("");
    const result = await loginWithGoogle();
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else if (result?.url) {
      window.location.href = result.url;
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6366F1]/10 rounded-full blur-[100px]" />
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
            <span className="text-xs text-[#A78BFA] font-medium uppercase tracking-wider">Welcome back</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Chào mừng trở lại</h1>
          <p className="text-[#A1A1AA]">
            Đăng nhập để tiếp tục mua sắm game yêu thích
          </p>
        </div>

        {/* Login Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/20 via-[#6366F1]/10 to-[#8B5CF6]/20 rounded-2xl blur-xl opacity-50" />

          <div className="relative bg-[#111118] border border-white/10 rounded-2xl p-8 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl p-4 text-sm text-[#EF4444]">
                <span className="text-lg">⚠</span>
                <p>{error}</p>
              </div>
            )}

            {/* Google Login */}
            <Button
              onClick={handleGoogleLogin}
              disabled={loading}
              variant="outline"
              className="w-full h-12 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white gap-3 text-base font-medium transition-all duration-300"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Đăng nhập với Google
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#111118] px-4 text-[#A1A1AA]">
                  hoặc đăng nhập bằng email
                </span>
              </div>
            </div>

            {/* Email Form */}
            <form action={handleEmailLogin} className="space-y-5">
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
                <div className="flex items-center justify-between ml-1">
                  <label htmlFor="password" className="text-sm font-medium text-white">
                    Mật khẩu
                  </label>
                  <Link href="#" className="text-xs text-[#8B5CF6] hover:text-[#A78BFA] transition-colors">
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 transition-all duration-300 group-focus-within:text-[#8B5CF6]" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
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

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#A78BFA] hover:to-[#8B5CF6] text-white font-bold text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#8B5CF6]/30"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang xử lý...
                  </div>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
            </form>

            {/* Register Link */}
            <p className="text-center text-base text-[#A1A1AA]">
              Chưa có tài khoản?{" "}
              <Link href="/register" className="text-[#8B5CF6] hover:text-[#A78BFA] font-medium transition-colors">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}