import { getCart } from "@/app/cart/actions";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { redirect } from "next/navigation";
import { Lock, Sparkles } from "lucide-react";

export const metadata = {
  title: "Thanh toán an toàn - Moew Store",
};

export default async function CheckoutPage() {
  const { cartItems, error } = await getCart();

  if (error || !cartItems || cartItems.length === 0) {
    redirect("/cart");
  }

  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.games as any).price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-[#0B0B0F] py-12 md:py-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#6366F1]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="relative">
            <div className="absolute inset-0 bg-[#8B5CF6]/30 blur-xl rounded-xl" />
            <div className="relative p-4 bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] rounded-xl shadow-lg shadow-[#8B5CF6]/30">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-2">
              <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
              <span className="text-xs text-[#A78BFA] font-medium">Secure</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Thanh toán <span className="text-gradient-luxury">an toàn</span>
            </h1>
            <p className="text-[#A1A1AA] mt-1">
              Xác nhận đơn hàng của bạn một cách an toàn
            </p>
          </div>
        </div>

        {/* Form Thanh Toán */}
        <CheckoutForm items={cartItems} totalPrice={totalPrice} />
      </div>
    </div>
  );
}