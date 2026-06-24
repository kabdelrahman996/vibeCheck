"use client";

import Button from "@/app/_components/ui/Button";
import { addToCartAction } from "@/app/_lib/actions";
import { useState } from "react";
import { toast } from "sonner";

function getFinalPrice(price, discount) {
  if (!discount) return price;
  return Math.round(price - (price * discount) / 100);
}

function OptionButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-4 py-2 border rounded-md transition cursor-pointer
        ${
          active
            ? "bg-dark text-white border-dark"
            : "hover:bg-dark hover:text-white hover:border-dark"
        }
      `}
    >
      {children}
    </button>
  );
}

export default function ProductClient({ product, isAuth }) {
  const finalPrice = getFinalPrice(product.price, product.discount);

  const [orderItem, setOrderItem] = useState({
    product_id: product.id,
    category: product.category.name,
    color: "",
    size: "",
    quantity: 1,
    price: finalPrice,
  });

  const isReady = Boolean(orderItem.color && orderItem.size);

  const totalPrice = orderItem.quantity * finalPrice;

  function updateOrderItem(field, value) {
    setOrderItem((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleAddToCart() {
    if (!isReady || product.stock === 0) return;
    const result = await addToCartAction(orderItem);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setOrderItem({
      product_id: product.id,
      category: product.category.name,
      color: "",
      size: "",
      quantity: 1,
      price: finalPrice,
    });
  }

  const availableQuantities = Array.from(
    { length: Math.min(product.stock, 10) },
    (_, i) => i + 1,
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Category */}
      <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
        {product.category?.name}
      </p>
      {/* Title */}
      <h1 className="font-sora text-[40px] font-bold text-dark">
        {product.title}
      </h1>

      {/* Short Description */}
      <p className="text-[18px] text-gray-600">{product.short_description}</p>

      {/* Description */}
      <p className="leading-relaxed text-dark/80">{product.description}</p>

      {/* Colors */}
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Colors</h3>

        <div className="flex flex-wrap gap-3">
          {product.colors.map((color) => (
            <OptionButton
              key={color}
              active={orderItem.color === color}
              onClick={() => updateOrderItem("color", color)}
            >
              {color}
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Sizes</h3>

        <div className="flex flex-wrap gap-3">
          {product.sizes.map((size) => (
            <OptionButton
              key={size}
              active={orderItem.size === size}
              onClick={() => updateOrderItem("size", size)}
            >
              {size}
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Quantity */}
      {product.stock > 0 && (
        <div className="flex items-center gap-4">
          <h3 className="font-semibold text-xl">Quantity</h3>

          <select
            value={orderItem.quantity}
            onChange={(e) =>
              updateOrderItem("quantity", Number(e.target.value))
            }
            className="rounded-xl border px-4 py-2"
          >
            {availableQuantities.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Price */}
      <div className="mt-4 flex items-center gap-4">
        <h2 className="font-sora text-3xl font-bold">{totalPrice} EGP</h2>

        {product.discount > 0 && (
          <span className="text-gray-500 line-through">
            {product.price * orderItem.quantity} EGP
          </span>
        )}
      </div>

      {/* Discount Badge */}
      {product.discount > 0 && (
        <p className="font-medium text-green-600">
          Save {product.discount}% on this product
        </p>
      )}

      {/* Stock Warning */}
      {product.stock > 0 && product.stock <= 5 && (
        <p className="text-sm text-red-500">
          Only {product.stock} left in stock
        </p>
      )}

      {/* Add To Cart */}
      {isAuth && (
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || !isReady}
        >
          {product.stock === 0
            ? "Out of Stock"
            : isReady
              ? `Add To Cart (${totalPrice} EGP)`
              : "Select options first"}
        </Button>
      )}
    </div>
  );
}
