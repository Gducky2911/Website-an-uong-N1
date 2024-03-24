"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserLinks = () => {
  const data = useSession();
  const logo =
    data.data?.user.image ||
    "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png";
  return (
    <div>
      {data.status === "authenticated" ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "10px" }}>{data.data.user.name}</span>
          <img
            src={logo}
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
          <Link
            href="/orders"
            style={{
              textDecoration: "none",
              color: "blue",
              marginLeft: "10px",
            }}
          >
            Đơn hàng
          </Link>
          <span
            className="ml-4 cursor-pointer"
            style={{ textDecoration: "underline", cursor: "pointer" }}
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
