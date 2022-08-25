<template>
  <div class="container">
    <h2>Products</h2>

    <div class="alert alert-danger" role="alert" v-if="errors.length !== 0">
      <ul>
        <li v-for="error in errors">
          {{ error }}
        </li>
      </ul>
    </div>
  </div>

  <table class="table table-striped">
    <thead>
    <th>ID</th>
    <th>Title</th>
    <th>Description</th>
    <th>Price</th>
    </thead>

    <tbody>
    <template v-for="product in products">
      <tr>
        <td>
          <router-link :to="{ name: 'products.detail',params: {id: product.id} }" >{{ product.id }}</router-link>
          </td>
        <td>{{ product.title }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.price }}</td>
      </tr>
    </template>
    </tbody>
  </table>
</template>

<script>
import {onMounted} from "vue";
import useProducts from "../../composables/products";

export default {
  name: "ProductsIndex",
  setup() {
    const { errors, products, getProducts } = useProducts()
    console.log(products)
    onMounted(getProducts)
    return {
      errors,
      products,
      getProducts
    }
  }
}
</script>

<style scoped>
#app { height: 100vh }
h2 { margin-top: 14px}
.content-actions { margin: 15px 0; }
ul {margin-bottom: 0;}
</style>