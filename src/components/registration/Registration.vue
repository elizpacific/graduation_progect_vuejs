<template>
  <div class="container">
    <h2>Create</h2>

    <div class="alert alert-danger" role="alert" v-if="errors.length !== 0">
      <ul>
        <li v-for="error in errors">
          {{ error }}
        </li>
      </ul>
    </div>

    <form v-on:submit.prevent="saveUser">
      <div class="mb-3">
        <label for="firstname" class="form-label">Firstname</label>
        <input type="text" class="form-control" id="firstname" name="firstname" v-model="form.firstname" placeholder="Firstname">
      </div>
      <div class="mb-3">
        <label for="lastname" class="form-label">Lastname</label>
        <input type="text" class="form-control" id="lastname" name="lastname" v-model="form.lastname" placeholder="Lastname">
      </div>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" name="username" v-model="form.username" placeholder="Username">
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" name="email" v-model="form.email" placeholder="Email">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" name="password" v-model="form.password" placeholder="Password">
      </div>
      <input type="submit" class="btn btn-success" value="Create">
    </form>
  </div>
</template>

<script>
import {onMounted, reactive} from "vue";
import useUsers from "../../composables/registration";
export default {
  name: "Registration",
  setup() {
    const form = reactive({
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: ""
    })
    const { errors, createUser } = useUsers()
    const saveUser = async () => {
      await createUser(form)
    }

    return {
      errors,
      form,
      saveUser
    }
  }
}
</script>

<style scoped>

</style>