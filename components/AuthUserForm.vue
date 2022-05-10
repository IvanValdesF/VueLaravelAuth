<template>
  <form @submit.prevent="updateUser">
    <BaseInput
      type="text"
      label="Name"
      name="name"
      v-model="name"
      class="mb-2"
    />
    <BaseInput
      type="email"
      label="Email"
      name="email"
      v-model="email"
      autocomplete="email"
      placeholder="luke@jedi.com"
      class="mb-4"
    />
    <BaseBtn type="submit" text="Update" />
    <FlashMessage :message="message" :error="error" />
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import { getError } from "@/utils/helpers";
import BaseBtn from "@/components/BaseBtn";
import BaseInput from "@/components/BaseInput";
import AuthService from "@/services/AuthService";
import FlashMessage from "@/components/FlashMessage";

export default {
  name: "AuthUserForm",
  middleware:'auth',
  components: {
    BaseBtn,
    BaseInput,
    FlashMessage,
  },
  data() {
    return {
      name: null,
      email: null,
      error: null,
      message: null,
    };
  },
  computed: {
    ...mapGetters("Auth", ["authUser"]),
  },
  methods: {
    updateUser() {
      this.error = null;
      this.message = null;
      const payload = {
        name: this.name,
        email: this.email,
      };
      AuthService.updateUser(payload)
        .then(() => this.$store.dispatch("Auth/getAuthUser"))
        .then(() => (this.message = "User updated."))
        .catch((error) => (this.error = getError(error)));
    },
    async getUser(){
      const res = await this.$store.dispatch("Auth/getAuthUser");
      console.log(res)
      this.name = res.name;
      this.email = res.email;
    }
  },
  
  mounted() {
    this.getUser()
    
  },
};
</script>
