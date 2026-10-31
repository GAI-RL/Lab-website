// Thin <img> wrapper: lazy by default, async decoding, `eager` for above-the-fold.
export default function Img({ eager = false, alt = "", ...props }) {
  return (
    <img
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...props}
    />
  );
}
