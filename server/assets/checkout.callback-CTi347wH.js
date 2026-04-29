import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BYvOMqif.js";
import { d as Route, u as useNavigate, b as useQueryClient, L as Link } from "./router-DsUVh2gx.js";
import { u as useServerFn, v as verifyPayment } from "./paystack.functions-CH_r8KcC.js";
import { j as createLucideIcon, M as MainLayout, B as Button } from "./main-layout-7G5etEiH.js";
import { C as CircleCheck, a as CircleX } from "./circle-x-D6erv5qL.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./client.server-C-Z9IluY.js";
import "node:crypto";
import "./auth-middleware-qVY3JGnT.js";
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
function CallbackPage() {
  const {
    reference,
    trxref
  } = Route.useSearch();
  const ref = reference ?? trxref;
  const verifyFn = useServerFn(verifyPayment);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [state, setState] = reactExports.useState("verifying");
  const [orderId, setOrderId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!ref) {
      setState("failed");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await verifyFn({
          data: {
            reference: ref
          }
        });
        if (cancelled) return;
        setOrderId(res.orderId ?? null);
        setState(res.success ? "success" : "failed");
        void qc.invalidateQueries({
          queryKey: ["cart"]
        });
        void qc.invalidateQueries({
          queryKey: ["cart-count"]
        });
      } catch {
        if (!cancelled) setState("failed");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ref, verifyFn, qc]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-md px-4 py-20 text-center", children: [
    state === "verifying" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto h-14 w-14 animate-spin text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-2xl font-bold", children: "Verifying your payment…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Hang tight, this only takes a moment." })
    ] }),
    state === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-14 w-14 text-success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-2xl font-bold", children: "Payment successful! 🎉" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Your order has been placed. The seller has been notified." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate({
          to: "/orders"
        }), children: "View my orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "text-sm text-primary hover:underline", children: "Continue shopping" })
      ] }),
      orderId && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-xs text-muted-foreground", children: [
        "Order ID: ",
        orderId.slice(0, 8),
        "…"
      ] })
    ] }),
    state === "failed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "mx-auto h-14 w-14 text-destructive" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-2xl font-bold", children: "Payment not completed" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "We couldn't confirm your payment. Your cart is still saved." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-col gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate({
        to: "/cart"
      }), children: "Back to cart" }) })
    ] })
  ] }) });
}
export {
  CallbackPage as component
};
