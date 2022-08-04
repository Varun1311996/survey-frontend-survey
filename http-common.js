import axios from "axios";

var baseurl = "";
if (process.env.NODE_ENV === "development") {
  //baseurl = "http://ec2-18-191-185-134.us-east-2.compute.amazonaws.com/api/";
  baseurl = "http://localhost:8080/api/";
} else {
  baseurl = "/api/";
}
 
export default axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    crossDomain: true
  }
});