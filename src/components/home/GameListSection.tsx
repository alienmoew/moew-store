import { GameCard } from "@/components/ui/game-card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface GameListSectionProps {
  title: string;
  description: string;
  viewAllLink: string;
  games: any[];
}

export function GameListSection({
  title,
  description,
  viewAllLink,
  games,
}: GameListSectionProps) {
  if (!games?.length) {
    return null;
  }

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <span className="h-8 w-2 rounded-full bg-[#8B5CF6] inline-block"></span>
              {title}
            </h2>
            <p className="text-[#A1A1AA] text-sm md:text-base">
              {description}
            </p>
          </div>
          
          <Link 
            href={viewAllLink} 
            className="hidden sm:flex items-center text-sm font-medium text-[#A1A1AA] hover:text-[#8B5CF6] transition-colors gap-1 group"
          >
            Xem tất cả 
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Horizontal scrollable container for mobile, grid for desktop */}
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 scrollbar-hide snap-x">
          {games.map((game) => (
            <div key={game.id} className="snap-start">
              <GameCard game={game} />
            </div>
          ))}
        </div>
        
        {/* Mobile View All Button */}
        <div className="mt-4 sm:hidden flex justify-center">
          <Link 
            href={viewAllLink} 
            className="flex items-center text-sm font-medium text-[#A1A1AA] hover:text-[#8B5CF6] transition-colors gap-1"
          >
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
