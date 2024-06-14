"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { ImageSkeleton } from "./image-skeleton";

interface ChapterImageProps {
  contentURL: string;
  fullTitle: string;
}

export default function ChapterImage({
  contentURL,
  fullTitle,
}: ChapterImageProps) {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    toast.error("Failed to load image");
  };

  return (
    <div className="mx-auto w-full">
      {loading && <ImageSkeleton />}
      <Image
        src={contentURL}
        alt={fullTitle}
        className={`h-auto w-full ${loading ? 'invisible' : 'visible'}`}
        sizes="100vw"
        height={0}
        width={0}
        unoptimized
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
}
