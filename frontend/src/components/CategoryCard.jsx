import React from "react";

export default function CategoryCard({ label, image, featured }) {
  return (
    <button
      type="button"
      className={`flex min-h-[130px] flex-col items-start gap-2 rounded-2xl border bg-white p-2.5 text-left ${
        featured
          ? "border-emerald-600 ring-1 ring-emerald-600"
          : "border-gray-200"
      }`}
    >
      <span className="flex flex-col text-[10.5px] font-semibold uppercase leading-tight tracking-wide text-slate-900">
        {label.split("\n").map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
      <span className="aspect-square w-full overflow-hidden rounded-xl">
        <img src={image} alt="" className="h-full w-full object-cover" />
      </span>
    </button>
  );
}