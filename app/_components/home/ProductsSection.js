"use client";

import { useRef } from "react";
import Image from "next/image";
import ProductCard from "../ui/ProductCard";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

function ProductsSection({
  sectionBg,
  sectionTitle,
  sectionDescription,
  products,
  reverse = false,
}) {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  return (
    <section className="grid grid-cols-12 w-[90%] gap-3 mx-auto my-5 relative">
      <div
        className={`absolute ${
          reverse ? "top-0 left-0" : "top-0 right-0"
        } flex items-center justify-center gap-2`}
      >
        <button
          onClick={scrollLeft}
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full cursor-pointer hover:opacity-80 duration-100"
        >
          <FaChevronLeft size={20} />
        </button>

        <button
          onClick={scrollRight}
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full cursor-pointer hover:opacity-80 duration-100"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      <div
        className={`col-span-3 h-150 relative flex items-center justify-center text-white ${
          reverse ? "order-2" : "order-1"
        }`}
      >
        <Image
          src={sectionBg}
          alt={sectionTitle}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="z-10 flex flex-col items-center justify-center">
          <h2 className="font-sora text-[28px] font-semibold text-white">
            {sectionTitle}
          </h2>

          <p className="text-[24px] font-normal text-bg-white text-center">
            {sectionDescription}
          </p>
        </div>
      </div>

      <div
        ref={sliderRef}
        className={`col-span-9 h-140 my-auto flex items-center gap-[10px] overflow-x-auto custom-scrollbar ${
          reverse ? "order-1 flex-row-reverse" : "order-2"
        }`}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} main />
        ))}
      </div>
    </section>
  );
}

export default ProductsSection;
