<template>
  <div class="d-flex flex-nowrap">
    <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style="width: 280px;">
      <span class="fs-4">Web Shop</span>
      <hr>
      <ul class="nav nav-pills flex-column mb-auto">
        <li  v-if="tokenExists()" class="nav-item">
          <router-link :to="{ name: 'orders.index' }" class="nav-link text-white">My orders</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'products.index' }" class="nav-link text-white">Products</router-link>
        </li>
        <li v-if="!tokenExists()" class="nav-item">
          <router-link :to="{ name: 'login' }" class="nav-link text-white">Login</router-link>
        </li>
        <li v-if="tokenExists()" class="nav-item">
          <a href="#" @click.prevent="logout" class="nav-link text-white">Logout</a>
        </li>
        <li  class="nav-item">
          <router-link :to="{ name: 'registration' }" class="nav-link text-white">Registration</router-link>
        </li>
      </ul>
    </div>
  </div>

  <div class="container">
    <router-view/>
  </div>

</template>


<script>
import useLogin from "./composables/auth";

export default {
  name: "BaseComponent",
  components: {},
  setup() {
    const {isLogin, logoutUser} = useLogin()
    const tokenExists = () => {
      return isLogin();
    }

    const logout = () => {
      return logoutUser();
    }

    return {
      tokenExists,
      logout
    }
  }
}
</script>

<style>
#app {height: 100vh}
h2 { margin-top: 14px}
.content-actions {margin: 15px 0; }
ul{margin-top: 0;}
</style>