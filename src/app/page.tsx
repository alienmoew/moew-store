import HeroBanner from "@/components/home/HeroBanner";
import FeaturedGames from "@/components/home/FeaturedGames";
import NewReleases from "@/components/home/NewReleases";
import TopSellers from "@/components/home/TopSellers";
import Categories from "@/components/home/Categories";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner />
      
      <div className="space-y-4 pb-12">
        <FeaturedGames />
        <Categories />
        <NewReleases />
        <TopSellers />
      </div>
    </div>
  );
}
