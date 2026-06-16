"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api/client";
import { AdminLoading } from "./ui/AdminLoading";
import { IconMail, IconNews, IconProducts } from "./ui/icons";

export function DashboardStats() {
  const [counts, setCounts] = useState({ products: 0, news: 0, contact: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminApi.getProducts(),
      adminApi.getNews(),
      adminApi.getContactMessages(),
    ])
      .then(([products, news, contact]) => {
        setCounts({
          products: products.length,
          news: news.length,
          contact: contact.length,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <AdminLoading />;

  const stats = [
    {
      label: "Sản phẩm",
      value: counts.products,
      href: "/admin/products",
      icon: IconProducts,
    },
    {
      label: "Tin tức",
      value: counts.news,
      href: "/admin/news",
      icon: IconNews,
    },
    {
      label: "Tin nhắn liên hệ",
      value: counts.contact,
      href: "/admin/contact",
      icon: IconMail,
    },
  ];

  return (
    <>
      <div className="admin-stat-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.href} href={stat.href} className="admin-stat-card">
              <span className="admin-stat-accent" aria-hidden />
              <div className="flex items-center justify-between">
                <p className="admin-stat-label">{stat.label}</p>
                <Icon className="h-5 w-5 text-hh-blue/70" />
              </div>
              <p className="admin-stat-value">{stat.value}</p>
            </Link>
          );
        })}
      </div>

      <div className="admin-quick-grid">
        <Link href="/admin/products/new" className="admin-quick-card group">
          <p className="admin-quick-card-title">Thêm sản phẩm mới</p>
          <p className="admin-quick-card-desc">
            Tạo sản phẩm cá tra với nội dung tiếng Việt và tiếng Anh.
          </p>
        </Link>
        <Link href="/admin/news/new" className="admin-quick-card group">
          <p className="admin-quick-card-title">Đăng tin tức</p>
          <p className="admin-quick-card-desc">
            Viết bài mới cho mục tin tức & sự kiện trên website.
          </p>
        </Link>
        <Link href="/admin/contact" className="admin-quick-card group">
          <p className="admin-quick-card-title">Xem hộp thư liên hệ</p>
          <p className="admin-quick-card-desc">
            Kiểm tra tin nhắn khách hàng gửi từ form liên hệ.
          </p>
        </Link>
      </div>
    </>
  );
}
