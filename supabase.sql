-- 1. Create tables

-- profiles table
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- games table
create table games (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  description text,
  price numeric not null default 0,
  image_url text,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- carts table
create table carts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- cart_items table
create table cart_items (
  id uuid default gen_random_uuid() primary key,
  cart_id uuid references carts(id) on delete cascade not null,
  game_id uuid references games(id) on delete cascade not null,
  quantity int not null default 1,
  unique(cart_id, game_id)
);

-- orders table
create table orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  total_price numeric not null,
  status text not null check (status in ('pending', 'paid', 'cancelled')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- order_items table
create table order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders(id) on delete cascade not null,
  game_id uuid references games(id) on delete cascade not null,
  price numeric not null,
  quantity int not null default 1
);

-- 2. Configure Row Level Security (RLS)

-- Enable RLS
alter table profiles enable row level security;
alter table games enable row level security;
alter table carts enable row level security;
alter table cart_items enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Profiles: Users can read all, but only update their own
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Games: Viewable by everyone, only admin can modify (assuming via dashboard for now)
create policy "Games are viewable by everyone." on games for select using (true);

-- Carts: Users can only see and modify their own cart
create policy "Users can view their own cart." on carts for select using (auth.uid() = user_id);
create policy "Users can insert their own cart." on carts for insert with check (auth.uid() = user_id);
create policy "Users can update their own cart." on carts for update using (auth.uid() = user_id);

-- Cart Items: Users can only see and modify items in their cart
create policy "Users can view their own cart items." on cart_items for select using (
  exists (select 1 from carts where carts.id = cart_items.cart_id and carts.user_id = auth.uid())
);
create policy "Users can insert their own cart items." on cart_items for insert with check (
  exists (select 1 from carts where carts.id = cart_items.cart_id and carts.user_id = auth.uid())
);
create policy "Users can update their own cart items." on cart_items for update using (
  exists (select 1 from carts where carts.id = cart_items.cart_id and carts.user_id = auth.uid())
);
create policy "Users can delete their own cart items." on cart_items for delete using (
  exists (select 1 from carts where carts.id = cart_items.cart_id and carts.user_id = auth.uid())
);

-- Orders: Users can only see their own orders
create policy "Users can view their own orders." on orders for select using (auth.uid() = user_id);
create policy "Users can insert their own orders." on orders for insert with check (auth.uid() = user_id);

-- Order Items: Users can only see items of their orders
create policy "Users can view their own order items." on order_items for select using (
  exists (select 1 from orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);
create policy "Users can insert their own order items." on order_items for insert with check (
  exists (select 1 from orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);

-- 3. Triggers for automations

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Trigger to create empty cart after profile creation
create or replace function public.handle_new_profile_cart()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.carts (user_id)
  values (new.id);
  return new;
end;
$$;

create trigger on_profile_created
  after insert on public.profiles
  for each row execute procedure public.handle_new_profile_cart();

-- 4. Initial Seed Data (Games)
insert into games (name, slug, description, price, category, image_url) values
('Lords of the Fallen', 'lords-of-the-fallen', 'Cùng nhau đối đầu với tên chúa tể ác quỷ trong The Lords of the Fallen', 450000, 'Action RPG', 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&q=80'),
('Cyberpunk 2077', 'cyberpunk-2077', 'Cyberpunk 2077 is an open-world, action-adventure story set in Night City.', 990000, 'RPG', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80'),
('Resident Evil 4', 'resident-evil-4', 'Sinh tồn kinh dị được tái định nghĩa trong Resident Evil 4.', 850000, 'Horror', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80'),
('God of War Ragnarök', 'god-of-war-ragnarok', 'Cùng Kratos và Atreus khám phá Cửu Giới.', 1250000, 'Action', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80'),
('Final Fantasy VII Rebirth', 'ffvii-rebirth', 'Hành trình vượt ra ngoài Midgar hứa hẹn ngập tràn điều bất ngờ.', 1450000, 'JRPG', 'https://images.unsplash.com/photo-1605901302636-9b5cebe12982?auto=format&fit=crop&q=80')
on conflict (slug) do nothing;
