import Button from "../ui/Button";

function Hero() {
  return (
    <section className="relative bg-[url('/hero.png')] bg-cover bg-no-repeat bg-center min-h-[70vh] w-full sm:w-[95%] lg:w-[90%] mx-auto flex items-center justify-center before:content-[''] before:absolute before:inset-0 before:bg-black/60">
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 flex flex-col gap-8 sm:gap-10 lg:gap-[62px] items-center justify-center">
        <h1 className="font-sora font-bold leading-tight text-2xl sm:text-4xl lg:text-[48px] max-w-[20ch] sm:max-w-[30ch]">
          Check Your Vibe, Wear Your Confidence
        </h1>

        <Button cta={true}>Find Your Vibe</Button>
      </div>
    </section>
  );
}

export default Hero;
