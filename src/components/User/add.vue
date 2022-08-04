<template>
    <AppHeader />
    <div class="container">
        <h3 class="text-center">Add New User</h3>
   
            <div class="form-group">

                <label for="username">User name</label>
                <input type="text" v-model="user.username" class="form-control" id="validationServer01" placeholder="Enter name" required>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" v-model="user.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" v-model="user.password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <div class="form-group">
                <label for="roles">Role</label>
                <select class="custom-select" v-model="user.roles">
                    <option selected>Choose user roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <!-- <option value="guest">Guest</option> -->
                </select>

            </div>


            <button class="btn btn-primary mr-3" @click="saveUser()">Save</button>
            <button class="btn btn-secondary" @click="cancel()">Cancel</button>
     
    </div>
</template>

<script>
import AppHeader from "../Header.vue";
import User from '../../models/user';

export default {
    name: 'NewUser',
    data() {
        return {
            user: new User('', '', '', ''),

        };
    },
    components: { AppHeader },
    methods:{
        saveUser() {
      
      this.$store.dispatch('auth/register', this.user).then(
        data => {
          this.message = data.message;
           this.$router.push('/users/all');
        },
        error => {
          this.message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    },
        cancel() {
      this.$router.push('/users/all');
    }
    }
}
</script>