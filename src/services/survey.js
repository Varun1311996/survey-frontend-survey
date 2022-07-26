import http from "../../http-common";
class Survey {
  create(name,d,id) {
    return http.post(`/surveys?title=${name}&userId=${id}`, d);
  }
  // create(title,data,uid,name) {
  //   return axios.post(API_URL+`?title=${title}&userId=${uid}&username=${name}`, data);
  // }
  getAll() {
    return http.get("/surveys");
  }
  get(id) {
    return http.get(`/surveys/${id}`);
  }
  update(id, title, d,uid) {
    return http.put(`/surveys/${id}?title=${title}&userId=${uid}`, d);
  }
  // update(sid,title,data, uid, name) {
  //   return axios.put(API_URL+`/${sid}?title=${title}&userId=${uid}&username=${name}`, data);
  // }
  delete(id) {
    return http.delete(`/surveys/${id}`);
  }

  findSurvey(title){
    return http.get(`/surveys/?title=${title}`);
  }
}

export default new Survey();