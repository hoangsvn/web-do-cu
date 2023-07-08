const API = "http://localhost/api/auth/";

const ApiLogin = (username, password) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    username: username,
    password: password,
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return fetch(API + "signin", requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Login failed");
      }
    })
    .then((result) => {
      localStorage.setItem("logininfo", JSON.stringify(result));
      return result;
    });
};

const ApiLogout = () => {
  localStorage.removeItem("logininfo");
};

const ApiRegister = (email, username, password) => {
  
};

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("logininfo"));
  } catch (error) {
    throw new Error("Thong tin khong co trong localStorage")
  }
};

const getCurrentUserToken = () => {
  try {
    return JSON.parse(localStorage.getItem("logininfo")).token;
  } catch (error) {
    throw new Error("Khong co token trong localstorage");
  }
};

const Authservice = {
  ApiLogin,
  ApiLogout,
  ApiRegister,
  getCurrentUserApi: getCurrentUser,
  getCurrentUserToken,
};

export default Authservice;
