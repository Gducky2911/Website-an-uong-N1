// CategorySwitchPage.js
import { useEffect, useState } from "react";
import Link from "next/link";
import { MenuType } from "@/types/types";

const CategorySwitchPage = () => {
  const [menu, setMenu] = useState<MenuType>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/categories", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed!");
        }
        const data = await res.json();
        setMenu(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 py-12 h-[200px] gap-4 justify-start flex-3 xl:flex-col flex-row md:flex hidden items-center">
      <Link href={`/menu/find-all`} className="nav-link">
        {/* <div className="text-center py-2 px-4 rounded-md transition duration-300 ease-in-out"> */}
        <h1 className="uppercase font-bold text-md text-black hover:bg-red-300 text-center py-2 px-4 rounded-md transition duration-300 ease-in-out">
          Tất cả
        </h1>
        {/* </div> */}
      </Link>
      {menu.map((item) => (
        <Link href={`/menu/${item.slug}`} key={item.id} className="nav-link">
          <div
            className={`hover:bg-red-300 text-center py-2 px-4 rounded-md transition duration-300 ease-in-out`}
          >
            <h1 className="uppercase font-bold text-md text-black">
              {item.title}
            </h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategorySwitchPage;
