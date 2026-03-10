"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Search, Filter, SortDesc } from "lucide-react";
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

  // Local state for search to allow fast typing before debouncing
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Function update URL params
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all" && value !== "newest") {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      
      // Reset page to 1 when filters change
      if (name !== "page") {
        params.delete("page");
      }
      
      return params.toString();
    },
    [searchParams]
  );

  // Lắng nghe debounced search term để update URL
  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (debouncedSearchTerm !== currentSearch) {
      router.push(`${pathname}?${createQueryString("search", debouncedSearchTerm)}`);
    }
  }, [debouncedSearchTerm, pathname, router, createQueryString, searchParams]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A1A1AA]" />
        <Input
          type="text"
          placeholder="Tìm tên game..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-11 bg-[#111118] border-white/10 text-white placeholder:text-[#A1A1AA]/70 focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Category Filter */}
        <div className="flex-1 sm:w-48">
          <Select
            value={searchParams.get("category") || "all"}
            onValueChange={(value) => 
              router.push(`${pathname}?${createQueryString("category", value || "")}`)
            }
          >
            <SelectTrigger className="w-full h-11 bg-[#111118] border-white/10 text-white focus:ring-[#8B5CF6]/20">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-[#A1A1AA]" />
                <SelectValue placeholder="Danh mục" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#111118] border-white/10 text-white">
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id} className="focus:bg-white/10 focus:text-white cursor-pointer">
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Filter */}
        <div className="flex-1 sm:w-48">
          <Select
            value={searchParams.get("sort") || "newest"}
            onValueChange={(value) => 
              router.push(`${pathname}?${createQueryString("sort", value || "")}`)
            }
          >
            <SelectTrigger className="w-full h-11 bg-[#111118] border-white/10 text-white focus:ring-[#8B5CF6]/20">
              <div className="flex items-center gap-2">
                <SortDesc className="h-4 w-4 text-[#A1A1AA]" />
                <SelectValue placeholder="Sắp xếp" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#111118] border-white/10 text-white">
              {sortOptions.map((s) => (
                <SelectItem key={s.id} value={s.id} className="focus:bg-white/10 focus:text-white cursor-pointer">
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
