"use client";
import Link from "next/link";
import Menu from "./Menu";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";

const Navbar = () => {
  return (
    <div className="h-12 md:h-24 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase">
      <div className="hidden md:flex gap-8">
        <Link href="/">Trang chủ</Link>
        <Link href="/menu">Thực đơn</Link>
        <Link href="/">Giới thiệu</Link>
        <Link href="/">Liên hệ</Link>
      </div>
      <div className="text-xl font-bold">
        <Link href="/">PIZZA PTIT</Link>
      </div>
      <div className="md:hidden">
        <Menu />
      </div>
      <div className="hidden md:flex gap-8 items-center">
        <div className="flex items-center gap-2 cursor-pointer bg-orange-300 px-2 rounded-md">
          <Image src="/phone.png" alt="phone" width={20} height={20} />
          <span>0353 580 848</span>
        </div>
        <UserLinks />
        <Link href="/cart">
          <CartIcon />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
