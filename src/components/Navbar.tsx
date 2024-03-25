"use client";
import Link from "next/link";
import Menu from "./Menu";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";

const Navbar = () => {
  return (
    <div className="h-12 md:h-24 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase">
      <div className="hidden md:flex">
        <Link className="hover:underline px-4 mr-2" href="/">
          Trang chủ
        </Link>
        <Link className="hover:underline px-4 mr-2" href="/menu">
          Thực đơn
        </Link>
        <Link className="hover:underline px-4 mr-2" href="/">
          Giới thiệu
        </Link>
        <Link className="hover:underline px-4 mr-2" href="/">
          Liên hệ
        </Link>
      </div>
      <div className="text-3xl font-bold">
        <Link href="/">PIZZA PTIT</Link>
      </div>
      <div className="md:hidden">
        <Menu />
      </div>
      <div className="hidden md:flex items-center">
        <UserLinks />
        <Link className="hover:underline px-4" href="/cart">
          <CartIcon />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
