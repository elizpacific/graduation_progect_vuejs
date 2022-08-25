<template>
  <div class="container">
    <h2>My orders</h2>
  <div>
  <div class="alert alert-danger" role="alert" v-if="errors.length !== 0">
    <ul>
      <li v-for="error in errors">
        {{ error }}
      </li>
    </ul>
  </div>
  </div>
  </div>

  <table class="table table-striped">
    <thead>

    <th>Title</th>
<!--    <th>Description</th>-->
    <th>Price</th>
    <th>Total price</th>
    <th>Amount of product</th>
    <th>Delivery address</th>
    <th>Status</th>
    <th>Data of create</th>

    </thead>
    <tbody>
    <template v-for="order in orders">
      <tr>
        <td v-for="order_product in order.order_product">
          <pre>{{order_product.product.title}}</pre>
        </td>

<!--        <td v-for="order_product in order.order_product">-->
<!--          <pre>{{order_product.product.description}}</pre>-->
<!--        </td>-->

        <td v-for="order_product in order.order_product">
          <pre>{{order_product.product.price}}</pre>
        </td>

        <td v-for="order_product in order.order_product">
          <pre>{{order_product.total_price}}</pre>
        </td >

        <td v-for="order_product in order.order_product">
          <pre>{{order_product.product_number}}</pre>
        </td>

        <td> {{ order.delivery_address }}</td>

        <td> {{ order.status }}</td>

        <td> {{ order.created_at }}</td>

      </tr>

    </template>
    </tbody>
  </table>
</template>

<script>
import {onMounted} from "vue";
import useOrders from "../../composables/order";

export default {
  name: "OrdersIndex",
  setup() {
    const { errors, orders, getOrders, user, userByToken, token } = useOrders()

    const data = async () => {
      await userByToken(token)
      await getOrders(user.value.id)
    }
    onMounted(data)
    console.log(orders)
    return {
      errors,
      orders,
      getOrders,
      user,
      userByToken
    }
  }
}
</script>

<style scoped>

</style>