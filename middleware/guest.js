export default function guest({ next, store }) {
  const storageItem = window.localStorage.getItem("guest");
  if (storageItem === "isNotGuest" && !store.getters["Auth/authUser"]) {
    store.dispatch("Auth/getAuthUser").then(() => {
      if (store.getters["Auth/authUser"]) {
        next({ name: "dashboard" });
      } else {
        store.dispatch("Auth/setGuest", { value: "isGuest" });
        next();
      }
    });
  } else {
    next();
  }
}
