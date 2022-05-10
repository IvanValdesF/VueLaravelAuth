<template>
  <div class="grow shrink basis-auto">
    <div class="bg-gray-900">
      <nav
        class="
          container
          px-6
          py-4
          mx-auto
          md:flex md:justify-between md:items-center
        "
      >
        <div class="flex items-center justify-between">
          <router-link
            to="/"
            class="
              text-xl
              font-bold
              text-gray-200
              md:text-2xl
              hover:text-blue-400
            "
            >Logo
          </router-link>
          <!-- Mobile menu button -->
          <div @click="showMenu = !showMenu" class="flex md:hidden">
            <button
              type="button"
              class="
                text-gray-200
                hover:text-gray-400
                focus:outline-none focus:text-gray-400
              "
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>


        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <ul
          :class="showMenu ? 'flex' : 'hidden'"
          class="
            flex-col
            mt-8
            space-y-4
            md:flex
            md:space-y-0
            md:flex-row
            md:items-center
            md:space-x-10
            md:mt-0
          "
        >
        <router-link v-if="authUser" class="text-sm font-bold text-gray-200 hover:text-blue-400" to="/dashboard">
          Dashboard
        </router-link>
        <router-link to="/users" v-if="isAdmin">Users</router-link>
          <router-link to="home" class="text-sm font-bold text-gray-200 hover:text-blue-400">
            Home
          </router-link>
          <router-link to="about" class="text-sm font-bold text-gray-200 hover:text-blue-400">
            About
          </router-link>
          <router-link to="contact" class="text-sm font-bold text-gray-200 hover:text-blue-400">
            Contact Us
          </router-link>

          <router-link v-if="authUser" class="text-sm font-bold text-gray-200 hover:text-blue-400" to="/user">{{ authUser.name }}</router-link>
          <Logout v-if="authUser" />

        <router-link
        v-else
        to="/login"
        class="inline-flex items-center space-x-2 text-sm font-bold text-gray-200 hover:text-blue-400"
      >
        <span>Login <i class="pi pi-sign-in align-middle"></i></span>
        
      </router-link>

        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logout from "@/components/Logout";
import HomeIcon from "@/components/icons/HomeIcon";
import LoginIcon from "@/components/icons/LoginIcon";

export default {
  data() {
    return {
      showMenu: false,
    };
  },
  name: "Header",
  components: {
    Logout,
    HomeIcon,
    LoginIcon,
  },
  
  computed: {
    ...mapGetters("Auth", ["authUser", "isAdmin"]),
  },
};
</script>

<!--<template>
  <header class="p-5 text-white bg-blue-400">
    <nav class="container flex items-center justify-between mx-auto">
      <div v-if="authUser" class="flex items-center space-x-5">
        
      </div>
      <router-link to="/" v-else>
        <HomeIcon class="w-6 h-6 text-white" />
      </router-link>
      <div class="inline-flex items-center space-x-5" v-if="authUser">
        
      </div>
      
    </nav>
  </header>
</template>--!>