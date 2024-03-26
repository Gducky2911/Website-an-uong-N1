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
    <div className="p-8 py-12 h-[200px] gap-4 justify-start flex-3 xl:flex-col flex-row md:flex hidden items-center">
      <Link
        href={`/menu/find-all`}
        className="p-2 w-[120px] rounded-3xl border-black border hover:bg-fuchsia-200 text-center"
      >
        <h1 className="uppercase font-bold text-md text-black">Tất cả</h1>
      </Link>
      {menu.map((item) => (
        <Link
          href={`/menu/${item.slug}`}
          key={item.id}
          className="p-2 w-[120px] rounded-3xl border-black border hover:bg-fuchsia-200"
        >
          <div className={`text-${item.color} w-full text-center`}>
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
