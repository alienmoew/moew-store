# Hướng dẫn thiết lập Supabase Storage cho Moew Store

Để hoàn tất Phase 4, cần tạo Storage bucket để lưu trữ hình ảnh game.

## Các bước thực hiện:

1. Đăng nhập vào [Supabase Dashboard](https://supabase.com/dashboard)
2. Chọn project Moew Store
3. Chuyển sang tab **Storage** (biểu tượng thư mục ở menu bên trái)
4. Nhấn nút **"New Bucket"**
5. Nhập Name: `game-images`
6. Bật switch **"Public bucket"** (để có thể xem ảnh public)
7. Config thêm: **"No size limits"** (hoặc tùy chọn theo nhu cầu)
8. Nhấn **Save**

## Security Rules cho Storage (Tùy chọn)

Vì đây là `Public bucket`, mọi người đều có thể đọc (view/download) ảnh.
Tuy nhiên, để bảo vệ bucket khỏi việc upload trái phép, hãy vào phần **Policies** của Storage và đảm bảo chỉ có Authenticated Users mới có thể Upload/Update/Delete.

Ví dụ Policy cho Upload:
- Action: `INSERT`
- Target roles: `authenticated`
