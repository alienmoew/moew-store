import Link from "next/link";
import { ArrowRight, Swords, Shield, Crosshair, Ghost, Map, Sparkles } from "lucide-react";

const categories = [
  {
    id: "action",
    title: "Hành động",
    icon: Swords,
    count: 124,
    gradient: "from-orange-500/30 to-red-500/10",
    hoverGradient: "from-orange-500/50 to-red-500/30",
    iconColor: "text-orange-400",
  },
  {
    id: "rpg",
    title: "Nhập vai RPG",
    icon: Shield,
    count: 85,
    gradient: "from-blue-500/30 to-indigo-500/10",
    hoverGradient: "from-blue-500/50 to-indigo-500/30",
    iconColor: "text-blue-400",
  },
  {
    id: "shooter",
    title: "Bắn súng",
    icon: Crosshair,
    count: 63,
    gradient: "from-emerald-500/30 to-teal-500/10",
    hoverGradient: "from-emerald-500/50 to-teal-500/30",
    iconColor: "text-emerald-400",
  },
  {
    id: "horror",
    title: "Kinh dị",
    icon: Ghost,
    count: 42,
    gradient: "from-purple-500/30 to-pink-500/10",
    hoverGradient: "from-purple-500/50 to-pink-500/30",
    iconColor: "text-purple-400",
  },
  {
    id: "adventure",
    title: "Phiêu lưu",
    icon: Map,
    count: 91,
    gradient: "from-yellow-500/30 to-amber-500/10",
    hoverGradient: "from-yellow-500/50 to-amber-500/30",
    iconColor: "text-yellow-400",
  },
];

export default function Categories() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111118]/50 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#6366F1]/5 rounded-full blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 md:mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
              <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
              <span className="text-xs text-[#A78BFA] font-medium uppercase tracking-wider">Khám phá</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Danh Mục <span className="text-gradient-luxury">Game</span>
            </h2>
            <p className="text-[#A1A1AA] text-base max-w-md">
              Tìm kiếm tựa game hoàn hảo theo thể loại yêu thích của bạn
            </p>
          </div>

          <Link
            href="/categories"
            className="hidden sm:flex items-center text-sm font-medium text-[#A1A1AA] hover:text-[#8B5CF6] transition-colors gap-2 group"
          >
            Tất cả danh mục
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={`/games?category=${category.id}`}
                className="group relative card-premium p-6 md:p-8 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#8B5CF6]/30 transition-colors duration-300" />

                <div className="relative z-10 space-y-5">
                  {/* Icon container */}
                  <div className="relative inline-flex">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#8B5CF6]/30 group-hover:bg-[#8B5CF6]/10 transition-all duration-300">
                      <Icon className={`h-6 w-6 md:h-7 md:w-7 ${category.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                  </div>

                  {/* Title & Count */}
                  <div>
                    <h3 className="font-semibold text-white text-lg group-hover:text-white transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-[#A1A1AA] mt-1.5 flex items-center justify-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/50" />
                      {category.count} trò chơi
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowRight className="h-4 w-4 text-[#8B5CF6]" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile View All */}
        <div className="mt-6 sm:hidden flex justify-center">
          <Link
            href="/categories"
            className="flex items-center text-sm font-medium text-[#A1A1AA] hover:text-[#8B5CF6] transition-colors gap-2"
          >
            Xem tất cả danh mục
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}