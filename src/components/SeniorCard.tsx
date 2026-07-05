"use client";

import Image from "next/image";

interface SeniorCardProps {
  name: string;
  position: string;
  quote: string;
  imageUrl: string;
  isActive: boolean;
}

export default function SeniorCard({ name, position, quote, imageUrl, isActive }: SeniorCardProps) {
  return (
    <div
      className={`absolute inset-0 w-full h-full flex-shrink-0 transition-all duration-700 ease-out ${
        isActive
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95"
      }`}
    >
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 640px) 85vw, 420px"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
