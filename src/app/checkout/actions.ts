"use server";

import { createClient } from "@/lib/supabase/server";
import { getCart } from "@/app/cart/actions";
import { revalidatePath } from "next/cache";

export async function createOrder() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Vui lòng đăng nhập để thanh toán." };
  }

  // 1. Lấy giỏ hàng
  const { cartItems, cartId, error: cartError } = await getCart();

  if (cartError || !cartItems || cartItems.length === 0) {
    return { error: "Giỏ hàng trống hoặc không hợp lệ." };
  }

  // 2. Tính tổng tiền
  const totalAmount = cartItems.reduce((total, item) => {
    return total + (item.games as any).price * item.quantity;
  }, 0);

  // 3. Insert order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id: user.id,
        total_price: totalAmount,
        status: "paid", // Giả lập thanh toán auto-success không cần IPN
      },
    ])
    .select("id")
    .single();

  if (orderError || !order) {
    return { error: "Không thể tạo hóa đơn thanh toán ảo." };
  }

  // 4. Insert order_items
  const orderItemsData = cartItems.map((item) => ({
    order_id: order.id,
    game_id: item.game_id,
    price: (item.games as any).price,
    quantity: item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItemsData);

  if (itemsError) {
    return { error: "Không lưu được chi tiết đơn hàng." };
  }

  // 5. Clear cart_items thay vì toàn bộ cart 
  // (do MoMo xoá nên đoạn này ta phải bù lại khi MoMo bị remove)
  await supabase.from("cart_items").delete().eq("cart_id", cartId);

  // 6. Refetch Next state
  revalidatePath("/cart");
  revalidatePath("/orders");

  return { success: true, orderId: order.id };
}

