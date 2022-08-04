import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://ec2-18-191-185-134.us-east-2.compute.amazonaws.com/api/test/';
// const USER = 'http://ec2-18-191-185-134.us-east-2.compute.amazonaws.com/api/auth'

const API_URL = 'http://localhost:8080/api/test/';
const USER = 'http://localhost:8080/api/auth'
class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getUsers(){
    return axios.get(USER);
  }

  deleteUser(uid){
    return axios.delete(USER + `/${uid}`);
  }

}

export default new UserService();
