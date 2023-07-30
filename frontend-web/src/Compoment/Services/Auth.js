const API = "http://localhost";

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
  return fetch(API + "/api/auth/signin", requestOptions)
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

const ApiRegister = (email1, username1, password1) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "username": username1,
    "password": password1,
    "email": email1
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };


  return fetch(API + "/api/auth/signup", requestOptions)
    .then((response) => {
      if (response.ok || response.status === 400) {
        return response.json()
      } else {
        throw new Error("Resgister Error ");
      }
    });
};

const getCurrentUserApi = () => {
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
  getCurrentUserApi,
  getCurrentUserToken,
};

export default Authservice;
