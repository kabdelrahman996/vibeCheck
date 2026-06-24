import Link from "next/link";

function CategoryItem({ image, children, slug }) {
  return (
    <Link
      href={`/products?category=${slug}`}
      className="flex flex-col items-center justify-center gap-4 cursor-pointer group"
    >
      <div
        className="
          w-24 h-24 sm:w-28 sm:h-28 lg:w-40 lg:h-40
          rounded-full
          bg-cover bg-center bg-no-repeat
          transition-transform duration-300
          group-hover:scale-105
        "
        style={{
          backgroundImage: image ? `url('/categories_s/${image}')` : "none",
          backgroundColor: image ? "transparent" : "#000",
        }}
      />

      <h1 className="font-sora text-sm sm:text-base lg:text-lg text-center">
        {children}
      </h1>
    </Link>
  );
}

export default CategoryItem;
