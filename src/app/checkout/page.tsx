import { getCart } from "@/app/cart/actions";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { redirect } from "next/navigation";
import { Lock } from "lucide-react";

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
    <div className="min-h-screen bg-[#0B0B0F] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-white/5 rounded-xl">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Thanh toán an toàn</h1>
            <p className="text-[#A1A1AA] mt-1">
              Điền thông tin và xác nhận Hóa đơn của bạn
            </p>
          </div>
        </div>

        {/* Form Thanh Toán */}
        <CheckoutForm items={cartItems} totalPrice={totalPrice} />
      </div>
    </div>
  );
}
