"use client";

import { ProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Price = ({ product }: { product: ProductType }) => {
  const [total, setTotal] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  const { addToCart } = useCartStore();

  const handleCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: total,
      ...(product.options?.length && {
        optionTitle: product.options[selected].title,
      }),
      quantity: quantity,
    });
    toast.success("The product added to the cart!");
  };

  useEffect(() => {
    setTotal(quantity * product.price);
  }, [quantity, selected, product]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{total}</h2>
      <div className="flex gap-4">
        {product.options?.length &&
          product.options?.map((item, index) => (
            <button
              key={item.title}
              className="min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md"
              style={{
                background: selected === index ? "rgb(248 113 113)" : "white",
                color: selected === index ? "white" : "red",
              }}
              onClick={() => setSelected(index)}
            >
              {item.title}
            </button>
          ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between w-full p-3 ring-1 ring-red-500">
          <span>Số lượng</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 0))}
            >
              {">"}
            </button>
          </div>
        </div>
        <button
          className="uppercase w-72 bg-red-500 text-white p-3 ring-1 ring-red-500"
          onClick={handleCart}
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default Price;
