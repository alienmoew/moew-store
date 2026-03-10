import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Calendar, ShieldCheck, Gamepad2, Heart } from "lucide-react";
import Image from "next/image";
import { AddToCartButton } from "@/components/games/AddToCartButton";

interface GameDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
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

  // Fallback image
  const imageUrl = game.image_url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f";

  return (
    <div className="min-h-screen bg-[#0B0B0F] pb-24">
      {/* Hero Banner Background */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        {/* Gradients for blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0F] via-[#0B0B0F]/60 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative -mt-32 z-10">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* Left Column: Cover Image (Desktop) */}
          <div className="hidden md:block w-1/3 max-w-[320px] shrink-0">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl bg-[#111118]">
              <img 
                src={imageUrl} 
                alt={game.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="flex-1 space-y-6 pt-4 md:pt-12">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-[#8B5CF6] hover:bg-[#A78BFA] text-white border-none text-sm px-3 py-1">
                {game.category}
              </Badge>
              <div className="flex items-center text-sm text-[#22C55E] bg-[#22C55E]/10 px-3 py-1 rounded-full border border-[#22C55E]/20">
                <ShieldCheck className="w-4 h-4 mr-1.5" />
                Có sẵn hàng
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {game.name}
            </h1>

            <div className="flex items-center gap-6 text-sm text-[#A1A1AA]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  Phát hành: {new Date(game.created_at).toLocaleDateString('vi-VN')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                <span>Nền tảng: PC / Steam</span>
              </div>
            </div>

            <div className="h-px w-full bg-white/10 my-8" />

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Về trò chơi này</h2>
              <div className="prose prose-invert prose-p:text-[#A1A1AA] prose-p:leading-relaxed max-w-none">
                <p>{game.description || "Chưa có mô tả cho tựa game này."}</p>
              </div>
            </div>

            {/* Price & Actions Box */}
            <div className="mt-12 bg-[#111118] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden group">
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/0 via-[#8B5CF6]/5 to-[#8B5CF6]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <p className="text-sm text-[#A1A1AA] mb-1">Giá bán chính thức</p>
                <div className="text-3xl md:text-4xl font-bold text-white">
                  {formatCurrency(game.price)}
                </div>
              </div>

              <div className="flex items-center gap-3 relative z-10 w-full sm:w-auto">
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="h-14 w-14 shrink-0 rounded-xl border-white/10 bg-[#111118] text-[#A1A1AA] hover:text-[#EF4444] hover:border-[#EF4444]/50 hover:bg-[#EF4444]/10 transition-colors"
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
  );
}
