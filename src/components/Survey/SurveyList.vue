<template>
  <AppHeader />
  <hr />
  <div class="container">


    <table class="table" v-if="surveys.length">
      <thead>
        <tr>
          <th class="col-3">Survey Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-for="survey in surveys" :key="survey.id" :survey="survey">
        <tr>

          <td>{{ survey.title }}</td>
          <td>
            <button type="button" class="btn btn-primary btn-sm mr-3" @click="view(survey)">View</button>
            <button type="button" class="btn btn-secondary btn-sm mr-3" @click="edit(survey)">Edit</button>
            <button type="button" class="btn btn-danger btn-sm mr-3" @click="deletesurvey(survey)">Delete</button>
            <button type="button" class="btn btn-info btn-sm" @click="share(survey)">Share</button>
          </td>

        </tr>

      </tbody>
    </table>

    <button type="button" class="btn btn-outline-success btn-sm mt-3" @click="addSurvey()">Create New Survey</button>
  </div>

</template>

<script>
import Survey from "../../services/survey";
import AppHeader from "../Header.vue";


export default {
  name: 'SurveyList',
  data() {
    return {
      surveys: []
    }
  },
  components: { AppHeader },
  mounted() {
    this.getAllSurveys();
  },
  methods: {
    addSurvey() {
      this.$router.push("/new-survey");
    },
    getAllSurveys() {
      Survey.getAll()
        .then(response => {
          this.surveys = response.data;
          console.log("survey1111..", response.data);
        })
    },
    view(survey){
this.$router.push({ name: 'viewsurvey', params: { id: survey.id } });
    },
    edit(survey){
this.$router.push({ name: 'editsurvey', params: { id: survey.id } });
    },
    deletesurvey(survey){
       Survey.delete(survey.id)
        .then(() => {
           this.getAllSurveys();
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    share(survey){
      this.$router.push({ name: 'sharesurvey', params: { id: survey.id } });
    }
  }
}
</script>

<style>
.container {
  background: white;
}
</style>