import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BYvOMqif.js";
import { a as useAuth, u as useNavigate, L as Link, t as toast, s as supabase } from "./router-DsUVh2gx.js";
import { u as useQuery, M as MainLayout, I as Input, B as Button } from "./main-layout-7G5etEiH.js";
import { u as useServerFn, i as initializePayment } from "./paystack.functions-CH_r8KcC.js";
import { L as Label } from "./label-DDdJyDtI.js";
import { T as Textarea } from "./textarea-DcDREXsv.js";
import { f as formatNaira } from "./format-DGko91Dw.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./client.server-C-Z9IluY.js";
import "node:crypto";
import "./auth-middleware-qVY3JGnT.js";
function CheckoutPage() {
  const {
    user
  } = useAuth();
  useNavigate();
  const initFn = useServerFn(initializePayment);
  const [address, setAddress] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const {
    data: items = [],
    isLoading
  } = useQuery({
    queryKey: ["checkout-cart", user?.id ?? "anon"],
    enabled: !!user,
    queryFn: async () => {
      const {
        data
      } = await supabase.from("cart_items").select("id,qty,products(id,title,price_kobo,images)").eq("user_id", user.id);
      return data ?? [];
    }
  });
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-md px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Sign in to check out" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-4 inline-block text-primary hover:underline", children: "Sign in" })
    ] }) });
  }
  const total = items.reduce((s, i) => {
    const p = i.products;
    return s + (p?.price_kobo ?? 0) * i.qty;
  }, 0);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return toast.error("Your cart is empty.");
    setSubmitting(true);
    try {
      const callbackUrl = `${window.location.origin}/checkout/callback`;
      const {
        authorizationUrl
      } = await initFn({
        data: {
          deliveryAddress: address,
          deliveryPhone: phone,
          callbackUrl
        }
      });
      window.location.href = authorizationUrl;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not start payment");
      setSubmitting(false);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-3xl px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 animate-pulse rounded-2xl bg-muted" }) }) });
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-md px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Your cart is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "mt-4 inline-block text-primary hover:underline", children: "Browse products" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto grid max-w-5xl gap-8 px-4 py-10 lg:grid-cols-[1fr_360px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-6 rounded-2xl border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Delivery details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "phone", type: "tel", required: true, placeholder: "+234...", value: phone, onChange: (e) => setPhone(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "address", children: "Delivery address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "address", required: true, rows: 3, placeholder: "Street, city, state", value: address, onChange: (e) => setAddress(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "lg", className: "w-full", disabled: submitting, children: submitting ? "Redirecting to Paystack…" : `Pay ${formatNaira(total)} with Paystack` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: "You'll be redirected to Paystack to complete your payment securely." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-fit rounded-2xl border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold mb-4", children: "Order summary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((it) => {
        const p = it.products;
        if (!p) return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "line-clamp-1", children: [
            p.title,
            " × ",
            it.qty
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatNaira(p.price_kobo * it.qty) })
        ] }, it.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 border-t border-border pt-4 flex justify-between font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatNaira(total) })
      ] })
    ] })
  ] }) });
}
export {
  CheckoutPage as component
};
