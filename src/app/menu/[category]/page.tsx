import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import CategorySwitchPage from "@/components/CategorySwitch";

const getData = async (category: string) => {
  const res = await fetch(
    `http://localhost:3000/api/products?cat=${category}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};

type Props = {
  params: { category: string };
};

const CategoryPage = async ({ params }: Props) => {
  const products: ProductType[] = await getData(params.category);

  return (
    <>
      {/* <CategorySwitchPage /> */}
      <div className="flex flex-wrap text-red-500 overflow-hidden pt-12">
        {products.map((item) => (
          <Link
            className="w-full h-[60vh] sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50 hover:bg-fuchsia-100"
            href={`/product/${item.id}`}
            key={item.id}
          >
            {item.img && (
              <div className="relative h-[80%] hover:rotate-[60deg] hover:scale-110 transition-all duration-300">
                <Image
                  src={item.img}
                  alt="category item"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div className="flex items-center justify-between font-bold">
              <h1 className="text-xl uppercase p-2">{item.title}</h1>
              <h2 className="group-hover:hidden text-xl">{item.price} VNĐ</h2>
              <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">
                Thêm vào giỏ hàng
              </button>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CategoryPage;
