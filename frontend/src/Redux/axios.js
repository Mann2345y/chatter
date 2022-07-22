import axios from "axios";

const baseURL = "http://localhost:5000";
let headers = {};
const user = JSON.parse(localStorage.getItem("loggedUser"));
if (localStorage.getItem("loggedUser")) {
  headers.Authorization = `Bearer ${user.token}`;
}
export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers,
});
