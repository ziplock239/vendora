import { U as jsxRuntimeExports } from "./worker-entry-BYvOMqif.js";
import { a as useAuth, b as useQueryClient, t as toast, s as supabase, L as Link } from "./router-DsUVh2gx.js";
import { j as createLucideIcon, u as useQuery, M as MainLayout, S as ShieldCheck, B as Button } from "./main-layout-7G5etEiH.js";
import { u as useMutation } from "./useMutation-DOlS1iZl.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./client.server-C-Z9IluY.js";
import "node:crypto";
const __iconNode = [
  ["path", { d: "M10 15H6a4 4 0 0 0-4 4v2", key: "1nfge6" }],
  ["path", { d: "m14.305 16.53.923-.382", key: "1itpsq" }],
  ["path", { d: "m15.228 13.852-.923-.383", key: "eplpkm" }],
  ["path", { d: "m16.852 12.228-.383-.923", key: "13v3q0" }],
  ["path", { d: "m16.852 17.772-.383.924", key: "1i8mnm" }],
  ["path", { d: "m19.148 12.228.383-.923", key: "1q8j1v" }],
  ["path", { d: "m19.53 18.696-.382-.924", key: "vk1qj3" }],
  ["path", { d: "m20.772 13.852.924-.383", key: "n880s0" }],
  ["path", { d: "m20.772 16.148.924.383", key: "1g6xey" }],
  ["circle", { cx: "18", cy: "15", r: "3", key: "gjjjvw" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCog = createLucideIcon("user-cog", __iconNode);
const ROLES = ["admin", "seller", "buyer"];
function AdminUsersPage() {
  const {
    user,
    roles,
    loading
  } = useAuth();
  const isAdmin = roles.includes("admin");
  const qc = useQueryClient();
  const {
    data: rows = [],
    isLoading
  } = useQuery({
    queryKey: ["admin-users"],
    enabled: !!user && isAdmin,
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.rpc("admin_list_users");
      if (error) throw error;
      return data ?? [];
    }
  });
  const setRole = useMutation({
    mutationFn: async ({
      userId,
      role,
      grant
    }) => {
      const {
        error
      } = await supabase.rpc("admin_set_role", {
        _user_id: userId,
        _role: role,
        _grant: grant
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Role updated");
      void qc.invalidateQueries({
        queryKey: ["admin-users"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-5xl px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 animate-pulse rounded-2xl bg-muted" }) }) });
  }
  if (!user || !isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-md px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mx-auto h-12 w-12 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-2xl font-bold", children: "Admins only" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-4 inline-block text-primary hover:underline", children: "Go home" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MainLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-6xl px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(UserCog, { className: "h-6 w-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Users" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Toggle roles to grant or revoke access. Admin role grants full backend access." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/kyc", className: "rounded-full border border-border px-3 py-1 hover:bg-secondary", children: "KYC review" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/users", className: "rounded-full bg-primary px-3 py-1 text-primary-foreground", children: "Users" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 h-64 animate-pulse rounded-2xl bg-muted" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 overflow-hidden rounded-2xl border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "hidden w-full text-sm md:table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50 text-left text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "KYC" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Joined" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-right", children: "Roles" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "p-8 text-center text-muted-foreground", children: "No users yet." }) }),
          rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-medium", children: r.full_name || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground", children: r.email || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground", children: r.phone || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: r.is_verified_seller ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-success/15 px-2 py-0.5 text-xs text-success", children: "Verified" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-xs text-muted-foreground", children: new Date(r.created_at).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-end gap-1", children: ROLES.map((role) => {
              const active = r.roles.includes(role);
              const isSelf = r.id === user.id && role === "admin";
              return /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: active ? "default" : "outline", className: "h-7 px-2 text-xs capitalize", disabled: isSelf || setRole.isPending, title: isSelf ? "You cannot remove your own admin role" : void 0, onClick: () => setRole.mutate({
                userId: r.id,
                role,
                grant: !active
              }), children: role }, role);
            }) }) })
          ] }, r.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border md:hidden", children: [
        rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-8 text-center text-sm text-muted-foreground", children: "No users yet." }),
        rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium truncate", children: r.full_name || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground break-all", children: r.email || "—" })
            ] }),
            r.is_verified_seller && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 rounded-full bg-success/15 px-2 py-0.5 text-[10px] text-success", children: "Verified" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground", children: [
            r.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r.phone }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Joined ",
              new Date(r.created_at).toLocaleDateString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 pt-1", children: ROLES.map((role) => {
            const active = r.roles.includes(role);
            const isSelf = r.id === user.id && role === "admin";
            return /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: active ? "default" : "outline", className: "h-7 px-2 text-xs capitalize", disabled: isSelf || setRole.isPending, title: isSelf ? "You cannot remove your own admin role" : void 0, onClick: () => setRole.mutate({
              userId: r.id,
              role,
              grant: !active
            }), children: role }, role);
          }) })
        ] }, r.id))
      ] })
    ] })
  ] }) });
}
export {
  AdminUsersPage as component
};
