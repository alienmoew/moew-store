import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Zap, Star } from "lucide-react";

interface GameCardProps {
  game: {
    id: string;
    slug: string;
    name: string;
    price: number;
    image_url: string;
    category: string;
  };
  isNew?: boolean;
  isHot?: boolean;
  discount?: number;
}

export function GameCard({ game, isNew = false, isHot = false, discount }: GameCardProps) {
  const displayPrice = discount ? game.price * (1 - discount / 100) : game.price;

  return (
    <div className="group relative">
      {/* Glow effect behind card */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#8B5CF6]/0 via-[#8B5CF6]/20 to-[#6366F1]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

      {/* Main Card */}
      <div className="relative card-premium overflow-hidden">
        {/* Image Container */}
        <Link href={`/games/${game.slug}`} className="block relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={game.image_url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f"}
            alt={game.name}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <div className="flex flex-col gap-2">
              {isNew && (
                <Badge className="bg-[#22C55E]/90 hover:bg-[#22C55E] text-white border-none text-xs font-medium px-2.5 py-0.5">
                  <Zap className="w-3 h-3 mr-1" />
                  MỚI
                </Badge>
              )}
              {isHot && (
                <Badge className="bg-[#EF4444]/90 hover:bg-[#EF4444] text-white border-none text-xs font-medium px-2.5 py-0.5">
                  HOT
                </Badge>
              )}
            </div>
            {discount && (
              <Badge className="bg-[#F59E0B] hover:bg-[#F59E0B] text-black border-none text-xs font-bold px-2.5 py-0.5">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Category Badge */}
          <Badge className="absolute bottom-3 left-3 bg-[#0B0B0F]/70 backdrop-blur-sm hover:bg-[#8B5CF6] text-white border-none text-xs font-medium">
            {game.category}
          </Badge>

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#0B0B0F]/60 backdrop-blur-sm">
            <Button
              size="icon"
              className="h-12 w-12 rounded-xl bg-[#8B5CF6] hover:bg-[#A78BFA] text-white shadow-lg shadow-[#8B5CF6]/30 scale-90 group-hover:scale-100 transition-transform duration-300"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-12 w-12 rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-white scale-90 group-hover:scale-100 transition-transform duration-300"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </Link>

        {/* Content */}
        <div className="p-5 space-y-4">
          <Link href={`/games/${game.slug}`} className="block">
            <h3 className="font-bold text-lg text-white line-clamp-1 group-hover:text-gradient-luxury transition-all duration-300">
              {game.name}
            </h3>
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {discount ? (
                <>
                  <span className="text-sm text-[#A1A1AA] line-through">
                    {formatCurrency(game.price)}
                  </span>
                  <span className="text-xl font-bold text-gradient-luxury">
                    {formatCurrency(displayPrice)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-white">
                  {formatCurrency(game.price)}
                </span>
              )}
            </div>

            {/* Rating stars (mock) */}
            <div className="flex items-center gap-1 text-[#F59E0B]">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-xs text-white font-medium">4.8</span>
            </div>
          </div>

          {/* Progress bar (for pre-order games) */}
          {isNew && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#A1A1AA]">Pre-order</span>
                <span className="text-[#8B5CF6]">Sắp ra mắt</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] rounded-full" />
              </div>
            </div>
          )}
        </div>

        {/* Animated border on hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#8B5CF6]/30 transition-colors duration-300 pointer-events-none" />
      </div>
    </div>
  );
}