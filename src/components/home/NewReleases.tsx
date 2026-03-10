import { createClient } from "@/lib/supabase/server";
import { GameListSection } from "./GameListSection";

export default async function NewReleases() {
  const supabase = await createClient();
  
  // Game mới phát hành: order by created_at desc
  const { data: games } = await supabase
    .from("games")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <GameListSection
      title="Mới Phát Hành"
      description="Khám phá ngay những tựa game vừa ra mắt"
      viewAllLink="/games?sort=newest"
      games={games || []}
    />
  );
}
