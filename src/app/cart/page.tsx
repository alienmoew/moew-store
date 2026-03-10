import { getCart } from "@/app/cart/actions";
import { CartItemsList } from "@/components/cart/CartItemsList";
import { ShoppingCart } from "lucide-react";

export const metadata = {
  title: "Giỏ hàng - Moew Store",
};

export default async function CartPage() {
  const result = await getCart();
  
  const cartItems = result.cartItems || [];

  return (
    <div className="min-h-screen bg-[#0B0B0F] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-[#8B5CF6]/10 rounded-xl">
            <ShoppingCart className="w-8 h-8 text-[#8B5CF6]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Giỏ hàng của bạn</h1>
            <p className="text-[#A1A1AA] mt-1">
              {cartItems.length} sản phẩm trong giỏ hàng
            </p>
          </div>
        </div>

        {/* Content */}
        <CartItemsList initialItems={cartItems} />
      </div>
    </div>
  );
}
