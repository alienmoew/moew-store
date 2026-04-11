"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Search, Filter, SortDesc, Sparkles, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce";

const categories = [
  { id: "all", label: "Tất cả danh mục" },
  { id: "Action RPG", label: "Nhập vai hành động (Action RPG)" },
  { id: "RPG", label: "Nhập vai cổ điển (RPG)" },
  { id: "Action", label: "Hành động (Action)" },
  { id: "Horror", label: "Kinh dị (Horror)" },
  { id: "JRPG", label: "Nhập vai Nhật Bản (JRPG)" },
];

const sortOptions = [
  { id: "newest", label: "Mới nhất" },
  { id: "popular", label: "Bán chạy nhất" },
  { id: "price-asc", label: "Giá: Thấp đến Cao" },
  { id: "price-desc", label: "Giá: Cao đến Thấp" },
];

export function GameFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all" && value !== "newest") {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      if (name !== "page") {
        params.delete("page");
      }

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (debouncedSearchTerm !== currentSearch) {
      router.push(`${pathname}?${createQueryString("search", debouncedSearchTerm)}`);
    }
  }, [debouncedSearchTerm, pathname, router, createQueryString, searchParams]);

  const clearSearch = () => {
    setSearchTerm("");
    router.push(`${pathname}?${createQueryString("search", "")}`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-10">
      {/* Search Input with premium styling */}
      <div className="relative flex-1 group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/20 to-[#6366F1]/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-xl" />
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-4 w-4 text-zinc-500 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-[#8B5CF6]" />
          <Input
            type="text"
            placeholder="Tìm tên game..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11 pr-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 rounded-xl transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20 shadow-sm"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 p-1 rounded-full hover:bg-white/10 text-zinc-500 hover:text-white transition-all"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Category Filter */}
        <div className="flex-1 sm:w-52">
          <Select
            value={searchParams.get("category") || "all"}
            onValueChange={(value) =>
              router.push(`${pathname}?${createQueryString("category", value || "")}`)
            }
          >
            <SelectTrigger className="w-full h-12 bg-white/5 border-white/10 text-white focus:ring-[#8B5CF6]/20 rounded-xl transition-all duration-300">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-[#8B5CF6]" />
                <SelectValue placeholder="Danh mục" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#111118] border-white/10 text-white glass-premium">
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id} className="focus:bg-[#8B5CF6]/10 focus:text-white cursor-pointer rounded-lg">
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Filter */}
        <div className="flex-1 sm:w-52">
          <Select
            value={searchParams.get("sort") || "newest"}
            onValueChange={(value) =>
              router.push(`${pathname}?${createQueryString("sort", value || "")}`)
            }
          >
            <SelectTrigger className="w-full h-12 bg-white/5 border-white/10 text-white focus:ring-[#8B5CF6]/20 rounded-xl transition-all duration-300">
              <div className="flex items-center gap-2">
                <SortDesc className="h-4 w-4 text-[#8B5CF6]" />
                <SelectValue placeholder="Sắp xếp" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#111118] border-white/10 text-white glass-premium">
              {sortOptions.map((s) => (
                <SelectItem key={s.id} value={s.id} className="focus:bg-[#8B5CF6]/10 focus:text-white cursor-pointer rounded-lg">
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}