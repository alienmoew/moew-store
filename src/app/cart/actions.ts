"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getCart() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Bạn chưa đăng nhập" };
  }

  // Lấy giỏ hàng của user
  let { data: cart } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", user.id)
    .single();

  // Đề phòng trigger db tạo cart bị lỗi, fallback tự tạo (upsert)
  if (!cart) {
    const { data: newCart, error: errCart } = await supabase
      .from("carts")
      .insert([{ user_id: user.id }])
      .select("id")
      .single();
    
    if (errCart || !newCart) return { error: "Không thể lấy giỏ hàng" };
    cart = newCart;
  }

  // Lấy danh sách item trong giỏ
  const { data: cartItems, error } = await supabase
    .from("cart_items")
    .select(`
      id,
      quantity,
      game_id,
      games (
        id,
        name,
        slug,
        price,
        image_url,
        category
      )
    `)
    .eq("cart_id", cart.id)
    .order("id", { ascending: false });

  if (error) {
    return { error: error.message };
  }

  return { cartItems: cartItems || [], cartId: cart.id };
}

export async function addToCart(gameId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Vui lòng đăng nhập để thêm vào giỏ hàng" };
  }

  let { data: cart } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", user.id)
    .single();

  // Đảm bảo cart tồn tại (có thể trigger PostgreSQL bị bỏ qua)
  if (!cart) {
    const { data: newCart, error: errCart } = await supabase
      .from("carts")
      .insert([{ user_id: user.id }])
      .select("id")
      .single();
    
    if (errCart || !newCart) return { error: "Không thể khởi tạo giỏ hàng" };
    cart = newCart;
  }

  // Kiểm tra game đã có trong giỏ chưa
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("id")
    .eq("cart_id", cart.id)
    .eq("game_id", gameId)
    .single();

  if (existingItem) {
    // Game digital chỉ mua 1 bản/tài khoản. Trả lỗi nếu đã thêm.
    return { error: "Sản phẩm này đã có trong giỏ hàng của bạn!" };
  }

  // Insert
  const { error } = await supabase.from("cart_items").insert([
    {
      cart_id: cart.id,
      game_id: gameId,
      quantity: 1, // Digital game mặc định 1
    },
  ]);

  if (error) {
    return { error: "Lỗi hệ thống khi thêm vào giỏ hàng." };
  }

  revalidatePath("/cart");
  return { success: "Đã thêm game vào giỏ hàng thành công!" };
}

export async function removeFromCart(itemId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", itemId);

  if (error) {
    return { error: "Không thể xoá sản phẩm khỏi giỏ hàng" };
  }

  revalidatePath("/cart");
  return { success: true };
}

export async function clearCart(cartId: string) {
  const supabase = await createClient();

  // RLS sẽ chỉ cho phép xoá item của giỏ hàng thuộc user hiện tại
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cartId);

  if (error) {
    return { error: "Không thể làm sạch giỏ hàng" };
  }

  revalidatePath("/cart");
  return { success: true };
}
