import { U as jsxRuntimeExports } from "./worker-entry-BYvOMqif.js";
import { L as Link } from "./router-DsUVh2gx.js";
import { f as formatNaira } from "./format-DGko91Dw.js";
import { j as createLucideIcon } from "./main-layout-7G5etEiH.js";
const __iconNode = [
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
  ["path", { d: "M10.41 10.41a2 2 0 1 1-2.83-2.83", key: "1bzlo9" }],
  ["line", { x1: "13.5", x2: "6", y1: "13.5", y2: "21", key: "1q0aeu" }],
  ["line", { x1: "18", x2: "21", y1: "12", y2: "15", key: "5mozeu" }],
  [
    "path",
    {
      d: "M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59",
      key: "mmje98"
    }
  ],
  ["path", { d: "M21 15V5a2 2 0 0 0-2-2H9", key: "43el77" }]
];
const ImageOff = createLucideIcon("image-off", __iconNode);
function firstImage(images) {
  if (Array.isArray(images) && images.length > 0 && typeof images[0] === "string") {
    return images[0];
  }
  return null;
}
function ProductCard({ product }) {
  const img = firstImage(product.images);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/products/$productId",
      params: { productId: product.id },
      className: "group block overflow-hidden rounded-2xl border border-border bg-card transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square w-full overflow-hidden bg-muted", children: img ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: img,
            alt: product.title,
            loading: "lazy",
            className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageOff, { className: "h-10 w-10" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "line-clamp-2 text-sm font-medium leading-snug min-h-[2.5rem]", children: product.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-base font-bold text-primary", children: formatNaira(product.price_kobo) })
        ] })
      ]
    }
  );
}
export {
  ProductCard as P
};
