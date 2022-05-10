<template>

  <form @submit.prevent="login">
    <h2 class="mb-4 text-xl font-bold text-center">Login</h2>
    <BaseInput
      type="email"
      label="Email"
      name="email"
      v-model="email"
      autocomplete="email"
      placeholder="luke@jedi.com"
      class="mb-2"
    />
    <BaseInput
      type="password"
      label="Password"
      name="password"
      v-model="password"
      class="mb-4"
    />
    <div class="flex flex-wrap justify-between">
      <BaseBtn type="submit" text="Login" />
      <router-link
        to="/register"
        class="bg-transparent hover:bg-blue-500 text-xs w-full mt-2 text-center text-blue-700 font-semibold hover:text-white py-2.5 px-4 border border-blue-500 hover:border-transparent rounded"
        >Register</router-link
      >
      <router-link to="/forgot-password" class="text-sm mt-1 base-link">
        Forgot your password?
      </router-link>
    </div>
    <FlashMessage :error="error" />
  </form>
</template>

<script>
import { getError } from "@/utils/helpers";
import BaseBtn from "@/components/BaseBtn";
import BaseInput from "@/components/BaseInput";
import AuthService from "@/services/AuthService";
import FlashMessage from "@/components/FlashMessage";

export default {
  name: "LoginView",
  components: {
    BaseBtn,
    BaseInput,
    FlashMessage,
  },
  data() {
    return {
      email: null,
      password: null,
      error: null,
    };
  },
  methods: {
    async login() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      this.error = null;
      try {
        const res = await AuthService.login(payload);
        console.log(res.data)
        const authUser = await this.$store.dispatch('Auth/getAuthUser');
        if (authUser) {
          this.$store.dispatch("Auth/setGuest", { value: "isNotGuest" });
          this.$router.push({path:"/dashboard"});
        } else {
          const error = Error(
            "Unable to fetch user after login, check your API settings."
          );
          error.name = "Fetch User";
          throw error;
        }
      } catch (error) {
        this.error = getError(error);
      }
    },
  },
};
</script>
