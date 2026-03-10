import { GameFilters } from "@/components/games/GameFilters";
import { GameList } from "@/components/games/GameList";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

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

  // Key để force re-render Suspense khi params thay đổi
  const key = `${search}-${category}-${sort}-${page}`;

  return (
    <div className="py-8 md:py-12 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Cửa Hàng Trò Chơi
          </h1>
          <p className="text-[#A1A1AA]">
            Khám phá hàng trăm tựa game đỉnh cao, đủ mọi thể loại để bạn lựa chọn.
          </p>
        </div>

        {/* Filters */}
        <Suspense fallback={<div className="h-24 animate-pulse bg-white/5 rounded-xl mb-8"></div>}>
          <GameFilters />
        </Suspense>

        {/* Game List with SSR & Loading */}
        <Suspense
          key={key}
          fallback={
            <div className="py-24 flex items-center justify-center text-[#8B5CF6]">
              <Loader2 className="h-8 w-8 animate-spin" />
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
