import http from "../../http-common";
class SurveyResponse {
    getAll(){
        return http.get("/surveys");
      }
    
      create(name,userId,id, data) {
        return http.post(`/surveys/responses?name=${name}&responder=${userId}&surveyId=${id}`, data);
      }
    //   get(sid) {
    //     return axios.get(API_URL+`/${sid}`);
    //   }
}

export default new SurveyResponse();