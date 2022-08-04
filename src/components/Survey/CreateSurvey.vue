<template>
<AppHeader/>
<div class="container">

  <div class="test-survey-builder">
    
    <hr/>
    <h2 class="text-center">New Survey</h2>
    <div class="form-group">
    <label for="formGroupExampleInput">Survey Tiltle</label>
    <input type="text" class="form-control" v-model="surveyname" id="formGroupExampleInput" placeholder="Enter Survey Name">
  </div>
    <QuestionsView :questions="questionsList" :readOnly="true" />

    <div v-if="addQuestion">
      <SurveyBuilder :options="sampleQuestion" @add-update-question="updateQuestionsList"/>
    </div>
    <div class="pt-10">
      <button type="button" class="btn btn-info mr-md-3" v-on:click="addNewQuestion()">Add question</button>
      <button type="button" class="btn btn-success" @click="saveSurvey()">Save Survey</button>
     
    </div>
  </div>
  </div>
</template>

<script>
import SurveyBuilder from './SurveyBuilder.vue';
import QuestionsView from './QuestionView.vue';
import sampleQuestionObj from './survey-builder.json';
import AppHeader from "../Header.vue";
import EventBus from '../../event.js';
import Survey from "../../services/survey";

export default {
  name: 'TestSurveyBuilder',
  data() {
    return {
      questionsList: [],
      addQuestion: false,
      surveyname:"",
    };
  },
  components: { SurveyBuilder, QuestionsView,AppHeader },
  mounted() {
    
    EventBus.$on('add-update-question', q => {
      console.log("watchhhhhhhh.....")
      this.updateQuestionsList(q);
    });
    
  },
  
  methods: {
    updateQuestionsList(q) {
      console.log("qqq..",q.question);
      var question = q.question;
      const questionIndex = this.questionsList.findIndex(x => x.id === question.id);
      console.log("q index..",questionIndex);
      if (questionIndex >= 0) {
        this.questionsList.splice(questionIndex, 1, question);
      } else {
        this.questionsList.push(JSON.parse(JSON.stringify(question)));
      }
      this.addQuestion = false;
      EventBus.$emit('selected-question', null);
      console.log("q list", JSON.stringify(this.questionsList))
      window.console.log(question, this.addQuestion, this.questionsList);
    },
    addNewQuestion() {
      this.sampleQuestion = JSON.parse(JSON.stringify(sampleQuestionObj));
      console.log("111111",this.sampleQuestion)
      this.addQuestion = true;
    },
    saveSurvey(){
      alert("Survey saved successfully!!");
      //todo - Save to database "survey table"
      Survey.create(this.surveyname,this.questionsList,this.$store.state.auth.user.id,this.$store.state.auth.user.username)
                .then(response => {
                    // this.album.id = response.data.id;
                    console.log("survey created",response.data)
                     this.$router.push("/survey");
                })
                .catch(e => {
                    
                    this.message = e.response.data.message;
                     
                });
     
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.add_another_btn {
  font-size: 14px;
  background-color: transparent;
  border-color: #4c8ce4;
  color: #4c8ce4;
  padding: 8px;
  cursor: pointer;
}
.text-center {
  text-align: center;
}
</style>

