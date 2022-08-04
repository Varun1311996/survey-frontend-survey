import http from "../../http-common";
class SurveyResponse {
  getAllResults(){
        return http.get('/surveys/responses/0/getAllResponses');
      }
    
      create(name,userId,id, data) {
        return http.post(`/surveys/responses?name=${name}&responder=${userId}&surveyId=${id}`, data);
      }
      get(sid) {
        return http.get(`/surveys/responses/${sid}`)
        //return axios.get(API_URL+`/${sid}`);
      }
}

export default new SurveyResponse();