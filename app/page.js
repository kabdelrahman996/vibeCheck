import AllProductsSections from "./_components/home/AllProductsSections";
import Categories from "./_components/home/Categories";
import Gallery from "./_components/home/Gallery";
import Hero from "./_components/home/Hero";
import MainOffer from "./_components/home/MainOffer";
import PayOffers from "./_components/home/PayOffers";

function page() {
  return (
    <div>
      <Hero />
      <Categories />
      <AllProductsSections />
      <MainOffer />
      <PayOffers />
      <Gallery />
    </div>
  );
}

export default page;
