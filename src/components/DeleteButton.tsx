"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteButton = ({ id }: { id: string }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    return;
  }

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      router.push("/menu");
      // toast("The product has been deleted!")
    } else {
      const data = await res.json();
      // toast.error(data.message)
    }
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl absolute top-4 right-4 hidden md:block"
      onClick={handleDelete}
    >
      Xóa sản phẩm
    </button>
  );
};

export default DeleteButton;
