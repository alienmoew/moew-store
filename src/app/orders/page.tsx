import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { formatCurrency } from "@/lib/format";
import { Package, Calendar, Key, CheckCircle2, Sparkles, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Lịch sử đơn hàng - Moew Store",
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      id,
      total_price,
      status,
      created_at,
      order_items (
        id,
        price,
        quantity,
        games (
          id,
          name,
          image_url,
          category
        )
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Lỗi lấy đơn hàng:", error.message);
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] py-12 md:py-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#6366F1]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Banner Success if just purchased */}
        {resolvedSearchParams?.success === "true" && (
          <div className="mb-10 p-4 md:p-6 bg-gradient-to-r from-[#22C55E]/20 to-[#16A34A]/10 border border-[#22C55E]/30 rounded-2xl flex items-center gap-4 animate-fade-in-up">
            <div className="relative">
              <div className="absolute inset-0 bg-[#22C55E]/30 blur-xl rounded-full" />
              <div className="relative p-3 bg-[#22C55E]/20 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-[#22C55E]" />
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                Thanh toán thành công!
              </h3>
              <p className="text-[#A1A1AA] text-sm mt-1">Cảm ơn bạn đã mua hàng tại Moew Store. Mã key kích hoạt đã được cập nhật bên dưới.</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="relative">
            <div className="absolute inset-0 bg-[#8B5CF6]/30 blur-xl rounded-xl" />
            <div className="relative p-4 bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] rounded-xl shadow-lg shadow-[#8B5CF6]/30">
              <Package className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-2">
              <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
              <span className="text-xs text-[#A78BFA] font-medium uppercase tracking-wider">Orders</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Lịch sử <span className="text-gradient-luxury">đơn hàng</span>
            </h1>
            <p className="text-[#A1A1AA] mt-1">
              Quản lý các trò chơi bạn đã mua và lấy mã kích hoạt
            </p>
          </div>
        </div>

        {/* Orders List */}
        {(!orders || orders.length === 0) ? (
          <div className="text-center py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#111118]/50 to-transparent rounded-3xl" />
            <div className="relative space-y-6">
              <div className="relative inline-flex">
                <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-2xl rounded-full" />
                <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
                  <Package className="w-10 h-10 text-zinc-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">Chưa có đơn hàng nào</h3>
              <p className="text-[#A1A1AA] max-w-md mx-auto">Bạn chưa thực hiện giao dịch nào. Khám phá kho game khổng lồ ngay!</p>
              <Link href="/games">
                <Button className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#A78BFA] hover:to-[#8B5CF6] text-white px-8">
                  Đi tới Cửa hàng
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className="group relative card-premium overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Order Header */}
                <div className="relative bg-gradient-to-r from-white/5 to-transparent px-6 py-5 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <div className="space-y-1">
                      <span className="text-[#A1A1AA] text-xs block uppercase tracking-wider">Mã Đơn hàng</span>
                      <span className="text-white font-mono font-bold text-lg">{order.id.split('-')[0].toUpperCase()}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[#A1A1AA] text-xs block uppercase tracking-wider">Ngày mua</span>
                      <span className="text-white flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#8B5CF6]" />
                        {new Date(order.created_at).toLocaleDateString('vi-VN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[#A1A1AA] text-xs block uppercase tracking-wider">Trạng thái</span>
                      <span className={`font-medium flex items-center gap-2 ${
                        order.status === 'paid' ? 'text-[#22C55E]' :
                        order.status === 'pending' ? 'text-[#EAB308]' : 'text-[#EF4444]'
                      }`}>
                        {order.status === 'paid' && <><CheckCircle2 className="w-4 h-4" /> Đã Thanh toán</>}
                        {order.status === 'pending' && <><Clock className="w-4 h-4" /> Chờ thanh toán</>}
                        {order.status === 'cancelled' && <><XCircle className="w-4 h-4" /> Đã Hủy</>}
                      </span>
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <span className="text-[#A1A1AA] text-xs block uppercase tracking-wider mb-1">Tổng tiền</span>
                    <span className="text-2xl md:text-3xl font-bold text-gradient-luxury">
                      {formatCurrency(order.total_price)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6 space-y-4">
                  {order.order_items.map((item: any) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-5 py-4 first:pt-0 border-b border-white/5 last:border-0 last:pb-0">
                      {/* Game Image */}
                      <div className="w-full sm:w-44 aspect-video bg-[#0B0B0F] rounded-xl overflow-hidden shrink-0 border border-white/5">
                        <img
                          src={item.games.image_url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f"}
                          alt={item.games.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Game Info */}
                      <div className="flex-1 space-y-3">
                        <h3 className="font-bold text-white text-lg lg:text-xl group-hover:text-gradient-luxury transition-all duration-300">
                          {item.games.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <span className="text-[#A1A1AA] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                            {item.games.category}
                          </span>
                          <span className="text-white font-medium">{formatCurrency(item.price)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                          <span className="w-1 h-1 rounded-full bg-[#22C55E]" />
                          Số lượng: {item.quantity}
                        </div>
                      </div>

                      {/* CD Key */}
                      <div className="sm:text-right shrink-0 mt-2 sm:mt-0 flex flex-col justify-end">
                        <div className="relative group/key">
                          <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-lg rounded-xl opacity-0 group-hover/key:opacity-100 transition-opacity duration-300" />
                          <div className="relative p-3 bg-white/5 rounded-xl border border-[#8B5CF6]/30 flex items-center gap-3">
                            <Key className="w-5 h-5 text-gradient-luxury" />
                            <div className="font-mono text-white text-sm tracking-widest select-all">
                              {item.id.split('-')[0].toUpperCase()}-XXXX-XXXX
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] text-[#A1A1AA] mt-2 block text-center sm:text-right flex items-center justify-end gap-1">
                          <span className="w-1 h-1 rounded-full bg-[#22C55E] animate-pulse" />
                          Copy mã và nhập vào Steam
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}