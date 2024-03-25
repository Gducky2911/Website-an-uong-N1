"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserLinks = () => {
  const data = useSession();
  // const logo =
  //   data.data?.user.image ||
  //   "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png";
  return (
    <div>
      {data.status === "authenticated" ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="font-bold px-4 mr-2 cursor-pointer">
            {data.data.user.name}
          </span>
          <Link
            href="/orders"
            className="hover:font-bold text-blue-900 px-4 mr-2"
          >
            Đơn hàng
          </Link>
          <span
            className="hover:font-bold px-4 mr-2 cursor-pointer"
            onClick={() => signOut()}
          >
            Đăng xuất
          </span>
        </div>
      ) : (
        <Link href="/login">Đăng nhập</Link>
      )}
    </div>
  );
};

export default UserLinks;
