"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartIcon from "./CartIcon";

const links = [
  { id: 1, title: "Trang chủ", url: "/" },
  { id: 2, title: "Thực đơn", url: "/menu" },
  { id: 3, title: "Giới thiệu", url: "/" },
  { id: 4, title: "Liên hệ", url: "/" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(false);
  return (
    <div className="cursor-pointer" onClick={() => setOpen(!open)}>
      {!open ? (
        <Image src="/open.png" alt="open" width={20} height={20} />
      ) : (
        <Image src="/close.png" alt="close" width={20} height={20} />
      )}
      {open && (
        <div className="bg-red-500 text-white absolute left-0 top-24 h-[calc(100vh - 12em)] flex justify-center items-center text-lg flex-col gap-8 w-full py-8">
          {links.map((link) => (
            <div key={link.id} className="text-center">
              <Link
                key={link.id}
                href={link.url}
                onClick={() => setOpen(false)}
                className="hover:bg-red-600 p-2 rounded-md"
              >
                {link.title}
              </Link>
            </div>
          ))}
          {!user ? (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="hover:bg-red-600 p-2 rounded-md"
            >
              Đăng nhập
            </Link>
          ) : (
            <Link
              href="/orders"
              onClick={() => setOpen(false)}
              className="hover:bg-red-600 p-2 rounded-md"
            >
              Đơn hàng
            </Link>
          )}
          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="hover:bg-red-600 p-2 rounded-md"
          >
            <CartIcon />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
