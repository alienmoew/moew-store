import { GameFilters } from "@/components/games/GameFilters";
import { GameList } from "@/components/games/GameList";
import { Suspense } from "react";
import { Loader2, Sparkles } from "lucide-react";

export const metadata = {
  title: "Cửa hàng Game - Moew Store",
  description: "Khám phá danh sách game với giá tốt nhất tại Moew Store.",
};

interface GamesPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function GamesPage({ searchParams }: GamesPageProps) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search;
  const category = resolvedSearchParams.category;
  const sort = resolvedSearchParams.sort;
  const page = Number(resolvedSearchParams.page) || 1;

  const key = `${search}-${category}-${sort}-${page}`;

  return (
    <div className="py-12 md:py-16 min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#6366F1]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
            <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
            <span className="text-xs text-[#A78BFA] font-medium uppercase tracking-wider">Store</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Cửa Hàng <span className="text-gradient-luxury">Game</span>
          </h1>
          <p className="text-[#A1A1AA] text-lg max-w-2xl leading-relaxed">
            Khám phá hàng trăm tựa game đỉnh cao từ mọi thể loại. Tìm kiếm trò chơi hoàn hảo cho bạn với bản quyền chính hãng và giá tốt nhất.
          </p>
        </div>

        {/* Filters */}
        <Suspense fallback={<div className="h-24 animate-pulse bg-white/5 rounded-xl mb-8"></div>}>
          <GameFilters />
        </Suspense>

        {/* Game List */}
        <Suspense
          key={key}
          fallback={
            <div className="py-24 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 text-[#8B5CF6] animate-spin" />
                <p className="text-[#A1A1AA]">Đang tải game...</p>
              </div>
            </div>
          }
        >
          <GameList
            search={search}
            category={category}
            sort={sort}
            page={page}
          />
        </Suspense>
      </div>
    </div>
  );
}