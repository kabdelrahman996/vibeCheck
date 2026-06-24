"use client";

import Image from "next/image";
import Button from "../ui/Button";

const images = [
  { src: "/gallery3.png", alt: "Gallery Image 1" },
  { src: "/gallery2.png", alt: "Gallery Image 2" },
  { src: "/gallery1.png", alt: "Gallery Image 3" },
  { src: "/gallery4.png", alt: "Gallery Image 4" },
];

function GalleryItem({ src, alt, className = "", sizes }) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm scale-75 transition-transform duration-500 group-hover:scale-100"></span>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="w-[90%] mx-auto py-16 sm:py-20 flex flex-col gap-10"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="font-sora text-xs uppercase tracking-[0.2em] text-neutral-400">
          Take a look
        </span>
        <h1 className="font-sora text-[28px] sm:text-[34px] font-normal">
          Gallery
        </h1>
        <div className="h-px w-12 bg-neutral-300" />
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-3 sm:gap-4 lg:h-[85vh]">
        <GalleryItem
          src={images[0].src}
          alt={images[0].alt}
          className="h-[280px] sm:h-[340px] lg:h-auto"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <GalleryItem
          src={images[1].src}
          alt={images[1].alt}
          className="h-[280px] sm:h-[340px] lg:h-auto"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <GalleryItem
          src={images[2].src}
          alt={images[2].alt}
          className="h-[280px] sm:h-[340px] lg:h-auto lg:row-span-2"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <GalleryItem
          src={images[3].src}
          alt={images[3].alt}
          className="h-[280px] sm:h-[340px] lg:h-auto sm:col-span-2 lg:col-span-2"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 66vw"
        />
      </div>

      <div className="w-fit mx-auto">
        <Button>Follow Us</Button>
      </div>
    </section>
  );
}
