"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2, ShieldCheck, Gamepad2 } from "lucide-react";
import { createOrder } from "@/app/checkout/actions";

interface CheckoutFormProps {
  items: any[];
  totalPrice: number;
}

export function CheckoutForm({ items, totalPrice }: CheckoutFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    const result = await createOrder();

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    if (result.success) {
      // Giả lập delay xử lý payment gateway để UI cảm giác chân thật
      setTimeout(() => {
        router.push("/orders?success=true");
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Tóm tắt sản phẩm */}
      <div className="flex-1 space-y-4">
        <h2 className="text-xl font-bold text-white mb-6">Thông tin đơn hàng</h2>
        <div className="bg-[#111118] border border-white/10 rounded-2xl p-6 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4 py-2 border-b border-white/5 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#0B0B0F] rounded overflow-hidden shrink-0">
                  <img 
                    src={item.games.image_url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f"} 
                    alt="" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm line-clamp-1">{item.games.name}</h4>
                  <p className="text-xs text-[#A1A1AA]">Số lượng: {item.quantity}</p>
                </div>
              </div>
              <div className="text-right text-sm font-bold text-white">
                {formatCurrency(item.games.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-4 flex items-center gap-2 text-sm text-[#22C55E]">
          <ShieldCheck className="w-5 h-5" />
          <span>Giao dịch của bạn được mã hóa an toàn 256-bit</span>
        </div>
      </div>

      {/* Box Thanh Toán */}
      <div className="w-full lg:w-96 shrink-0">
        <div className="bg-[#111118] border border-white/10 rounded-2xl p-6 sticky top-24">
          <h2 className="text-xl font-bold text-white mb-6">Thanh toán</h2>
          
          {error && (
            <div className="mb-6 p-3 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg text-sm text-[#EF4444]">
              {error}
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-[#A1A1AA]">
              <span>Giá trị sản phẩm</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            
            <div className="h-px bg-white/10 w-full my-4" />
            
            <div className="flex justify-between items-center">
              <span className="font-bold text-white">Tổng thanh toán</span>
              <span className="text-3xl font-bold text-[#8B5CF6]">{formatCurrency(totalPrice)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex flex-col items-center justify-center gap-2 p-3 bg-white/5 border border-[#8B5CF6] rounded-xl cursor-pointer">
              <CreditCard className="w-6 h-6 text-[#8B5CF6]" />
              <span className="text-xs font-medium text-white">Visa / Master</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl cursor-pointer transition-colors">
              <Gamepad2 className="w-6 h-6 text-[#A1A1AA]" />
              <span className="text-xs font-medium text-[#A1A1AA]">Moew Pay</span>
            </div>
          </div>

          <Button 
            className="w-full h-14 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(139,92,246,0.2)]"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Đang xử lý kết nối...
              </div>
            ) : (
              "Xác nhận đặt hàng"
            )}
          </Button>

          <p className="text-xs text-[#A1A1AA] text-center mt-6 uppercase tracking-wider font-semibold">
            By Moew Entertainment
          </p>
        </div>
      </div>
    </div>
  );
}
