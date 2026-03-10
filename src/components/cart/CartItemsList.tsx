"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/format";
import { removeFromCart } from "@/app/cart/actions";
import { Trash2, Loader2 } from "lucide-react";
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

    // Update local state after successful server mutation
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    setLoadingId(null);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-[#111118] border border-white/10 rounded-2xl">
        <h3 className="text-2xl font-bold text-white mb-4">Giỏ hàng trống</h3>
        <p className="text-[#A1A1AA] mb-8">Bạn chưa thêm trò chơi nào vào giỏ hàng.</p>
        <Button onClick={() => router.push("/games")} className="bg-[#8B5CF6] hover:bg-[#A78BFA] text-white">
          Tiếp tục mua sắm
        </Button>
      </div>
    );
  }

  const totalPrice = items.reduce((total, item) => {
    return total + (item.games.price * item.quantity);
  }, 0);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Items List */}
      <div className="flex-1 space-y-4">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#111118] border border-white/10 rounded-xl p-4 transition-colors hover:border-white/20"
          >
            {/* Thumbnail */}
            <div className="w-full sm:w-32 aspect-[16/9] bg-[#0B0B0F] rounded-lg overflow-hidden shrink-0">
              <img 
                src={item.games.image_url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f"} 
                alt={item.games.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title & Info */}
            <div className="flex-1 space-y-1 w-full">
              <h3 className="font-bold text-white text-lg leading-tight line-clamp-2">
                {item.games.name}
              </h3>
              <p className="text-sm text-[#A1A1AA]">
                Hệ máy: PC (Digital Download)
              </p>
            </div>

            {/* Price & Actions */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-4 sm:mt-0 gap-2 shrink-0">
              <div className="font-bold text-white text-lg">
                {formatCurrency(item.games.price)}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemove(item.id)}
                disabled={loadingId === item.id}
                className="text-[#A1A1AA] hover:text-[#EF4444] hover:bg-[#EF4444]/10 -ml-3 sm:ml-0"
              >
                {loadingId === item.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xoá
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Box */}
      <div className="w-full lg:w-80 shrink-0">
        <div className="bg-[#111118] border border-white/10 rounded-2xl p-6 sticky top-24">
          <h2 className="text-xl font-bold text-white mb-6">Tóm tắt đơn hàng</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-[#A1A1AA]">
              <span>Tạm tính ({items.length} sp)</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-[#A1A1AA]">
              <span>Giảm giá</span>
              <span>0 đ</span>
            </div>
            
            <div className="h-px bg-white/10 w-full my-4" />
            
            <div className="flex justify-between items-center">
              <span className="font-bold text-white">Tổng cộng</span>
              <span className="text-2xl font-bold text-[#8B5CF6]">{formatCurrency(totalPrice)}</span>
            </div>
          </div>

          <Button 
            className="w-full h-12 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white font-bold transition-all hover:scale-[1.02]"
            onClick={() => router.push("/checkout")}
          >
            Thanh toán an toàn
          </Button>

          <p className="text-xs text-[#A1A1AA] text-center mt-4 leading-relaxed">
            Mã keys kích hoạt sẽ được gửi ngay lập tức vào email của bạn sau khi thanh toán.
          </p>
        </div>
      </div>
    </div>
  );
}
