import Link from "next/link";
import { ArrowRight, Swords, Shield, Crosshair, Ghost, Map } from "lucide-react";

const categories = [
  {
    id: "action",
    title: "Hành động",
    icon: Swords,
    count: 124,
    color: "from-orange-500/20 to-red-500/20",
    hoverColor: "group-hover:text-orange-400",
  },
  {
    id: "rpg",
    title: "Nhập vai RPG",
    icon: Shield,
    count: 85,
    color: "from-blue-500/20 to-indigo-500/20",
    hoverColor: "group-hover:text-blue-400",
  },
  {
    id: "shooter",
    title: "Bắn súng",
    icon: Crosshair,
    count: 63,
    color: "from-emerald-500/20 to-teal-500/20",
    hoverColor: "group-hover:text-emerald-400",
  },
  {
    id: "horror",
    title: "Kinh dị",
    icon: Ghost,
    count: 42,
    color: "from-purple-500/20 to-pink-500/20",
    hoverColor: "group-hover:text-purple-400",
  },
  {
    id: "adventure",
    title: "Phiêu lưu",
    icon: Map,
    count: 91,
    color: "from-yellow-500/20 to-amber-500/20",
    hoverColor: "group-hover:text-yellow-400",
  },
];

export default function Categories() {
  return (
    <section className="py-12 md:py-16 bg-[#111118]/50 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <span className="h-8 w-2 rounded-full bg-[#8B5CF6] inline-block"></span>
              Khám Phá Danh Mục
            </h2>
            <p className="text-[#A1A1AA] text-sm md:text-base">
              Tìm kiếm tựa game theo thể loại yêu thích của bạn
            </p>
          </div>
          
          <Link 
            href="/categories" 
            className="hidden sm:flex items-center text-sm font-medium text-[#A1A1AA] hover:text-[#8B5CF6] transition-colors gap-1 group"
          >
            Tất cả danh mục 
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={`/games?category=${category.id}`}
                className="group relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#0B0B0F] border border-white/5 hover:border-[#8B5CF6]/50 transition-all duration-300 overflow-hidden text-center hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] hover:-translate-y-1"
              >
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative z-10 space-y-4">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-[#A1A1AA] group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                    <Icon className={`h-6 w-6 ${category.hoverColor} transition-colors`} />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-white transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-xs text-[#A1A1AA] mt-1 line-clamp-1">
                      {category.count} trò chơi
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
