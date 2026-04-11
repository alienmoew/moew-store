import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Info, Zap, Flame, Crown, Star, ArrowRight } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[90vh] min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* Ultra Premium Animated Background */}
      <div className="absolute inset-0 z-0 gradient-bg-premium">
        {/* Main background image with parallax-like effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80')",
          }}
        />

        {/* Multiple sophisticated gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0F] via-[#0B0B0F]/95 to-[#0B0B0F]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0F]/60 to-[#0B0B0F]" />

        {/* Dynamic aurora orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-[#8B5CF6]/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[5%] w-[600px] h-[600px] bg-[#6366F1]/15 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-[30%] right-[20%] w-[400px] h-[400px] bg-[#A78BFA]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2.5s' }} />
          <div className="absolute bottom-[20%] left-[30%] w-[300px] h-[300px] bg-[#7C3AED]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '3s' }} />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-20" />

        {/* Noise texture */}
        <div className="absolute inset-0 noise-texture opacity-40" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Premium Badge - Animated */}
          <div className="inline-flex items-center rounded-full border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 backdrop-blur-xl px-5 py-2 mb-8 animate-fade-in-up">
            <div className="relative flex items-center">
              <Crown className="w-4 h-4 text-[#F59E0B] mr-2 animate-pulse" />
              <span className="text-sm text-[#A78BFA] font-medium tracking-wide">TRENDING THIS WEEK</span>
            </div>
            <span className="ml-3 text-[#A1A1AA] text-sm">•</span>
            <span className="ml-3 text-sm text-[#A1A1AA] flex items-center">
              <Zap className="w-3 h-3 text-[#F59E0B] mr-1.5 animate-pulse" />
              <span className="font-semibold text-white">30% OFF</span>
            </span>
          </div>

          {/* Title with gradient - Extra Large */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tight mb-8 animate-fade-in-up animate-delay-100">
            CYBERPUNK{" "}
            <span className="text-gradient-luxury inline-block animate-glow-pulse">
              2077
            </span>
          </h1>

          {/* Description - Enhanced */}
          <p className="text-xl md:text-2xl text-[#A1A1AA] max-w-2xl leading-relaxed mb-10 animate-fade-in-up animate-delay-200">
            Step into <span className="text-white font-semibold">Night City</span> — where power, luxury, and biotech redefine humanity.
            Become the legendary mercenary of your own story.
          </p>

          {/* Stats Pills - Premium Design */}
          <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up animate-delay-300">
            <div className="glass-premium rounded-full px-5 py-2.5 flex items-center gap-2.5">
              <Flame className="w-4 h-4 text-[#EF4444]" />
              <span className="text-white text-sm font-medium">Action RPG</span>
            </div>
            <div className="glass-premium rounded-full px-5 py-2.5 flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-white text-sm font-medium">Single Player</span>
            </div>
            <div className="glass-premium rounded-full px-5 py-2.5 flex items-center gap-2.5">
              <Crown className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-white text-sm font-medium">Bestseller</span>
            </div>
            <div className="glass-premium rounded-full px-5 py-2.5 flex items-center gap-2.5">
              <Star className="w-4 h-4 text-[#F59E0B] fill-current" />
              <span className="text-white text-sm font-medium">4.9/5 Rating</span>
            </div>
          </div>

          {/* CTA Buttons - Premium */}
          <div className="flex flex-wrap items-center gap-5 animate-fade-in-up animate-delay-400">
            <Button
              size="lg"
              className="btn-premium gap-3 h-16 px-10 text-xl rounded-2xl shadow-2xl shadow-[#8B5CF6]/30 hover:shadow-[#8B5CF6]/50 flex items-center"
            >
              <ShoppingCart className="h-6 w-6" />
              <span>BUY NOW</span>
              <span className="opacity-80">•</span>
              <span className="text-lg">990.000đ</span>
            </Button>

            <Link href="/games/cyberpunk-2077">
              <Button
                size="lg"
                variant="outline"
                className="btn-luxury-secondary gap-3 h-16 px-10 text-xl rounded-2xl border-white/20 bg-white/5 backdrop-blur-sm"
              >
                <Info className="h-6 w-6" />
                <span>VIEW DETAILS</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Animated */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-14 rounded-full border-2 border-white/20 flex items-start justify-center p-3">
          <div className="w-1.5 h-4 bg-gradient-to-b from-white to-white/40 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent" />
    </section>
  );
}