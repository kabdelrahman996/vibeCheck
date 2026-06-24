import Image from "next/image";
import Button from "../ui/Button";

function MainOffer() {
  return (
    <section className="relative w-full sm:w-[95%] lg:w-[90%] mx-auto min-h-[60vh] sm:min-h-[70vh] lg:h-[80vh] my-10 overflow-hidden">
      <Image
        src="/makeUrSummer.png"
        alt="Summer Collection"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/80" />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-8 gap-6 sm:gap-8 lg:gap-12">
        <h2 className="font-sora font-normal text-white text-lg sm:text-2xl lg:text-[26px]">
          Make Your Summer
        </h2>

        <p className="font-sora text-white font-normal leading-tight max-w-[20ch] sm:max-w-[28ch] lg:max-w-[24ch] text-2xl sm:text-4xl lg:text-[46px]">
          Easy fits. Clean looks. Everything you need for sunny days.
        </p>

        <Button link="/products?category=summer_collection" cta>
          Shop Summer Fits
        </Button>
      </div>
    </section>
  );
}

export default MainOffer;
