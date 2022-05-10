<template >
  <div class="max-w-sm w-screen items-center p-5 
  m-auto  flex justify-center">
    
    <LoginForm class="p-5 bg-white border rounded shadow" />
    
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";

export default {
  name: "LoginView",
  components: {
    LoginForm,
  },
};
</script>
