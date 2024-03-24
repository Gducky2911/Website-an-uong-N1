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

const MenuPage = async () => {
  const menu: MenuType = await getData();

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center">
      {menu.map((item) => (
        <Link
          href={`/menu/${item.slug}`}
          key={item.id}
          className="w-full h-1/3 bg-cover p-8 md:h-1/2"
          style={{ backgroundImage: `url(${item.img})` }}
        >
          <div className={`text-${item.color} w-1/2`}>
            <h1 className="uppercase font-bold text-3xl">{item.title}</h1>
            <p className="text-sm my-8">{item.desc}</p>
            <button
              className={`hidden 2xl:block bg-${item.color} text-white py-2 px-4 rounded-md`}
            >
              Khám phá
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;