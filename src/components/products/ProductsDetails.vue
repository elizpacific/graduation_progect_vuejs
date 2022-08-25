<template>
  <div class="container">
    <h2>Product details</h2>
  </div>

  <table class="table table-striped">
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><b>ID:</b> {{ product.id }}</li>
      <li class="list-group-item"><b>Title:</b> {{ product.title }}</li>
      <li class="list-group-item"><b>Description:</b> {{ product.description }}</li>
      <li class="list-group-item"><b>Price:</b> {{ product.price }}</li>
    </ul>
    <li v-if="tokenExists()" class="nav-item">
      <router-link :to="{ name: 'orders.create' }" class="nav-link text-black">Buy Product</router-link>
    </li>
    <li  v-if="!tokenExists()" class="nav-item">
      <router-link :to="{ name: 'login' }" class="nav-link text-black">Login</router-link>
    </li>
  </table>
</template>

<script>

import { onMounted } from 'vue'
import useProducts from "../../composables/products";
import useLogin from "../../composables/auth";
export default {
  name: "ProductsDetails",
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const { errors, product, getProduct } = useProducts()
    const {isLogin} = useLogin()
    onMounted(getProduct(props.id))

    const tokenExists = () => {
      return isLogin();
    }

    return {
      errors,
      product,
      getProduct,
      tokenExists
    }
  }
}
</script>

<style scoped>
</style>