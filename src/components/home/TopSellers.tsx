import { createClient } from "@/lib/supabase/server";
import { GameListSection } from "./GameListSection";

export default async function TopSellers() {
  const supabase = await createClient();
  
  // Top Sellers: Giả lập lấy theo giá cao nhất hoặc random (do chưa có tracking sale_count)
  const { data: games } = await supabase
    .from("games")
    .select("*")
    .order("price", { ascending: false })
    .limit(5);

  return (
    <GameListSection
      title="Bán Chạy Nhất"
      description="Những tựa game được yêu thích nhất tuần qua"
      viewAllLink="/games?sort=popular"
      games={games || []}
    />
  );
}
