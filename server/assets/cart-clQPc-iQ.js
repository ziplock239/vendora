import { U as jsxRuntimeExports } from "./worker-entry-BYvOMqif.js";
import { a as useAuth, b as useQueryClient, t as toast, s as supabase, L as Link } from "./router-DsUVh2gx.js";
import { j as createLucideIcon, u as useQuery, M as MainLayout, B as Button } from "./main-layout-7G5etEiH.js";
import { u as useMutation } from "./useMutation-DOlS1iZl.js";
import { f as formatNaira } from "./format-DGko91Dw.js";
import { P as Plus, T as Trash2 } from "./trash-2-DiiaJGVf.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./client.server-C-Z9IluY.js";
import "node:crypto";
const __iconNode = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode);
function CartPage() {
  const {
    user
  } = useAuth();
  const qc = useQueryClient();
  const {
    data: items = [],
    isLoading
  } = useQuery({
    queryKey: ["cart", user?.id ?? "anon"],
    enabled: !!user,
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("cart_items").select("id,qty,products(id,title,price_kobo,images,seller_id)").eq("user_id", user.id);
      if (error) throw error;
      return data ?? [];
    }
  });
  const updateQty = useMutation({
    mutationFn: async ({
      id,
      qty
    }) => {
      if (qty < 1) {
        const {
          error
        } = await supabase.from("cart_items").delete().eq("id", id);
        if (error) throw error;
      } else {
        const {
          error
        } = await supabase.from("cart_items").update({
          qty
        }).eq("id", id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      void qc.invalidateQueries({
        queryKey: ["cart"]
      });
      void qc.invalidateQueries({
        queryKey: ["cart-count"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Sign in to view your cart" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-4 inline-block text-primary hover:underline", children: "Sign in" })
    ] }) });
  }
  const total = items.reduce((s, i) => {
    const p = i.products;
    return s + (p?.price_kobo ?? 0) * i.qty;
  }, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-6", children: "Your cart" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 animate-pulse rounded-2xl bg-muted" }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Your cart is empty." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "mt-4 inline-block text-primary hover:underline", children: "Continue shopping" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((item) => {
        const p = item.products;
        if (!p) return null;
        const img = Array.isArray(p.images) && typeof p.images[0] === "string" ? p.images[0] : null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 rounded-2xl border border-border bg-card p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted", children: img && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: p.title, className: "h-full w-full object-cover" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium line-clamp-2", children: p.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-bold", children: formatNaira(p.price_kobo) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "outline", className: "h-8 w-8", onClick: () => updateQty.mutate({
                id: item.id,
                qty: item.qty - 1
              }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-center text-sm font-medium", children: item.qty }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "outline", className: "h-8 w-8", onClick: () => updateQty.mutate({
                id: item.id,
                qty: item.qty + 1
              }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "ml-auto h-8 w-8 text-destructive", onClick: () => updateQty.mutate({
                id: item.id,
                qty: 0
              }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] })
          ] })
        ] }, item.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-fit rounded-2xl border border-border bg-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold mb-4", children: "Order summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatNaira(total) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 border-t border-border pt-4 flex justify-between font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatNaira(total) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", className: "mt-6 block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "w-full", children: "Proceed to checkout" }) })
      ] })
    ] })
  ] }) });
}
export {
  CartPage as component
};
