import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import CategorySwitchPage from "@/components/CategorySwitch";

const getData = async () => {
  const res = await fetch(`http://localhost:3000/api/products/find-all`);
  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }
  return res.json();
};

type Props = {
  params: { category: string };
};

const CategoryPage = async ({ params }: Props) => {
  const productsData = await getData();
  const categoryData = productsData.find(
    (cat: any) => cat.slug === params.category
  );
  const products = categoryData
    ? categoryData.items
    : productsData.flatMap((cat: any) => cat.items);

  return (
    <div className="flex xl:flex-row flex-col">
      <CategorySwitchPage />
      <div className="flex flex-7 flex-wrap w-full text-red-500 min-h-screen overflow-hidden">
        {products.map((item: any) => (
          <Link
            className="w-full h-[60vh] sm:w-1/2 lg:w-1/3 p-8 flex flex-col justify-between group odd:bg-fuchsia-50 hover:bg-fuchsia-100 border-b border-l"
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
    </div>
  );
};

export default CategoryPage;
