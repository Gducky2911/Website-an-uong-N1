"use client";
import Link from "next/link";
import Menu from "./Menu";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const data = useSession();

  return (
    <div className=" border-b-2 border-red-500 py-3 bg-red-100">
      <div className="container mx-auto flex items-center justify-between px-4 ">
        <div className="hidden md:flex text-sm space-x-4">
          <Link href="/" className="nav-link">
            Trang chủ
          </Link>
          <Link href="/menu" className="nav-link">
            Thực đơn
          </Link>
          {data.data?.user.isAdmin && (
            <Link href="/add" className="nav-link">
              Thêm thực đơn
            </Link>
          )}
          <Link href="/" className="nav-link">
            Giới thiệu
          </Link>
          <Link href="/" className="nav-link">
            Liên hệ
          </Link>
        </div>
        <div className="text-xl font-bold">
          <Link href="/" className="nav-link">
            FOOD PTIT
          </Link>
        </div>
        <div className="md:hidden">
          <Menu />
        </div>
        <div className="hidden md:flex items-center">
          <UserLinks />
          <Link href="/cart" className="nav-link">
            <CartIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
