"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { addToCart } from "@/app/cart/actions";
import { useRouter } from "next/navigation";

export function AddToCartButton({ gameId }: { gameId: string }) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const router = useRouter();

  async function handleAdd() {
    setLoading(true);
    
    // Server Action
    const result = await addToCart(gameId);

    if (result.error) {
      if (result.error.includes("đăng nhập")) {
        // Redirect to login if user is not authenticated
        router.push("/login");
      } else {
        alert(result.error); // Fallback error toast (To-do: dùng Shadcn Toast sau)
      }
      setLoading(false);
      return;
    }

    if (result.success) {
      setAdded(true);
      setLoading(false);
      // Có thể dùng setTimeout để reset nút lại sau vài giây
      setTimeout(() => setAdded(false), 3000);
    }
  }

  return (
    <Button 
      onClick={handleAdd}
      disabled={loading || added}
      className={`h-14 flex-1 sm:w-64 rounded-xl text-white font-bold text-lg transition-all shadow-[0_0_20px_rgba(139,92,246,0.2)] ${
        added 
          ? "bg-[#22C55E] hover:bg-[#22C55E] opacity-100" 
          : "bg-[#8B5CF6] hover:bg-[#A78BFA] hover:scale-[1.02] active:scale-[0.98]"
      }`}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
      ) : added ? (
        <Check className="w-5 h-5 mr-2" />
      ) : (
        <ShoppingCart className="w-5 h-5 mr-2" />
      )}
      
      {loading 
        ? "Đang thêm..." 
        : added 
        ? "Đã có trong giỏ" 
        : "Thêm vào giỏ"}
    </Button>
  );
}
