import { GameCard } from "@/components/ui/game-card";
import { ArrowRight, Sparkles } from "lucide-react";
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
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background subtle effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111118]/30 via-transparent to-[#111118]/30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10 md:mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
              <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
              <span className="text-xs text-[#A78BFA] font-medium uppercase tracking-wider">Featured</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {title}
            </h2>
            <p className="text-[#A1A1AA] text-base max-w-md">
              {description}
            </p>
          </div>

          <Link
            href={viewAllLink}
            className="hidden sm:flex items-center text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors gap-2 group"
          >
            Xem tất cả
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {games.map((game, index) => (
            <div
              key={game.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <GameCard
                game={game}
                isNew={index === 0}
                isHot={index === 1}
                discount={index === 2 ? 20 : undefined}
              />
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 sm:hidden flex justify-center">
          <Link
            href={viewAllLink}
            className="flex items-center text-sm font-medium text-[#A1A1AA] hover:text-[#8B5CF6] transition-colors gap-2"
          >
            Xem tất cả
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}