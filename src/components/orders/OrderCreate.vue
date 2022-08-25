<template>
  <div class="container">
    <h2>Buy Product</h2>

    <div class="alert alert-danger" role="alert" v-if="errors.length !== 0">
      <ul>
        <li v-for="error in errors">
          {{ error }}
        </li>
      </ul>
    </div>

    <table class="table table-striped">
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><b>Title:</b> {{ product.title }}</li>
        <li class="list-group-item"><b>Description:</b> {{ product.description }}</li>
        <li class="list-group-item"><b>Price:</b> {{ product.price }}</li>
      </ul>
    </table>

    <form v-on:submit.prevent="saveOrder">
      <div class="mb-3">
        <label for="delivery_address" class="form-label">Delivery Address</label>
        <input type="text" class="form-control" name="delivery_address" id="delivery_address" v-model="form.delivery_address" placeholder="Delivery Address">
      </div>
      <div class="mb-3">
        <label for="product_number" class="form-label">Amount of product</label>
        <input type="number" class="form-control" name="product_number" id="product_number" v-model="form.product_number" placeholder="Amount of product">
      </div>
      <div>
        <input type="submit" class="btn btn-success" value="Buy">
      </div>
  </form>
  </div>
</template>

<script>
import {onMounted, reactive} from "vue";
import useOrders from "../../composables/order";
import useProducts from "../../composables/products";
import useLogin from "../../composables/auth";
export default {
  name: "OrdersCreate",
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const { errors, createOrder, user, token, userByToken} = useOrders()
    const {product, getProduct} = useProducts()

    const form = reactive({
      product_id: props.id,
      delivery_address: "",
      product_number: "",
      user_id: null
    })

    const {isLogin, logoutUser} = useLogin()
    const tokenExists = () => {
      return isLogin();
    }

    const logout = () => {
      return logoutUser();
    }


    const data = async () => {
      await getProduct(props.id)
      await userByToken(token)
      console.log(props.id)
      form.user_id = user.value.id
    }

    onMounted(data)

    const saveOrder = async () => {
      await createOrder(form)
    }
    return {
      errors,
      product,
      form,
      saveOrder,
      getProduct,
      user,
      tokenExists,
      logout
    }
  }
}
</script>

<style scoped>
</style>