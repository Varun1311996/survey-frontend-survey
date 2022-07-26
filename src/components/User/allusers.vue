<template>
  <AppHeader />
  <hr />
  <div class="container">


    <table class="table" v-if="users.length">
      <thead>
        <tr >
          <th class="col-3">User Name</th>
          <th class="col-3">Role</th>
          <th class="col-3">Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-for="user in users" :key="user.id" :user="user">
        <tr  v-if="user.id != loggedUser.id">

          <td>{{ user.username }}</td>
          <td>
            <li v-for="(role, index) in user.roles" :key="index">
									<span>{{ role.name }}</span>
            </li>
          </td>
          <td>{{ user.email }}</td>
          <td>
            <!-- <button type="button" class="btn btn-secondary btn-sm mr-3" @click="editUser(user)">Edit</button> -->
            <button type="button" class="btn btn-danger btn-sm mr-3" @click="deleteUser(user)">Delete</button>
        
          </td>

        </tr>

      </tbody>
    </table>

    <button type="button" class="btn btn-outline-success btn-sm mt-3" @click="addUser()">Create New User</button>
  </div>

</template>

<script>
import User from "../../services/user.service";
import AppHeader from "../Header.vue";


export default {
  name: 'users',
  data() {
    return {
      users: []
    }
  },
  components: { AppHeader },
  computed: {
		loggedUser() {
			return this.$store.state.auth.user;
		}
	},
  mounted() {
    this.getUsers();
  },
  methods: {
    addUser() {
      this.$router.push("/user/new");
    },
    getUsers() {
      User.getUsers()
        .then(response => {
          this.users = response.data;
          console.log("survey1111..", response.data);
        })
    },
    deleteUser(user){
        User.deleteUser(user.id)
				.then(response => {
                    console.log(response.data);
					this.getUsers();

				})

    }
    
  }
}
</script>

<style>
.container {
  background: white;
}
</style>