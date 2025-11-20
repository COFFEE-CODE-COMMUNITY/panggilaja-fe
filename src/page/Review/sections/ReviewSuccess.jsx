import React from "react";
import { ThumbsUp } from "lucide-react";

export const ReviewSuccess = ({ serviceName, onReset }) => {
  return (
    <div className="p-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <ThumbsUp className="w-8 h-8 text-[var(--color-primary)]" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Terima Kasih!</h2>
      <p className="text-gray-600 mb-6">
        Penilaian Anda untuk{" "}
        <span className="font-semibold text-[var(--color-primary)]">
          {serviceName}
        </span>{" "}
        telah berhasil dikirim.
      </p>
      <button
        onClick={onReset}
        className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
      >
        Beri Penilaian Lain
      </button>
    </div>
  );
};
