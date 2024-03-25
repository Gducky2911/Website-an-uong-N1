import { MenuType } from "@/types/types";
import Link from "next/link";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};

const CategorySwitchPage = async () => {
  const menu: MenuType = await getData();

  return (
    <div className="p-4 h-[200px] flex gap-8 justify-start flex-row items-center">
      {menu.map((item) => (
        <Link
          href={`/menu/${item.slug}`}
          key={item.id}
          className="p-4 w-[250px] rounded-3xl border-black border hover:bg-fuchsia-100"
        >
          <div className={`text-${item.color} w-1/2 text-center`}>
            <h1 className="uppercase font-bold text-xl text-black">
              {item.title}
            </h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategorySwitchPage;
