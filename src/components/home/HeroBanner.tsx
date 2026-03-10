import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Info } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80')",
        }}
      >
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0F] via-[#0B0B0F]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3 py-1 text-sm text-[#A78BFA] backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#8B5CF6] mr-2 animate-pulse"></span>
            Game Nổi Bật Tuần Này
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Cyberpunk <span className="text-gradient-purple">2077</span>
          </h1>
          
          <p className="text-lg text-[#A1A1AA] max-w-xl leading-relaxed">
            Khám phá Night City, siêu đô thị của tương lai ngập tràn quyền lực, sự xa hoa và cơ thể được cấy ghép công nghệ sinh học. Trở thành một lính đánh thuê ngoài vòng pháp luật và xây dựng huyền thoại của riêng bạn.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#A78BFA] text-white gap-2 h-12 px-8 text-base">
              <ShoppingCart className="h-5 w-5" />
              Mua ngay - 990.000đ
            </Button>
            
            <Link href="/games/cyberpunk-2077">
              <Button size="lg" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white gap-2 h-12 px-8 text-base backdrop-blur-sm">
                <Info className="h-5 w-5" />
                Xem chi tiết
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
