import { useState } from "react";
import { Link } from "react-router-dom";
import { useSiteContent } from "../content/SiteContentContext";

export default function Page1Question() {
  const [noPos, setNoPos] = useState({ x: 64, y: 54 });
  const { content } = useSiteContent();
  const page = content.page1;

  const dodge = () => {
    setNoPos({
      x: 8 + Math.random() * 75,
      y: 14 + Math.random() * 65,
    });
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-4 py-8 sm:px-6">
      <section className="float-in w-full rounded-3xl border border-rose-200/70 bg-white/70 p-5 shadow-2xl shadow-rose-300/35 backdrop-blur sm:p-8">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold leading-tight text-rose-900 sm:text-5xl">{page.title}</h1>
            <p className="text-base text-rose-800 sm:text-lg">{page.subtitle}</p>
          </div>

          <div className="relative h-56 rounded-2xl border-2 border-dashed border-rose-300 bg-rose-50/70 p-4 sm:h-72">
            {page.imageSrc ? (
              <img
                src={page.imageSrc}
                alt={page.imageAlt || "You looking adorably angry"}
                className="h-full w-full rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center rounded-xl bg-gradient-to-br from-white to-rose-100 text-center text-sm font-semibold text-rose-500">
                {page.imageLabel}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-rose-200 bg-white/70 p-4">
          <div className="relative h-44 overflow-hidden rounded-xl bg-rose-50 p-2 sm:h-48">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Link
                to="/page-2"
                className="rounded-full bg-rose-600 px-7 py-3 text-sm font-bold text-white transition hover:scale-105 hover:bg-rose-700"
              >
                Yes
              </Link>
            </div>

            <button
              onMouseEnter={dodge}
              onMouseMove={dodge}
              onClick={dodge}
              className="absolute rounded-full bg-slate-200 px-7 py-3 text-sm font-bold text-slate-700 transition"
              style={{ left: `${noPos.x}%`, top: `${noPos.y}%` }}
            >
              No
            </button>
          </div>
          <p className="mt-3 text-sm text-rose-700">Try clicking "No" if you can... 😅</p>
        </div>
      </section>
    </main>
  );
}
