import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getBestSellers,
  getNewArrivals,
  getProductsByCategory,
  getProductsBySeason,
} from "@/app/_lib/apiProducts";
import ProductCard from "../_components/ui/ProductCard";

async function Page({ searchParams }) {
  const { category } = await searchParams;

  const pages = {
    graphic_tees: {
      image: "/graphicTeesHero.png",
      header: "Graphic Tees",
      slogan: "Wear your statement. Own your vibe.",
      getProducts: () =>
        getProductsByCategory("08717e81-bb25-4e2f-baa7-9c7e07b64851"),
    },

    oversized_collection: {
      image: "/overSizedHero.png",
      header: "Oversized Collection",
      slogan: "Relaxed fit. Maximum confidence.",
      getProducts: () =>
        getProductsByCategory("2789e964-7fcb-430d-9f7c-a2a4b7704b1f"),
    },

    new_arrivals: {
      image: "/newArrivalsHero.png",
      header: "New Arrivals",
      slogan: "Fresh styles just landed.",
      getProducts: getNewArrivals,
    },

    best_sellers: {
      image: "/bestSellersHero.png",
      header: "Best Sellers",
      slogan: "Customer favorites.",
      getProducts: getBestSellers,
    },
    summer_collection: {
      image: "/makeUrSummer.png",
      header: "Make Your Summer",
      slogan: "Easy fits. Clean looks. Everything you need for sunny days.",
      getProducts: () => getProductsBySeason("summer"),
    },
  };

  const pageData = pages[category];

  if (!pageData) {
    notFound();
  }

  const products = await pageData.getProducts();

  return (
    <section>
      <div className="relative min-h-[70vh] w-[90%] mx-auto overflow-hidden">
        <Image
          src={pageData.image}
          alt={pageData.header}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-[48px] font-sora font-bold mb-4">
            {pageData.header}
          </h1>

          <p className="font-normal text-[26px]">{pageData.slogan}</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-10 w-[90%] mx-auto my-20">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} price />
        ))}
      </div>
    </section>
  );
}

export default Page;
