import http from "../../http-common";
class Survey {
  create(name,d) {
    return http.post(`/surveys?title=${name}&userId=1`, d);
  }
  getAll() {
    return http.get("/surveys");
  }
  get(id) {
    return http.get(`/surveys/${id}`);
  }
  update(id, title, d) {
    return http.put(`/surveys/${id}?title=${title}`, d);
  }
  delete(id) {
    return http.delete(`/surveys/${id}`);
  }
}

export default new Survey();