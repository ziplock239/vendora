import { U as jsxRuntimeExports } from "./worker-entry-BYvOMqif.js";
import { a as useAuth, L as Link, s as supabase } from "./router-DsUVh2gx.js";
import { u as useQuery, M as MainLayout } from "./main-layout-7G5etEiH.js";
import { f as formatNaira } from "./format-DGko91Dw.js";
import { P as Package } from "./package-uG-r13Pq.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./client.server-C-Z9IluY.js";
import "node:crypto";
function OrdersPage() {
  const {
    user
  } = useAuth();
  const {
    data: orders = [],
    isLoading
  } = useQuery({
    queryKey: ["my-orders", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("orders").select("id,total_kobo,status,created_at,delivery_address,order_items(qty,title,unit_price_kobo)").eq("buyer_id", user.id).order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data ?? [];
    }
  });
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-md px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Sign in to view your orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-4 inline-block text-primary hover:underline", children: "Sign in" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-4xl px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "My orders" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 h-64 animate-pulse rounded-2xl bg-muted" }) : orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-dashed border-border bg-card p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "You haven't placed any orders yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "mt-4 inline-block text-primary hover:underline", children: "Start shopping" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-3", children: orders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(o.created_at).toLocaleString("en-NG") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold", children: [
            "Order #",
            o.id.slice(0, 8)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-3 py-1 text-xs font-medium capitalize ${o.status === "paid" || o.status === "fulfilled" ? "bg-success/15 text-success" : o.status === "failed" ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning-foreground"}`, children: o.status })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1 text-sm text-muted-foreground", children: (o.order_items ?? []).map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          it.title,
          " × ",
          it.qty
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatNaira(it.unit_price_kobo * it.qty) })
      ] }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex justify-between border-t border-border pt-3 font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatNaira(o.total_kobo) })
      ] })
    ] }, o.id)) })
  ] }) });
}
export {
  OrdersPage as component
};
