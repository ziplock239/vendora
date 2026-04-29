import { U as jsxRuntimeExports } from "./worker-entry-BYvOMqif.js";
import { R as Route, L as Link, s as supabase } from "./router-DsUVh2gx.js";
import { u as useQuery, M as MainLayout } from "./main-layout-7G5etEiH.js";
import { P as ProductCard } from "./product-card-Hq_ANSOs.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./client.server-C-Z9IluY.js";
import "node:crypto";
import "./format-DGko91Dw.js";
function ProductsPage() {
  const {
    q,
    category
  } = Route.useSearch();
  const {
    data: products = [],
    isLoading
  } = useQuery({
    queryKey: ["products", {
      q,
      category
    }],
    queryFn: async () => {
      let query = supabase.from("products").select("id,title,price_kobo,images,category_id,categories(slug)").eq("status", "active").order("created_at", {
        ascending: false
      }).limit(60);
      if (q) query = query.ilike("title", `%${q}%`);
      const {
        data,
        error
      } = await query;
      if (error) throw error;
      let rows = data ?? [];
      if (category) {
        rows = rows.filter((r) => r.categories?.slug === category);
      }
      return rows;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-6", children: q ? `Search results for "${q}"` : category ? `Category: ${category}` : "All products" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5", children: Array.from({
      length: 10
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square animate-pulse rounded-2xl bg-muted" }, i)) }) : products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No products found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-4 inline-block text-primary hover:underline", children: "Back to home" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5", children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) })
  ] }) });
}
export {
  ProductsPage as component
};
