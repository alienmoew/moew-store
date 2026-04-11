import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Calendar, ShieldCheck, Gamepad2, Heart, Star, Zap, CheckCircle } from "lucide-react";
import Image from "next/image";
import { AddToCartButton } from "@/components/games/AddToCartButton";

interface GameDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: GameDetailPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const supabase = await createClient();
  const { data: game } = await supabase
    .from("games")
    .select("name, description")
    .eq("slug", slug)
    .single();

  if (!game) {
    return {
      title: "Không tìm thấy game - Moew Store",
    };
  }

  return {
    title: `${game.name} - Moew Store`,
    description: game.description?.slice(0, 160) || "Mua game bản quyền giá rẻ tại Moew Store",
  };
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const supabase = await createClient();

  const { data: game, error } = await supabase
    .from("games")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !game) {
    notFound();
  }

  const imageUrl = game.image_url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f";

  return (
    <div className="min-h-screen bg-[#0B0B0F] pb-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#6366F1]/10 rounded-full blur-[100px]" />
      </div>

      {/* Hero Banner Background */}
      <div className="relative h-[60vh] min-h-[450px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 blur-sm"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        {/* Gradients for blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0F] via-[#0B0B0F]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0B0F]" />

        {/* Animated shine */}
        <div className="absolute inset-0 aurora-bg opacity-30" />
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative -mt-40 z-10">
        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12">

          {/* Left Column: Cover Image */}
          <div className="hidden xl:block w-full max-w-[320px] shrink-0">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#8B5CF6]/30 via-[#6366F1]/20 to-[#8B5CF6]/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl bg-[#111118] transform transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src={imageUrl}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="flex-1 space-y-8 pt-4 xl:pt-8">
            {/* Mobile Cover Image */}
            <div className="xl:hidden relative">
              <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl max-w-md">
                <img
                  src={imageUrl}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#A78BFA] hover:to-[#8B5CF6] text-white border-none text-sm px-4 py-1.5 font-medium">
                {game.category}
              </Badge>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30">
                <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                <span className="text-sm text-[#22C55E] font-medium">Có sẵn hàng</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#F59E0B]">
                <Star className="w-4 h-4 fill-current" />
                <span>4.8/5</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {game.name}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-[#A1A1AA]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#8B5CF6]" />
                <span>
                  Phát hành: {new Date(game.created_at).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-[#8B5CF6]" />
                <span>Nền tảng: PC / Steam</span>
              </div>
            </div>

            {/* Description */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#8B5CF6]" />
                Về trò chơi này
              </h2>
              <div className="prose prose-invert prose-p:text-[#A1A1AA] prose-p:leading-relaxed max-w-none text-lg leading-relaxed">
                <p>{game.description || "Chưa có mô tả cho tựa game này."}</p>
              </div>
            </div>

            {/* Features list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {['Bản quyền chính hãng', 'Kích hoat qua Steam', 'Hoàn tiền trong 7 ngày', 'Hỗ trợ 24/7'].map((feature) => (
                <div key={feature} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                  <span className="text-white">{feature}</span>
                </div>
              ))}
            </div>

            {/* Price & Actions Box */}
            <div className="mt-12 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/10 via-[#6366F1]/5 to-[#8B5CF6]/10 rounded-3xl blur-xl opacity-50" />

              <div className="relative bg-[#111118] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                <div className="space-y-2">
                  <p className="text-sm text-[#A1A1AA]">Giá bán chính thức</p>
                  <div className="text-4xl md:text-5xl font-bold">
                    <span className="text-gradient-luxury">{formatCurrency(game.price)}</span>
                  </div>
                  <p className="text-sm text-[#A1A1AA]">
                    <span className="text-[#22C55E]">✓</span> Bản quyền chính hãng
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-14 w-14 shrink-0 rounded-xl border-white/10 bg-[#111118] text-[#A1A1AA] hover:text-[#EF4444] hover:border-[#EF4444]/50 hover:bg-[#EF4444]/10 transition-all duration-300"
                  >
                    <Heart className="w-6 h-6" />
                  </Button>

                  <AddToCartButton gameId={game.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}