import { createClient } from "@/lib/supabase/server";
import { GameCard } from "@/components/ui/game-card";
import { Pagination } from "./Pagination";

interface GameListProps {
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
}

const ITEMS_PER_PAGE = 12;

export async function GameList({
  search,
  category,
  sort,
  page = 1,
}: GameListProps) {
  const supabase = await createClient();
  
  // Xây dựng query base
  let query = supabase.from("games").select("*", { count: "exact" });

  // 1. Search Filter
  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  // 2. Category Filter
  if (category && category !== "all") {
    // Map category ID to matching text in DB if needed, giả định lưu trực tiếp id hoặc text
    query = query.eq("category", category);
  }

  // 3. Sorting
  if (sort === "price-asc") {
    query = query.order("price", { ascending: true });
  } else if (sort === "price-desc") {
    query = query.order("price", { ascending: false });
  } else if (sort === "newest") {
    query = query.order("created_at", { ascending: false });
  } else {
    // Default sort: newest
    query = query.order("created_at", { ascending: false });
  }

  // 4. Pagination
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;
  query = query.range(from, to);

  const { data: games, count, error } = await query;

  if (error) {
    return (
      <div className="py-12 text-center text-[#EF4444]">
        Đã có lỗi xảy ra khi tải danh sách game.
      </div>
    );
  }

  if (!games || games.length === 0) {
    return (
      <div className="py-24 text-center">
        <h3 className="text-xl font-medium text-white mb-2">Không tìm thấy game nào!</h3>
        <p className="text-[#A1A1AA]">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
      </div>
    );
  }

  const totalPages = count ? Math.ceil(count / ITEMS_PER_PAGE) : 0;

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
}
