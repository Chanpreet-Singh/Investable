//author - Aman Singh Bhandari
import httpClient from "../../thunk/interceptor";
//Singleton class to get the current user
const UtilityUser = async () => {
  return httpClient
    .post("/getuser", { email: localStorage.getItem("loggedInUserEmail") })
    .then(function (response) {
      return response.data;
    });
};
export default UtilityUser;
