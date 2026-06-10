import { Link } from "react-router-dom";
import RomanticPhotoFrame from "./RomanticPhotoFrame";

export default function PageShell({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  imageLabel,
  imageFit,
  imagePositionX,
  imagePositionY,
  nextTo,
  nextText = "Next Page",
  children,
  showNext = true,
}) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-4 py-8 sm:px-6">
      <section className="float-in w-full rounded-3xl border border-rose-200/70 bg-white/70 p-5 shadow-2xl shadow-rose-300/35 backdrop-blur sm:p-8">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold leading-tight text-rose-900 sm:text-5xl">{title}</h1>
            <p className="text-base text-rose-800 sm:text-lg">{subtitle}</p>
          </div>

          <RomanticPhotoFrame
            imageSrc={imageSrc}
            imageAlt={imageAlt}
            imageLabel={imageLabel}
            imageFit={imageFit}
            imagePositionX={imagePositionX}
            imagePositionY={imagePositionY}
            className="h-56 sm:h-72"
          />
        </div>

        <div className="mt-8">{children}</div>

        {showNext && nextTo ? (
          <div className="mt-8 flex justify-end">
            <Link
              to={nextTo}
              className="rounded-full bg-rose-600 px-5 py-2.5 text-sm font-bold text-white transition hover:scale-105 hover:bg-rose-700"
            >
              {nextText}
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  );
}
