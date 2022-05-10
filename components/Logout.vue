<template>
  <button
    type="button"
    @click="logout"
    class="inline-flex items-center space-x-2 "
  >
    <span class="text-sm font-bold text-gray-200 hover:text-blue-400 sm:inline ">Logout  <i class="pi pi-sign-out align-middle"></i></span>
  </button>
</template>

<script>
import LogoutIcon from "@/components/icons/LogoutIcon";
export default {
  components: { LogoutIcon },
  name: "Logout",
  methods: {
    logout() {
      this.$store.dispatch("Auth/logout");
    },
  },
};
</script>
