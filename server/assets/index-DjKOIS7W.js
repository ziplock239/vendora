import { U as jsxRuntimeExports } from "./worker-entry-BYvOMqif.js";
import { L as Link, h as heroImg, s as supabase } from "./router-DsUVh2gx.js";
import { j as createLucideIcon, u as useQuery, M as MainLayout, B as Button, S as ShieldCheck } from "./main-layout-7G5etEiH.js";
import { P as ProductCard } from "./product-card-Hq_ANSOs.js";
import { A as ArrowRight } from "./arrow-right-BTBsez5a.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./client.server-C-Z9IluY.js";
import "node:crypto";
import "./format-DGko91Dw.js";
const __iconNode$2 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$1);
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
function HomePage() {
  const {
    data: categories = []
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const {
        data
      } = await supabase.from("categories").select("id,slug,name,icon").order("sort_order");
      return data ?? [];
    }
  });
  const {
    data: featured = []
  } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const {
        data
      } = await supabase.from("products").select("id,title,price_kobo,images").eq("status", "active").order("created_at", {
        ascending: false
      }).limit(10);
      return data ?? [];
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MainLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden", style: {
      background: "var(--gradient-hero)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto grid items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-primary-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
          " Nigeria's modern marketplace"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl", children: "Shop smart. Sell anywhere. Get paid securely." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xl text-base text-white/85 md:text-lg", children: "Discover great deals from verified sellers across Nigeria — from the latest phones to fresh fashion finds. Pay safely with Paystack." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", variant: "secondary", className: "gap-2", children: [
            "Start shopping ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/become-seller", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", className: "gap-2 border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white", children: "Become a seller" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative hidden md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Vendora marketplace", width: 1536, height: 1024, className: "rounded-3xl object-cover shadow-2xl" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto grid grid-cols-1 gap-6 px-4 py-6 sm:grid-cols-3", children: [{
      icon: ShieldCheck,
      title: "Verified sellers",
      desc: "Every seller passes KYC"
    }, {
      icon: CreditCard,
      title: "Secure Paystack checkout",
      desc: "Safe ₦ payments"
    }, {
      icon: Truck,
      title: "Nationwide delivery",
      desc: "Get items across Nigeria"
    }].map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: f.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: f.desc })
      ] })
    ] }, i)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Shop by category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "text-sm text-primary hover:underline", children: "View all" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10", children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", search: {
        category: c.slug
      }, className: "group flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-4 text-center transition hover:-translate-y-0.5 hover:border-primary hover:shadow-[var(--shadow-card)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl sm:text-2xl", children: c.icon ?? "🛍️" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 line-clamp-2 text-[11px] leading-tight sm:text-xs font-medium break-words", children: c.name })
      ] }, c.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Latest products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", className: "text-sm text-primary hover:underline", children: [
          "See all ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 inline h-3 w-3" })
        ] })
      ] }),
      featured.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card p-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No products listed yet." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          "Be the first —",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/become-seller", className: "text-primary hover:underline", children: "become a seller" }),
          "."
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5", children: featured.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) })
    ] })
  ] });
}
export {
  HomePage as component
};
