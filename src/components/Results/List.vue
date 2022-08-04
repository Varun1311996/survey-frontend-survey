<template>
    <AppHeader />
    <hr />
    <div class="container">

        <h4 class="text-bold">Survey Results</h4>
        <button type="button" class="btn btn-success btn-sm mr-3" @click="downloadFile()">Download Results</button>
        <table class="table" v-if="surveys.length">
            <thead>
                <tr>
                    <th class="col-3">User</th>
                    <th class="col-3">Submitted On</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody v-for="(survey, index) in surveys" :key="survey.id" :survey="survey">
                <tr v-if="isAdmin">

                    <td>Response {{ index + 1 }}</td>
                    <td>{{ survey.createdAt.substring(0, 10) }}</td>
                    <td></td>
                    <td>
                         <button type="button" v-show="showModal != survey.id" class="btn btn-primary btn-sm mr-3" @click="show(survey, this)">View
                            Details</button>
                            <button type="button" v-show="showModal == survey.id" class="btn btn-primary btn-sm mr-3" @click="hideDetail(survey)">Hide
                            Details</button>

                    </td>

                </tr>
                <tr v-else-if="loggedUser.id == survey.userId">

                    <td>{{ survey.title }}</td>
                    <td>{{ survey.username }}</td>
                    <td>
                       <button type="button" v-show="showModal != survey.id" class="btn btn-primary btn-sm mr-3" @click="show(survey, this)">View
                            Details</button>
                            <button type="button" v-show="showModal == survey.id" class="btn btn-primary btn-sm mr-3" @click="hideDetail(survey)">Hide
                            Details</button>
                    </td>
                    <td>

                    </td>

                </tr>
                <tr bgcolor="gainsboro">
<viewDetails :id='survey.id' :show='showModal' :survey='survey'/>
                </tr>
                
                <!-- <div class="hidden" :id='survey.id' v-show="showModal">
    <p> Testtt{{ index }} </p>
  </div>  -->

            </tbody>

        </table>

        <button type="button" class="btn btn-outline-secondary btn-sm mt-3" @click="goBack()">Back</button>

    </div>

</template>

<script>
import SurveyResponse from "../../services/survey-responses";
import AppHeader from "../Header.vue";
import exportFromJSON from "export-from-json";
import viewDetails from './viewDetails.vue';


export default {
    name: 'SurveyResults',
    data() {
        return {
            surveys: [],
            showModal: 0,
        }
    },
    components: { AppHeader, viewDetails },
    computed: {
        loggedUser() {
            return this.$store.state.auth.user;
        },
        isAdmin() {
            var user = this.$store.state.auth.user;
            return user.roles.includes("ROLE_ADMIN");
        }
    },
    mounted() {
        this.getAllSurveys();
    },
    methods: {
        getAllSurveys() {
            SurveyResponse.getAllResults()
                .then(response => {
                    this.surveys = response.data;
                    console.log("resultsss..", response.data);
                })
        },
        downloadFile() {

            var test = [];

            for (var i in this.surveys) {
                for (var j in this.surveys[i].data) {
                    test.push(this.surveys[i].data[j])
                }


            }

            const data = test;
            const fileName = "survey-results";
            const exportType = exportFromJSON.types.csv;

            if (data) exportFromJSON({ data, fileName, exportType });
        },
        goBack() {
            this.$router.push("/survey");
        },
        show(survey) {
            console.log("sssss",survey.id);
            
            this.showModal = survey.id;
            console.log("ttttt",this.showModal)
        },
        
        hideDetail(){
this.showModal = 0;
        }


    }
}
</script>

<style>
.container {
    background: white;
}
</style>