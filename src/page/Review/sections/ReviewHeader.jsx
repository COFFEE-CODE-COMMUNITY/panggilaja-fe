import React from "react";
import { ThumbsUp } from "lucide-react";

export const ReviewHeader = () => {
  return (
    <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] p-6 text-white">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <ThumbsUp className="w-8 h-8" />
        Penilaian Jasa
      </h1>
      <p className="text-white mt-2">
        Bantu kami meningkatkan kualitas jasa dengan memberikan penilaian Anda
      </p>
    </div>
  );
};
