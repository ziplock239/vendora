import { M as useRouter, r as reactExports, b as isRedirect, $ as TSS_SERVER_FUNCTION, a1 as getServerFnById, a0 as createServerFn } from "./worker-entry-BYvOMqif.js";
import { r as requireSupabaseAuth, o as objectType, s as stringType } from "./auth-middleware-qVY3JGnT.js";
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
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
const initializePayment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => InitInput.parse(input)).handler(createSsrRpc("5a1dfc4d21b97a1048b739925b4dee5a019b27b884f10a9e3adb076e26bf7577"));
const VerifyInput = objectType({
  reference: stringType().min(1).max(200)
});
const verifyPayment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => VerifyInput.parse(input)).handler(createSsrRpc("15a7a42012cba1368b9d5f93c54163506e35c688cadabf6086dc771bf7c5ad5d"));
export {
  initializePayment as i,
  useServerFn as u,
  verifyPayment as v
};
