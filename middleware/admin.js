export default function admin({ next, store }) {
  if (store.getters["Auth/isAdmin"]) next();
  else next({ name: "notFound" });
}
