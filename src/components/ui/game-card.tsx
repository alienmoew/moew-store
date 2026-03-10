import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface GameCardProps {
  game: {
    id: string;
    slug: string;
    name: string;
    price: number;
    image_url: string;
    category: string;
  };
}

export function GameCard({ game }: GameCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-[#111118] border border-white/5 transition-all duration-300 hover:border-[#8B5CF6]/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] flex-shrink-0 w-[280px] sm:w-[320px]">
      <Link href={`/games/${game.slug}`} className="block relative aspect-[16/9] w-full overflow-hidden">
        {/* Fallback image handle in actual img tag or Next Image */}
        <img
          src={game.image_url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f"}
          alt={game.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent opacity-60" />
        <Badge className="absolute top-3 right-3 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white border-none font-medium">
          {game.category}
        </Badge>
      </Link>

      <div className="p-5 flex flex-col flex-1 gap-4">
        <Link href={`/games/${game.slug}`}>
          <h3 className="font-bold text-lg text-white line-clamp-1 group-hover:text-[#A78BFA] transition-colors">
            {game.name}
          </h3>
        </Link>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-white tracking-tight">
            {formatCurrency(game.price)}
          </span>
          
          <Button size="icon" className="h-9 w-9 rounded-full bg-white/5 hover:bg-[#8B5CF6] hover:text-white text-[#A1A1AA] transition-colors">
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Thêm vào giỏ</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
