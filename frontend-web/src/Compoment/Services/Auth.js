import ApiInFo from "./ApiInFo";

const API = ApiInFo.API


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


const ApiLogin = (username, password) => {

  myHeaders.append("Authorization", localStorage.getItem("token"));
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
      var user = JSON.stringify(result);
      localStorage.setItem("logininfo", user);
      localStorage.setItem("token", `${result.type} ${result.token}`);
      return result;
    });
};

const ApiLogout = () => {
  localStorage.removeItem("logininfo");
  localStorage.removeItem("token");
};

const ApiRegister = (email1, username1, password1) => {

  myHeaders.append("Authorization", localStorage.getItem("token"));
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


const ApiUserInFo = () => {

  myHeaders.append("Authorization", localStorage.getItem("token"));
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch("http://localhost/api/auth/info", requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Cannot get Userinfo");
      }
    });
}


const ApiGetPath = (part) => {
  myHeaders.append("Authorization", localStorage.getItem("token"));
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(API + "/api/auth/myrepository/" + part, requestOptions)
    .then((response) => {
      if (response.ok || response.status === 400) {
        return response.json();
      } else {
        throw new Error("Cannot get Myrepository");
      }
    });
}


const ApiGetUserInfoPublic = (sid) => {
  myHeaders.append("Authorization", localStorage.getItem("token"));
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(API + "/api/auth/publicinfo/id=" + sid, requestOptions)
    .then((response) => {
      if (response.ok || response.status === 400) {
        return response.json();
      } else {
        throw new Error("Cannot get Public User Info");
      }
    });
}

const Authservice = {
  ApiLogin,
  ApiLogout,
  ApiRegister,
  ApiUserInFo,
  getCurrentUserApi,
  getCurrentUserToken,
  ApiGetPath,ApiGetUserInfoPublic
};

export default Authservice;
