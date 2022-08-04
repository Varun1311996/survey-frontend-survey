<template>
<AppHeader/>
<div class="card card-container">
  <section class="w-full flex justify-center items-center my-10">
    <form class="">
      <div class="form-group">
         <label class="text-gray-600 font-semibold text-lg">Enter user Email Id to share the survey </label>
        <div
          v-for="(input, index) in emails"
          :key="`emailInput-${index}`"
          class="input wrapper flex items-center"
        >
           <input 
               v-model="input.email"
               type="text" 
               class="h-10 rounded-lg outline-none p-2" 
               placeholder=" Enter Email"     
          />
           <!--          Add Svg Icon-->
          <svg

            @click="addField(input, emails)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="ml-2 cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="green"
              d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
            />
          </svg>

          <!--          Remove Svg Icon-->
          <svg
            v-show="emails.length > 1"
            @click="removeField(index, emails)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="ml-2 cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="#EC4899"
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
            />
          </svg>
        </div>
      </div>
      <button type="button" class="btn btn-success btn-sm mr-3" @click="sendEmail()">Send</button>
    </form>
  </section>
  </div>
</template>

<script>
import axios from "axios";
import AppHeader from "../Header.vue";

export default {
  name: 'HelloWorld',
  data() {
    return {
      emails: [{ email: "" }],
    };
  },
  components: { AppHeader },
  props: ['id'],
  methods:{
    addField(value, fieldType) {
      fieldType.push({ value: "" });
      //console.log("abcde1111111", this.props)
    //   this.email();
    },
    removeField(index, fieldType) {
      fieldType.splice(index, 1);
    //   this.email();
    },
    sendEmail(){
         let  emailExported = this.emails.map(obj => obj['email'])
           if(!emailExported.includes(undefined)){
            let urlId = window.location.pathname.split("/");
        let id = urlId[urlId.length - 1];
        console.log("aeiou",id)
        //const emailDataExported = { "email": emailExported, "link": `http://ec2-18-191-185-134.us-east-2.compute.amazonaws.com/view/${id}`};
        const emailDataExported = { "email": emailExported, "link": `http://localhost:8081/view/${id}`};
        console.log("abcde", emailDataExported)
        //change URL here -- todo
        //axios.post("http://ec2-18-191-185-134.us-east-2.compute.amazonaws.com/mail", emailDataExported)
        axios.post("http://localhost:8080/mail", emailDataExported)
        .then(response => {
          console.log("email response", response);
          alert("Email Sent Successfully!!");
          this.$router.push("/survey");
        })
      }
    //   this.$emit(this.emails)

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.card-container.card {
  max-width: 650px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
</style>
