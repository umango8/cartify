"use client";

import { useRouter } from "next/navigation";

export default function PageNavigation({ next }) {
  const router = useRouter();

  return (
    <div className="w-full flex justify-start mt-6 mb-10 px-6">
      <div className="flex gap-3">

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-black hover:text-white transition"
        >
          ←
        </button>

        {/* Next */}
        <button
          onClick={() => next && router.push(next)}
          disabled={!next}
          className={`w-10 h-10 flex items-center justify-center rounded-full border transition ${
            !next
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-black hover:text-white"
          }`}
        >
          →
        </button>

      </div>
    </div>
  );
}
