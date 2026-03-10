# Moew Store - Technical Specification

## 1. Overview
Moew Store là một website bán game digital với giao diện hiện đại, hỗ trợ dark mode.

Website cho phép người dùng:
- Đăng ký tài khoản
- Đăng nhập bằng email hoặc Google
- Xem danh sách game
- Thêm game vào giỏ hàng
- Đặt mua game
- Xem lịch sử đơn hàng

---

## 2. Branding

**Tên sản phẩm:** Moew Store  
**Concept:** Modern Gaming Store

### Theme
- Dark Mode
- Minimal
- Gaming style
- Smooth animations

### Color Palette

| Usage | Color |
|------|------|
| Primary Background | #0B0B0F |
| Secondary Background | #111118 |
| Highlight Purple | #8B5CF6 |
| Hover Purple | #A78BFA |
| Text Primary | #FFFFFF |
| Text Secondary | #A1A1AA |
| Danger | #EF4444 |
| Success | #22C55E |

---

## 3. Tech Stack

### Frontend
- NextJS 14
- React
- TailwindCSS
- Shadcn UI

### Backend
- Supabase

### Database
- PostgreSQL

### Authentication
- Email / Password
- Google OAuth

### Hosting
- Vercel

### Storage
- Supabase Storage

---

## 4. System Architecture

User Browser  
↓  
NextJS (Vercel)  
↓  
Supabase SDK  
↓  
Supabase Services

Services:
- Auth
- PostgreSQL Database
- Storage

---

## 5. UI Layout

### Navbar
Components:
- Logo Moew Store
- Search bar
- Navigation menu
- Cart icon
- User profile

Menu:
- Home
- Games
- Categories
- Cart

---

### Home Page

Sections:
- Hero Banner
- Featured Games
- New Releases
- Top Sellers
- Categories

---

### Game List Page

Route:
/games

Features:
- Pagination
- Search
- Filter by category
- Sort by price
- Sort by popularity

---

### Game Detail Page

Route:
/games/[slug]

Content:
- Game cover
- Screenshots
- Description
- Price
- Add to cart button

---

### Cart Page

Route:
/cart

Features:
- View cart items
- Change quantity
- Remove item

---

### Checkout Page

Route:
/checkout

Content:
- Order summary
- Total price
- Confirm order button

---

### Login Page

Route:
/login

Methods:
- Email / Password
- Google Login

---

### Register Page

Route:
/register

Fields:
- Email
- Password
- Confirm password

---

## 6. Database Schema

### profiles

| Field | Type | Notes |
|------|------|------|
| id | uuid | PK |
| email | text | |
| name | text | |
| avatar_url | text | |
| created_at | timestamp | |

---

### games

| Field | Type | Notes |
|------|------|------|
| id | uuid | PK |
| name | text | |
| slug | text | unique |
| description | text | |
| price | numeric | |
| image_url | text | |
| category | text | |
| created_at | timestamp | |

---

### carts

| Field | Type | Notes |
|------|------|------|
| id | uuid | PK |
| user_id | uuid | FK profiles |
| created_at | timestamp | |

---

### cart_items

| Field | Type | Notes |
|------|------|------|
| id | uuid | PK |
| cart_id | uuid | FK carts |
| game_id | uuid | FK games |
| quantity | int | |

---

### orders

| Field | Type | Notes |
|------|------|------|
| id | uuid | PK |
| user_id | uuid | FK profiles |
| total_price | numeric | |
| status | text | pending / paid |
| created_at | timestamp | |

---

### order_items

| Field | Type | Notes |
|------|------|------|
| id | uuid | PK |
| order_id | uuid | FK orders |
| game_id | uuid | FK games |
| price | numeric | |

---

## 7. Storage

Bucket:
game-images

Used for:
- Game cover images
- Game screenshots

---

## 8. Security

Using Supabase Row Level Security (RLS)

Rules:
- User chỉ xem cart của mình
- User chỉ sửa cart của mình
- User chỉ xem order của mình

---

## 9. Environment Variables

NEXT_PUBLIC_SUPABASE_URL  
NEXT_PUBLIC_SUPABASE_ANON_KEY

---

## 10. Deployment

Frontend deployment:
Vercel

CI/CD Flow:
GitHub → Vercel Auto Deploy

---

## 11. Future Features

- Wishlist
- Game Reviews
- Discount Codes
- Admin Dashboard
- Payment Gateway Integration