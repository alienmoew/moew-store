"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Tạo mảng hiển thị số trang
  const getVisiblePages = () => {
    const delta = 2; // Số trang hiển thị 2 bên trang hiện tại
    const range = [];
    
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1); // Luôn hiện trang 1
    if (totalPages > 1) {
      range.push(totalPages); // Luôn hiện trang cuối
    }

    return range;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {currentPage > 1 ? (
        <Link 
          href={createPageURL(currentPage - 1)}
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "h-10 w-10 border-white/10 bg-white/5 text-white hover:bg-white/10"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "h-10 w-10 border-white/10 bg-white/5 text-white opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, index) => {
          if (page === "...") {
            return (
              <span key={`dots-${index}`} className="px-2 text-[#A1A1AA]">
                ...
              </span>
            );
          }

          const isCurrent = currentPage === page;
          
          return (
            <Link
              key={page}
              href={createPageURL(page)}
              className={cn(
                buttonVariants({ variant: isCurrent ? "default" : "outline" }),
                "h-10 w-10",
                isCurrent 
                  ? "bg-[#8B5CF6] hover:bg-[#A78BFA] text-white border-0" 
                  : "border-white/10 bg-transparent text-[#A1A1AA] hover:bg-white/5 hover:text-white"
              )}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {currentPage < totalPages ? (
        <Link 
          href={createPageURL(currentPage + 1)}
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "h-10 w-10 border-white/10 bg-white/5 text-white hover:bg-white/10"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "h-10 w-10 border-white/10 bg-white/5 text-white opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </div>
  );
}
