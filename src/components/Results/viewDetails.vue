<template>


<div v-if="show == id">



<div v-for="(survey, index) in surveyResults" :key="index">
    <p>{{survey.questionNumber}}: {{survey.question}}</p>
    <p>A: {{survey.answer}}</p>
</div>
</div>

</template>

<script>

export default {
    name: 'view-details',
    props: {
        show: Boolean,
        id: Number,
        survey: Object

    },
    data() {
        return {
            surveyResults: null

        }
    },
    watch:{
       
    },
    computed: {
//         checkDuplicate() {
//             var a = this.survey.data;
//             const count = a.reduce(function(acc, curr){
// if(acc[curr.questionNumber]){
//     acc[curr.questionNumber] = ++acc[curr.questionNumber]
// }
// else{
//     acc[curr.questionNumber] =1
// }
// return acc;
// },{})

// let fA = [];
// Object.entries(count).map(item => {
//     if(item[1] >1){
//         let rr = a.filter(obj => obj.questionNumber == item[0])
//         let string1 = rr.map(obj => obj.answer).join(',')
//         rr[0].answer = string1;
//         fA.push(rr[0])
//     }
//     else{
//         fA.push(a.filter(obj => obj.questionNumber == item[0])[0])
//     }
// })
// console.log(fA);
// this.surveyResults = fA
// return true;

//         }
    },
    methods: {
        close_modal() {
            this.$emit("close")
        },
        setSurveyResults(){
            console.log("surveyyyyyyyyyyyyyy");
                        var a = this.survey.data;
            const count = a.reduce(function(acc, curr){
if(acc[curr.questionNumber]){
    acc[curr.questionNumber] = ++acc[curr.questionNumber]
}
else{
    acc[curr.questionNumber] =1
}
return acc;
},{})

let fA = [];
Object.entries(count).map(item => {
    if(item[1] >1){
        let rr = a.filter(obj => obj.questionNumber == item[0])
        let string1 = rr.map(obj => obj.answer).join(',')
        rr[0].answer = string1;
        fA.push(rr[0])
    }
    else{
        fA.push(a.filter(obj => obj.questionNumber == item[0])[0])
    }
})
console.log(fA);
this.surveyResults = fA
        }
        
    },
    mounted() {
        this.setSurveyResults();
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}


label {
    float: left;
}

input[type=text],
[type=email],
textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 8px;
    margin-bottom: 16px;
    resize: vertical;
}

input[type=submit] {
    margin-right: 10px;
    background-color: #4CAF50;
    color: white;
    padding: 8px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

input[type=submit]:hover {
    background-color: #45a049;
}
</style>