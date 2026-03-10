import { createClient } from "@/lib/supabase/server";
import { GameListSection } from "./GameListSection";

export default async function FeaturedGames() {
  const supabase = await createClient();
  
  // Game nổi bật: Lấy random hoặc order theo ID (Mock)
  const { data: games } = await supabase
    .from("games")
    .select("*")
    .limit(5);

  return (
    <GameListSection
      title="Game Nổi Bật"
      description="Những tựa game đáng chú ý nhất hiện nay"
      viewAllLink="/games?filter=featured"
      games={games || []}
    />
  );
}
