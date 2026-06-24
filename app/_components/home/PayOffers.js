import Image from "next/image";

function PayOffers() {
  return (
    <section className="relative w-full sm:w-[95%] lg:w-[90%] mx-auto min-h-[35vh] sm:min-h-[40vh] lg:h-[45vh] my-10 overflow-hidden">
      <Image
        src="/payWays.png"
        alt="Payment Methods"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/80" />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-8 gap-4 sm:gap-6 lg:gap-8">
        <h2 className="font-sora font-normal text-white text-lg sm:text-2xl lg:text-[26px]">
          Pay Your Way
        </h2>

        <p className="font-sora text-white font-normal leading-tight max-w-[22ch] sm:max-w-[30ch] lg:max-w-[36ch] text-xl sm:text-3xl lg:text-[46px]">
          Choose the payment method that works best for you.
          <br className="hidden lg:block" />
          Fast, secure, and hassle-free checkout every time.
        </p>
      </div>
    </section>
  );
}

export default PayOffers;
