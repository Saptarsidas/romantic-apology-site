export default function RomanticPhotoFrame({
  imageSrc,
  imageAlt,
  imageLabel,
  imageFit = "cover",
  imagePositionX = 50,
  imagePositionY = 50,
  className = "",
}) {
  const position = `${imagePositionX}% ${imagePositionY}%`;

  return (
    <div className={`relative overflow-hidden rounded-2xl border-2 border-dashed border-rose-300 bg-rose-50/70 p-4 ${className}`}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt || "Romantic memory"}
          className="h-full w-full rounded-xl"
          style={{ objectFit: imageFit, objectPosition: position }}
        />
      ) : (
        <div className="flex h-full items-center justify-center rounded-xl bg-gradient-to-br from-white to-rose-100 text-center text-sm font-semibold text-rose-500">
          {imageLabel}
        </div>
      )}
    </div>
  );
}
