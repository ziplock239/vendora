import { U as jsxRuntimeExports } from "./worker-entry-BYvOMqif.js";
import { a as useAuth, u as useNavigate, b as useQueryClient, L as Link, t as toast, s as supabase } from "./router-DsUVh2gx.js";
import { j as createLucideIcon, u as useQuery, M as MainLayout, B as Button } from "./main-layout-7G5etEiH.js";
import { u as useMutation } from "./useMutation-DOlS1iZl.js";
import { f as formatNaira } from "./format-DGko91Dw.js";
import { P as Plus, T as Trash2 } from "./trash-2-DiiaJGVf.js";
import { P as Package } from "./package-uG-r13Pq.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./client.server-C-Z9IluY.js";
import "node:crypto";
const __iconNode$3 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }],
  ["path", { d: "M3.103 6.034h17.794", key: "awc11p" }],
  [
    "path",
    {
      d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
      key: "o988cm"
    }
  ]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
];
const SquarePen = createLucideIcon("square-pen", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function DashboardPage() {
  const {
    user,
    isVerifiedSeller,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const {
    data: stats
  } = useQuery({
    queryKey: ["seller-stats", user?.id],
    enabled: !!user && isVerifiedSeller,
    queryFn: async () => {
      const [{
        data: items
      }, {
        data: products2
      }] = await Promise.all([supabase.from("order_items").select("qty,unit_price_kobo,seller_earnings_kobo,orders!inner(status)").eq("seller_id", user.id), supabase.from("products").select("id").eq("seller_id", user.id)]);
      const paidItems = (items ?? []).filter((i) => i.orders?.status === "paid" || i.orders?.status === "fulfilled");
      const sales = paidItems.reduce((s, i) => s + i.qty, 0);
      const gross = paidItems.reduce((s, i) => s + i.unit_price_kobo * i.qty, 0);
      const net = paidItems.reduce((s, i) => s + i.seller_earnings_kobo, 0);
      return {
        sales,
        gross,
        net,
        productCount: products2?.length ?? 0
      };
    }
  });
  const {
    data: products = []
  } = useQuery({
    queryKey: ["my-products", user?.id],
    enabled: !!user && isVerifiedSeller,
    queryFn: async () => {
      const {
        data
      } = await supabase.from("products").select("id,title,price_kobo,status,images,view_count,created_at").eq("seller_id", user.id).order("created_at", {
        ascending: false
      });
      return data ?? [];
    }
  });
  const deleteProduct = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Product deleted");
      void qc.invalidateQueries({
        queryKey: ["my-products"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-5xl px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 animate-pulse rounded-2xl bg-muted" }) }) });
  }
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-md px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Sign in required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-4 inline-block text-primary hover:underline", children: "Sign in" })
    ] }) });
  }
  if (!isVerifiedSeller) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-md px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Become a verified seller first" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Submit your KYC to unlock the seller dashboard." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-4", onClick: () => navigate({
        to: "/become-seller"
      }), children: "Start KYC" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-6xl px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Seller dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage your products and track earnings." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => navigate({
        to: "/dashboard/products/new"
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
        " New product"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: ShoppingBag, label: "Total sales", value: String(stats?.sales ?? 0) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: TrendingUp, label: "Gross revenue", value: formatNaira(stats?.gross ?? 0) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: DollarSign, label: "Net earnings (after 20%)", value: formatNaira(stats?.net ?? 0), accent: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Package, label: "Active products", value: String(stats?.productCount ?? 0) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: "Your products" }),
      products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-2xl border border-dashed border-border bg-card p-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No products yet. Add your first listing." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-4", onClick: () => navigate({
          to: "/dashboard/products/new"
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
          " New product"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 overflow-hidden rounded-2xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50 text-left text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Product" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Views" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: products.map((p) => {
          const img = Array.isArray(p.images) && typeof p.images[0] === "string" ? p.images[0] : null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-muted", children: img && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: "", className: "h-full w-full object-cover" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium line-clamp-1", children: p.title })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: formatNaira(p.price_kobo) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground", children: p.view_count }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-xs ${p.status === "active" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`, children: p.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$productId", params: {
                productId: p.id
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 text-destructive", onClick: () => {
                if (confirm(`Delete "${p.title}"?`)) deleteProduct.mutate(p.id);
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] }) })
          ] }, p.id);
        }) })
      ] }) })
    ] })
  ] }) });
}
function StatCard({
  icon: Icon,
  label,
  value,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border border-border bg-card p-5 ${accent ? "ring-1 ring-primary/20" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${accent ? "text-primary" : "text-muted-foreground"}` }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs uppercase tracking-wide text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-1 text-2xl font-bold ${accent ? "text-primary" : ""}`, children: value })
  ] });
}
export {
  DashboardPage as component
};
