<template>
  <nav class="navbar navbar-expand bgHeader">
    <a href="/" class="navbar-brand bgTitle">Survey App</a>
    <div class="navbar-nav mr-auto menuOptions">
      <li class="nav-item">
        <router-link to="/home" class="nav-link">
          <font-awesome-icon icon="home" /> Home
        </router-link>
      </li>
      <li v-if="showAdminBoard" class="nav-item">
        <router-link to="/admin" class="nav-link">Admin Board</router-link>
      </li>
      <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/users/all" class="nav-link">Users</router-link>
        </li>
      
        <li v-if="showUserBoard" class="nav-item">
          <router-link to="/user" class="nav-link">User Board</router-link>
        </li>

      <li class="nav-item">
        <router-link v-if="currentUser" to="/survey" class="nav-link">Surveys</router-link>
      </li>
    </div>

    <div v-if="!currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/register" class="nav-link">
          <font-awesome-icon icon="user-plus" /> Sign Up
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/login" class="nav-link">
          <font-awesome-icon icon="sign-in-alt" /> Login
        </router-link>
      </li>
    </div>

    <div v-if="currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/profile" class="nav-link">
          <font-awesome-icon icon="user" />
          {{ currentUser.username }}
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click.prevent="logOut">
          <button type="button" class="btn btn-danger btn-sm">
            <span class="glyphicon glyphicon-log-out"></span> LogOut
          </button>
        </a>
      </li>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }

      return false;
    },
    showUserBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_USER');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
      console.log("ddd", document.body)

      document.body.style.backgroundColor = "#AA0000 !important";
    }
  }
};
</script>

<style>
.bgHeader {
  background-color: #043b87;
  color: white;
  padding: 1.5rem !important;
}

.bgHeader a {
  color: white !important;
}

.bgTitle {
  font-size: 2rem !important;
  font-weight: 600 !important;
}

.menuOptions {
  font-size: 1rem !important;

}
</style>