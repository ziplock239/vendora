import { $ as TSS_SERVER_FUNCTION, a0 as createServerFn } from "./worker-entry-BYvOMqif.js";
import { o as objectType, s as stringType, r as requireSupabaseAuth } from "./auth-middleware-qVY3JGnT.js";
import { s as supabaseAdmin } from "./client.server-C-Z9IluY.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const InitInput = objectType({
  deliveryAddress: stringType().min(5).max(500),
  deliveryPhone: stringType().min(7).max(20),
  callbackUrl: stringType().url()
});
const initializePayment_createServerFn_handler = createServerRpc({
  id: "5a1dfc4d21b97a1048b739925b4dee5a019b27b884f10a9e3adb076e26bf7577",
  name: "initializePayment",
  filename: "src/server/paystack.functions.ts"
}, (opts) => initializePayment.__executeServer(opts));
const initializePayment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => InitInput.parse(input)).handler(initializePayment_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Paystack is not configured. Please contact support.");
  }
  const {
    data: cartItems,
    error: cartErr
  } = await supabase.from("cart_items").select("qty,products(id,title,price_kobo,seller_id,status)").eq("user_id", userId);
  if (cartErr) throw new Error(cartErr.message);
  if (!cartItems || cartItems.length === 0) {
    throw new Error("Your cart is empty.");
  }
  const lines = cartItems;
  let totalKobo = 0;
  let commissionKobo = 0;
  const orderItems = [];
  const sellerIds = Array.from(new Set(lines.map((l) => l.products?.seller_id).filter(Boolean)));
  const graceByseller = /* @__PURE__ */ new Map();
  if (sellerIds.length > 0) {
    const {
      data: roleRows
    } = await supabaseAdmin.from("user_roles").select("user_id,created_at").eq("role", "seller").in("user_id", sellerIds);
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1e3;
    const now = Date.now();
    for (const sid of sellerIds) {
      const row = roleRows?.find((r) => r.user_id === sid);
      const startedAt = row?.created_at ? new Date(row.created_at).getTime() : now;
      graceByseller.set(sid, now - startedAt < THIRTY_DAYS);
    }
  }
  for (const line of lines) {
    const p = line.products;
    if (!p || p.status !== "active") {
      throw new Error(`A product in your cart is no longer available.`);
    }
    const lineGross = p.price_kobo * line.qty;
    const inGrace = graceByseller.get(p.seller_id) ?? false;
    const sellerEarn = inGrace ? lineGross : Math.round(lineGross * 0.8);
    totalKobo += lineGross;
    commissionKobo += lineGross - sellerEarn;
    orderItems.push({
      product_id: p.id,
      seller_id: p.seller_id,
      qty: line.qty,
      unit_price_kobo: p.price_kobo,
      seller_earnings_kobo: sellerEarn,
      title: p.title
    });
  }
  const {
    data: userResp
  } = await supabaseAdmin.auth.admin.getUserById(userId);
  const email = userResp.user?.email;
  if (!email) throw new Error("Could not load your email.");
  const reference = `vendora_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  const {
    data: order,
    error: orderErr
  } = await supabaseAdmin.from("orders").insert({
    buyer_id: userId,
    total_kobo: totalKobo,
    commission_kobo: commissionKobo,
    delivery_address: data.deliveryAddress,
    delivery_phone: data.deliveryPhone,
    paystack_ref: reference,
    status: "pending"
  }).select("id").single();
  if (orderErr) throw new Error(orderErr.message);
  const itemsToInsert = orderItems.map((it) => ({
    ...it,
    order_id: order.id
  }));
  const {
    error: itemsErr
  } = await supabaseAdmin.from("order_items").insert(itemsToInsert);
  if (itemsErr) throw new Error(itemsErr.message);
  const paystackResp = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      amount: totalKobo,
      reference,
      callback_url: data.callbackUrl,
      metadata: {
        order_id: order.id,
        user_id: userId
      }
    })
  });
  const paystackJson = await paystackResp.json();
  if (!paystackResp.ok || !paystackJson.status || !paystackJson.data) {
    throw new Error(paystackJson.message || "Could not initialize payment.");
  }
  return {
    authorizationUrl: paystackJson.data.authorization_url,
    reference,
    orderId: order.id
  };
});
const VerifyInput = objectType({
  reference: stringType().min(1).max(200)
});
const verifyPayment_createServerFn_handler = createServerRpc({
  id: "15a7a42012cba1368b9d5f93c54163506e35c688cadabf6086dc771bf7c5ad5d",
  name: "verifyPayment",
  filename: "src/server/paystack.functions.ts"
}, (opts) => verifyPayment.__executeServer(opts));
const verifyPayment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => VerifyInput.parse(input)).handler(verifyPayment_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) throw new Error("Paystack is not configured.");
  const resp = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(data.reference)}`, {
    headers: {
      Authorization: `Bearer ${secretKey}`
    }
  });
  const json = await resp.json();
  if (!resp.ok || !json.status || !json.data) {
    return {
      success: false,
      status: "failed",
      message: json.message
    };
  }
  const {
    data: order
  } = await supabaseAdmin.from("orders").select("id,buyer_id,status,total_kobo").eq("paystack_ref", data.reference).maybeSingle();
  if (!order || order.buyer_id !== userId) {
    throw new Error("Order not found.");
  }
  const paid = json.data.status === "success" && json.data.amount === order.total_kobo;
  if (paid && order.status !== "paid") {
    await supabaseAdmin.from("orders").update({
      status: "paid"
    }).eq("id", order.id);
    const paymentInsert = {
      order_id: order.id,
      paystack_ref: data.reference,
      amount_kobo: json.data.amount,
      status: "success",
      raw_event: JSON.parse(JSON.stringify(json)),
      verified_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    await supabaseAdmin.from("payments").insert(paymentInsert);
    await supabaseAdmin.from("cart_items").delete().eq("user_id", userId);
  } else if (!paid && order.status === "pending") {
    await supabaseAdmin.from("orders").update({
      status: "failed"
    }).eq("id", order.id);
  }
  return {
    success: paid,
    status: paid ? "paid" : "failed",
    orderId: order.id
  };
});
export {
  initializePayment_createServerFn_handler,
  verifyPayment_createServerFn_handler
};
