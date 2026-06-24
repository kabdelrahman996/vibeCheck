import { getProduct } from "@/app/_lib/apiProducts";
import { auth } from "@/app/_lib/auth";
import Image from "next/image";
import ProductClient from "./ProductClient";

async function page({ params }) {
  const { productId } = await params;
  const product = await getProduct(productId);
  const session = await auth();

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 w-[90%] mx-auto gap-10 py-10">
      <div className="relative w-full h-[500px] bg-gray-50 rounded-xl overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
          priority
        />
      </div>

      <div>
        <ProductClient product={product} isAuth={!!session} />
      </div>
    </section>
  );
}

export default page;
