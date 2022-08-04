import http from "../../http-common";
class Survey {
  create(name,d,id,uname) {
    return http.post(`/surveys?title=${name}&userId=${id}&username=${uname}`, d);
  }
  getAll() {
    return http.get("/surveys");
  }
  get(id) {
    return http.get(`/surveys/${id}`);
  }
  update(id, title, d,uid,uname) {
    return http.put(`/surveys/${id}?title=${title}&userId=${uid}&username=${uname}`, d);
  }
  delete(id) {
    return http.delete(`/surveys/${id}`);
  }

  findSurvey(title){
    return http.get(`/surveys/?title=${title}`);
  }
}

export default new Survey();