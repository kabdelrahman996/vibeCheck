import { getProducts } from "@/app/_lib/apiProducts";
import ProductsSection from "./ProductsSection";

async function AllProductsSections() {
  const products = await getProducts();
  const graphicTees = products.filter(
    (product) => product.category_id === "08717e81-bb25-4e2f-baa7-9c7e07b64851",
  );
  const oversized = products.filter(
    (product) => product.category_id === "2789e964-7fcb-430d-9f7c-a2a4b7704b1f",
  );
  const bestSellers = products.filter((product) => product.featured == true);
  const newArrivals = products.slice(0, 10);

  return (
    <div className="hidden xl:flex flex-col gap-[50px]">
      <ProductsSection
        sectionBg="/products_p/bestSeller.png"
        sectionTitle="Popular Picks"
        sectionDescription="Explore Best Sellers"
        products={bestSellers}
      />
      <ProductsSection
        sectionBg="/products_p/newArrivals.png"
        sectionTitle="New Arrivals"
        sectionDescription="Fresh styles, Fresh confidence."
        products={newArrivals}
      />
      <ProductsSection
        sectionBg="/products_p/graphicTees.png"
        sectionTitle="Graphic Tees"
        sectionDescription="Wear your statement, Own your vibe."
        products={graphicTees}
        reverse={true}
      />
      <ProductsSection
        sectionBg="/products_p/oversizeCollection.png"
        sectionTitle="Oversized Collection"
        sectionDescription="Relaxed fit, Maximum confidence."
        products={oversized}
        reverse={true}
      />
      {/* <ProductsSection
        sectionBg="/products_p/summerCollection.jpeg"
        sectionTitle="Summer Collection"
        sectionDescription="Made for sunshine. Built for comfort."
        products={products5}
      /> */}
    </div>
  );
}

export default AllProductsSections;
