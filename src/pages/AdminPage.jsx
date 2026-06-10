import { Link } from "react-router-dom";
import { useSiteContent } from "../content/SiteContentContext";

const pageOrder = ["page1", "page2", "page3", "page4", "page5", "page6", "page7"];

function prettyPageName(pageKey) {
  return pageKey.replace("page", "Page ");
}

export default function AdminPage() {
  const { content, updatePage, resetContent } = useSiteContent();

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8 sm:px-6">
      <section className="float-in rounded-3xl border border-rose-200/70 bg-white/80 p-5 shadow-2xl shadow-rose-300/35 backdrop-blur sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-4xl font-bold text-rose-900">Content Admin</h1>
            <p className="text-sm text-rose-700">
              Add image URLs and edit text for all pages. Changes are saved in your browser instantly.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={resetContent}
              className="rounded-full border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
            >
              Reset Defaults
            </button>
            <Link
              to="/"
              className="rounded-full bg-rose-600 px-4 py-2 text-sm font-bold text-white hover:bg-rose-700"
            >
              Back To Site
            </Link>
          </div>
        </div>

        <div className="space-y-5">
          {pageOrder.map((pageKey) => {
            const page = content[pageKey];
            return (
              <div key={pageKey} className="rounded-2xl border border-rose-200 bg-white p-4">
                <h2 className="mb-3 text-xl font-bold text-rose-800">{prettyPageName(pageKey)}</h2>
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="text-sm font-semibold text-rose-700">
                    Title
                    <input
                      value={page.title}
                      onChange={(e) => updatePage(pageKey, "title", e.target.value)}
                      className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="text-sm font-semibold text-rose-700">
                    Image URL or relative path
                    <input
                      value={page.imageSrc}
                      onChange={(e) => updatePage(pageKey, "imageSrc", e.target.value)}
                      placeholder="https://... or /photos/page1.jpg"
                      className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="text-sm font-semibold text-rose-700 md:col-span-2">
                    Subtitle
                    <textarea
                      value={page.subtitle}
                      onChange={(e) => updatePage(pageKey, "subtitle", e.target.value)}
                      rows={2}
                      className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="text-sm font-semibold text-rose-700">
                    Image Alt Text
                    <input
                      value={page.imageAlt}
                      onChange={(e) => updatePage(pageKey, "imageAlt", e.target.value)}
                      className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="text-sm font-semibold text-rose-700">
                    Placeholder Label
                    <input
                      value={page.imageLabel}
                      onChange={(e) => updatePage(pageKey, "imageLabel", e.target.value)}
                      className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2 text-sm"
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
