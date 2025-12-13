import React from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const StatusMessage = ({ status, error }) => {
  const navigate = useNavigate();

  if (status === "loading") {
    return (
      <div className="max-w-4xl mx-auto mb-4 p-4 bg-blue-50 text-blue-700 rounded-lg flex items-center gap-2">
        <Loader2 className="w-5 h-5 animate-spin" />
        <p>Sedang mengirim review...</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="max-w-4xl mx-auto mb-4 p-4 bg-green-50 text-green-700 rounded-lg">
        ✅ Review berhasil dibuat!
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="max-w-4xl mx-auto mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
        ❌ Gagal: {error?.message || "Terjadi kesalahan saat mengirim review"}
        {error?.error_code === "NO_USER_CONTEXT" && (
          <div className="mt-2">
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 underline hover:no-underline"
            >
              Silakan login terlebih dahulu
            </button>
          </div>
        )}
      </div>
    );
  }

  return null;
};
