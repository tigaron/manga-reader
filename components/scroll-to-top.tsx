"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
  };

  return (
    <button
      className={cn(
        "fixed bottom-4 right-4 rounded-full bg-zinc-100 p-1 text-zinc-500 shadow-md dark:bg-zinc-700 dark:text-zinc-400",
        isVisible ? "visible" : "invisible",
      )}
      onClick={scrollToTop}
    >
      <ChevronUp className="h-4 w-4" />
    </button>
  );
}
