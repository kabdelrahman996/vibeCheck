import CategoryItem from "./CategoryItem";

function Categories() {
  const categories = [
    {
      image: "summerCollection.png",
      title: "Summer Collection",
      slug: "summer_collection",
    },
    { image: "graphicTees.png", title: "Graphic Tees", slug: "graphic_tees" },
    {
      image: "oversizeCollection.png",
      title: "Oversized Collection",
      slug: "oversized_collection",
    },
    { image: "newArrival.png", title: "New Arrivals", slug: "new_arrivals" },
    { image: "bestSellers.png", title: "Best Sellers", slug: "best_sellers" },
  ];

  return (
    <section
      id="categories"
      className="w-[90%] mx-auto py-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center"
    >
      {categories.map((cat) => (
        <CategoryItem key={cat.slug} image={cat.image} slug={cat.slug}>
          {cat.title}
        </CategoryItem>
      ))}
    </section>
  );
}

export default Categories;
