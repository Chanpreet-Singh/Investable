//author - Aman Singh Bhandari
import httpClient from "../../thunk/interceptor";

//Singleton class to get the current user
const GetUser = async (emailValue: string) => {
  return httpClient
    .post("/getuser", { email: emailValue })
    .then(function (response) {
      return response.data;
    });
};

export default GetUser;
