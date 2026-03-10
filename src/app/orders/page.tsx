import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { formatCurrency } from "@/lib/format";
import { Package, Calendar, Key, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Lịch sử đơn hàng - Moew Store",
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get queries orders with items & game info
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
    <div className="min-h-screen bg-[#0B0B0F] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Banner Success if just purchased */}
        {searchParams?.success === "true" && (
          <div className="mb-8 p-4 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-2xl flex items-center gap-4">
            <div className="p-2 bg-[#22C55E]/20 rounded-full">
              <CheckCircle2 className="w-6 h-6 text-[#22C55E]" />
            </div>
            <div>
              <h3 className="text-white font-bold">Thanh toán thành công!</h3>
              <p className="text-[#A1A1AA] text-sm">Cảm ơn bạn đã mua hàng tại Moew Store. Mã key kích hoạt đã được cập nhật bên dưới.</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-white/5 rounded-xl">
            <Package className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Lịch sử đơn hàng</h1>
            <p className="text-[#A1A1AA] mt-1">
              Quản lý các trò chơi bạn đã mua và lấy mã kích hoạt
            </p>
          </div>
        </div>

        {/* Orders List */}
        {(!orders || orders.length === 0) ? (
          <div className="text-center py-20 bg-[#111118] border border-white/10 rounded-2xl">
            <Package className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Chưa có đơn hàng nào</h3>
            <p className="text-[#A1A1AA] mb-8">Bạn chưa thực hiện giao dịch nào. Khám phá kho game khổng lồ ngay!</p>
            <Link href="/games">
              <Button className="bg-[#8B5CF6] hover:bg-[#A78BFA] text-white">
                Đi tới Cửa hàng
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order.id}
                className="bg-[#111118] border border-white/10 rounded-2xl overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-white/5 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                    <div>
                      <span className="text-[#A1A1AA] block mb-0.5">Mã Đơn hàng</span>
                      <span className="text-white font-mono">{order.id.split('-')[0].toUpperCase()}</span>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] block mb-0.5">Ngày mua</span>
                      <span className="text-white flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(order.created_at).toLocaleDateString('vi-VN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] block mb-0.5">Trạng thái</span>
                      <span className={`font-medium flex items-center gap-1 ${
                        order.status === 'paid' ? 'text-[#22C55E]' : 
                        order.status === 'pending' ? 'text-[#EAB308]' : 'text-[#EF4444]'
                      }`}>
                        {order.status === 'paid' ? 'Đã Thanh toán' : 
                         order.status === 'pending' ? 'Chờ thanh toán' : 'Đã Hủy'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[#A1A1AA] text-sm block mb-0.5">Tổng tiền</span>
                    <span className="text-xl font-bold text-[#8B5CF6]">
                      {formatCurrency(order.total_price)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6 space-y-4">
                  {order.order_items.map((item: any) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 py-4 first:pt-0 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="w-full sm:w-40 aspect-[16/9] bg-[#0B0B0F] rounded-lg overflow-hidden shrink-0 border border-white/5">
                        <img 
                          src={item.games.image_url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f"} 
                          alt={item.games.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <h3 className="font-bold text-white text-lg">{item.games.name}</h3>
                        <div className="text-sm text-[#A1A1AA]">Phân loại: {item.games.category}</div>
                        <div className="text-sm font-medium text-white">{formatCurrency(item.price)}</div>
                      </div>

                      <div className="sm:text-right shrink-0 mt-2 sm:mt-0 flex flex-col justify-end">
                        <div className="p-3 bg-white/5 rounded-xl border border-[#8B5CF6]/30 flex items-center gap-3">
                          <Key className="w-4 h-4 text-[#8B5CF6]" />
                          <div className="font-mono text-white text-sm tracking-widest select-all">
                            {/* Mock CD KEY generator */}
                            {item.id.split('-')[0].toUpperCase()}-XXXX-XXXX
                          </div>
                        </div>
                        <span className="text-[10px] text-[#A1A1AA] mt-1.5 block text-center sm:text-right">Copy mã và nhập vào Steam</span>
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
