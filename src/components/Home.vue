<template>
<AppHeader/>
  <div class="container">
    <header class="jumbotron">
      <!-- <h3>{{ content }}</h3> -->
      <h3>Welcome to Survey Application</h3>
    </header>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import AppHeader from "./Header.vue"

export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
  components: {AppHeader},
  mounted() {
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
