"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/format";
import { removeFromCart } from "@/app/cart/actions";
import { Trash2, Loader2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function CartItemsList({
  initialItems
}: {
  initialItems: any[]
}) {
  const [items, setItems] = useState(initialItems);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handleRemove = async (itemId: string) => {
    setLoadingId(itemId);
    const { error } = await removeFromCart(itemId);

    if (error) {
      alert(error);
      setLoadingId(null);
      return;
    }

    setItems((prev) => prev.filter((item) => item.id !== itemId));
    setLoadingId(null);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#111118]/50 to-transparent rounded-3xl" />
        <div className="relative space-y-6">
          <div className="relative inline-flex">
            <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-2xl rounded-full" />
            <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
              <ShoppingBag className="w-10 h-10 text-zinc-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white">Giỏ hàng trống</h3>
          <p className="text-[#A1A1AA] max-w-md mx-auto">Bạn chưa thêm trò chơi nào vào giỏ hàng. Hãy khám phá kho game của chúng tôi ngay!</p>
          <Button
            onClick={() => router.push("/games")}
            className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#A78BFA] hover:to-[#8B5CF6] text-white px-8"
          >
            Khám phá game
          </Button>
        </div>
      </div>
    );
  }

  const totalPrice = items.reduce((total, item) => {
    return total + (item.games.price * item.quantity);
  }, 0);

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* Items List */}
      <div className="flex-1 space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="group relative card-premium p-4 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Thumbnail */}
              <div className="relative w-full sm:w-36 lg:w-40 shrink-0 overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F]/50 to-transparent z-10" />
                <img
                  src={item.games.image_url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f"}
                  alt={item.games.name}
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Title & Info */}
              <div className="flex-1 space-y-2 w-full">
                <h3 className="font-bold text-white text-lg lg:text-xl leading-tight group-hover:text-gradient-luxury transition-all duration-300">
                  {item.games.name}
                </h3>
                <p className="text-sm text-[#A1A1AA] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                  PC (Digital Download)
                </p>
              </div>

              {/* Price & Actions */}
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0">
                <div className="text-xl lg:text-2xl font-bold text-white">
                  {formatCurrency(item.games.price)}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(item.id)}
                  disabled={loadingId === item.id}
                  className="text-[#A1A1AA] hover:text-[#EF4444] hover:bg-[#EF4444]/10 -ml-2 sm:ml-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  {loadingId === item.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Box */}
      <div className="w-full xl:w-96 shrink-0">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/10 via-transparent to-[#6366F1]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative bg-[#111118] border border-white/10 rounded-2xl p-6 lg:p-8 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
              Tóm tắt đơn hàng
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-[#A1A1AA]">
                <span>Tạm tính ({items.length} sp)</span>
                <span className="text-white">{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-[#A1A1AA]">
                <span>Giảm giá</span>
                <span className="text-[#22C55E]">0 đ</span>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full my-4" />

              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-lg">Tổng cộng</span>
                <span className="text-3xl font-bold text-gradient-luxury">{formatCurrency(totalPrice)}</span>
              </div>
            </div>

            <Button
              className="w-full h-14 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#A78BFA] hover:to-[#8B5CF6] text-white font-bold text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#8B5CF6]/30 flex items-center justify-center gap-2"
              onClick={() => router.push("/checkout")}
            >
              Thanh toán an toàn
              <ArrowRight className="w-5 h-5" />
            </Button>

            <p className="text-xs text-[#A1A1AA] text-center mt-4 leading-relaxed flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              Mã keys kích hoạt sẽ được gửi ngay lập tức vào email của bạn sau khi thanh toán.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}