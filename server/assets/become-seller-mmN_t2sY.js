import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BYvOMqif.js";
import { a as useAuth, u as useNavigate, b as useQueryClient, L as Link, t as toast, s as supabase } from "./router-DsUVh2gx.js";
import { j as createLucideIcon, u as useQuery, M as MainLayout, B as Button, S as ShieldCheck, I as Input } from "./main-layout-7G5etEiH.js";
import { L as Label } from "./label-DDdJyDtI.js";
import { T as Textarea } from "./textarea-DcDREXsv.js";
import { C as CircleCheck, a as CircleX } from "./circle-x-D6erv5qL.js";
import { U as Upload } from "./upload-C99Ciid9.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./client.server-C-Z9IluY.js";
import "node:crypto";
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
];
const Clock = createLucideIcon("clock", __iconNode);
function BecomeSellerPage() {
  const {
    user,
    refreshRoles
  } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [fullName, setFullName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [nin, setNin] = reactExports.useState("");
  const [address, setAddress] = reactExports.useState("");
  const [ninFile, setNinFile] = reactExports.useState(null);
  const [selfieFile, setSelfieFile] = reactExports.useState(null);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const {
    data: existing,
    isLoading
  } = useQuery({
    queryKey: ["my-kyc", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const {
        data
      } = await supabase.from("kyc_verifications").select("status,rejection_reason,full_name,phone,nin_number,address").eq("user_id", user.id).maybeSingle();
      return data;
    }
  });
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-md px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Sign in to become a seller" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-4 inline-block text-primary hover:underline", children: "Sign in" })
    ] }) });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-2xl px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 animate-pulse rounded-2xl bg-muted" }) }) });
  }
  if (existing) {
    const status = existing.status;
    const Icon = status === "approved" ? CircleCheck : status === "rejected" ? CircleX : Clock;
    const color = status === "approved" ? "text-success" : status === "rejected" ? "text-destructive" : "text-warning";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-2xl px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-card p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `mx-auto h-14 w-14 ${color}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 text-2xl font-bold capitalize", children: [
        "KYC ",
        status
      ] }),
      status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Your application is under review. You'll get seller access as soon as it's approved (usually within 24 hours)." }),
      status === "approved" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "You're a verified seller. Head to your dashboard to start listing." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "mt-4 inline-block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Go to dashboard" }) })
      ] }),
      status === "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: existing.rejection_reason ?? "Please contact support." }) })
    ] }) }) });
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!ninFile || !selfieFile) {
      return toast.error("Please upload both your NIN photo and a selfie.");
    }
    setSubmitting(true);
    try {
      const ninPath = `${user.id}/nin-${Date.now()}-${ninFile.name}`;
      const selfiePath = `${user.id}/selfie-${Date.now()}-${selfieFile.name}`;
      const [{
        error: ninErr
      }, {
        error: selfieErr
      }] = await Promise.all([supabase.storage.from("kyc_uploads").upload(ninPath, ninFile, {
        upsert: false
      }), supabase.storage.from("kyc_uploads").upload(selfiePath, selfieFile, {
        upsert: false
      })]);
      if (ninErr) throw ninErr;
      if (selfieErr) throw selfieErr;
      const {
        error
      } = await supabase.from("kyc_verifications").insert({
        user_id: user.id,
        full_name: fullName,
        phone,
        nin_number: nin,
        address,
        nin_image_path: ninPath,
        selfie_path: selfiePath
      });
      if (error) throw error;
      await supabase.from("profiles").update({
        phone,
        full_name: fullName
      }).eq("id", user.id);
      toast.success("KYC submitted! We'll review and get back to you shortly.");
      await refreshRoles();
      void qc.invalidateQueries({
        queryKey: ["my-kyc"]
      });
      navigate({
        to: "/become-seller"
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-2xl px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-8 w-8 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Seller verification (KYC)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "We verify all sellers to keep Vendora safe. Documents are private." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-5 rounded-2xl border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fullName", children: "Full legal name (as on NIN)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "fullName", required: true, value: fullName, onChange: (e) => setFullName(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "phone", type: "tel", required: true, placeholder: "+234...", value: phone, onChange: (e) => setPhone(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nin", children: "NIN number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "nin", required: true, pattern: "[0-9]{11}", maxLength: 11, placeholder: "11-digit NIN", value: nin, onChange: (e) => setNin(e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "address", children: "Home address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "address", required: true, value: address, onChange: (e) => setAddress(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileField, { label: "NIN photo", file: ninFile, onChange: setNinFile }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileField, { label: "Selfie holding NIN", file: selfieFile, onChange: setSelfieFile })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", size: "lg", disabled: submitting, children: submitting ? "Submitting…" : "Submit for review" })
    ] })
  ] }) });
}
function FileField({
  label,
  file,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 p-4 text-center transition hover:border-primary", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: file ? file.name : "Click to upload (JPG/PNG)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => onChange(e.target.files?.[0] ?? null) })
  ] });
}
export {
  BecomeSellerPage as component
};
