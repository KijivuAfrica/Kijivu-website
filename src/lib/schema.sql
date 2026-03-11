-- =========================================================
-- Kijivu Database Schema
-- Run this in: Supabase > SQL Editor > New Query
-- =========================================================

-- Products table
create table products (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  price        integer not null,         -- stored in KES (e.g. 7499)
  category     text not null,
  stock_status text not null default 'In Stock', -- 'In Stock' | 'Coming Soon'
  image_url    text,
  badge        text,                     -- e.g. 'Best Seller'
  description  text,
  created_at   timestamptz default now()
);

-- Orders table
create table orders (
  id                  uuid primary key default gen_random_uuid(),
  customer_name       text not null,
  customer_email      text not null,
  customer_phone      text not null,
  delivery_address    text not null,
  delivery_city       text not null,
  delivery_country    text not null default 'Kenya',
  items               jsonb not null,    -- array of { product_id, name, price, quantity }
  subtotal            integer not null,  -- KES
  delivery_fee        integer not null default 0,
  total_amount        integer not null,  -- KES
  payment_status      text not null default 'pending', -- 'pending' | 'paid' | 'failed'
  pesapal_order_id    text,              -- filled after Pesapal creates the order
  pesapal_tracking_id text,             -- filled after payment confirmation
  notes               text,
  created_at          timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table products enable row level security;
alter table orders   enable row level security;

-- Products: anyone can read, only admins can write
create policy "Public can read products"
  on products for select using (true);

-- Orders: anyone can insert (place an order), only admins can read all
create policy "Anyone can place an order"
  on orders for insert with check (true);

-- Seed initial products
insert into products (name, price, category, stock_status, image_url, badge) values
  ('MaryRuth Peach Mango Liquid Hair Supplement',    7499, 'Hair Growth',     'In Stock',    'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=600&fit=crop', 'Best Seller'),
  ('MaryRuth Dragon Fruit Liquid Hair Supplement',   7499, 'Hair Growth',     'Coming Soon', 'https://images.unsplash.com/photo-1620411284481-0b56a0c351e2?w=500&h=600&fit=crop', 'Waitlist'),
  ('Kids Immunity Gummies',                          4000, 'Kids Health',     'In Stock',    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=600&fit=crop', null),
  ('Prenatal & Postnatal Gummies',                   5500, 'Maternal Health', 'In Stock',    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=600&fit=crop', null);
