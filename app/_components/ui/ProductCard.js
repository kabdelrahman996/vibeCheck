import Image from "next/image";
import Link from "next/link";

function ProductCard({ product, main = false, price = false }) {
  const finalPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <Link
      href={`/products/${product.id}`}
      className={`group w-80  ${main ? "h-[90%]" : "h-[420px]"} shrink-0 relative overflow-hidden rounded-xl bg-black`}
    >
      <Image
        src={product.image}
        fill
        alt={product.title}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {product.discount > 0 && (
        <span className="absolute top-4 left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
          -{product.discount}%
        </span>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 z-10 p-5 text-white">
        <h3 className="mb-2 text-xl font-semibold line-clamp-1">
          {product.title}
        </h3>

        <p className="mb-3 text-sm text-gray-300 line-clamp-2">
          {product.short_description}
        </p>

        {price && (
          <div className="flex items-center gap-2">
            {product.discount > 0 ? (
              <>
                <span className="text-lg font-bold">
                  ${finalPrice.toFixed(2)}
                </span>

                <span className="text-sm text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

export default ProductCard;
