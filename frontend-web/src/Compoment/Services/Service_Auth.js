import ApiInFo from "./Service_ApiInFo";

const API = ApiInFo.API

const myHeaders =ApiInFo.myHeaders();


const ApiLogin = (username, password) => {
 
  var raw = JSON.stringify({
    username: username,
    password: password,
  });
   
  return fetch(API + "/api/auth/signin", ApiInFo.POSTBODY(raw))
    .then((response) => {
      if (response.ok || response.status ===400 ) {
        return response.json();
      } else {
        throw new Error("Login failed");
      }
    });
};

const ApiLogout = () => {
  localStorage.removeItem("logininfo");
  localStorage.removeItem("token");
};

const ApiRegister = (email1, username1, password1) => {
 
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

const IsAdmin =() =>{

  try {
    var roles = Array.from(JSON.parse(localStorage.getItem("logininfo")).roles);
    return roles.includes("ROLE_ADMIN");
  } catch (error) {
     
  }

  return false;
}
const getCurrentUserToken = () => {
  try {
    return JSON.parse(localStorage.getItem("logininfo")).token;
  } catch (error) {
    throw new Error("Khong co token trong localstorage");
  }
};


const ApiUserInFo = () => {

 
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(API + "/api/auth/info", requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Cannot get Userinfo");
      }
    });
}


const ApiGetPath = (part) => {

 
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


const UpdateUserInfo = (fullname, phonenumber, address, brithDay, linkfacebook, linkinstagram, linktwitter) => {
 
  var raw = JSON.stringify({
    "fullname": fullname,
    "phonenumber": phonenumber,
    "linkfacebook": linkfacebook,
    "linkinstagram": linkinstagram,
    "linktwitter": linktwitter,
    "address": address,
    "datebirth": brithDay
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(API + "/api/auth/updateuserinfo", requestOptions)
    .then((response) => {
      if (response.ok || response.status === 400) {
        return response.json();
      } else {
        throw new Error("Cannot Update  User Info");
      }
    });
}

const getAllUsers = () => {

 

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(API + "/api/auth/all", requestOptions)
    .then((response) => {
      if (response.ok || response.status === 400) {
        return response.json();
      } else {
        throw new Error("Get All User ");
      }
    });
}


const getSearchUsers = (keyword) => {

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(API + "/api/auth/search="+keyword, requestOptions)
    .then((response) => {
      if (response.ok || response.status === 400) {
        return response.json();
      } else {
        throw new Error("Get Search User ");
      }
    });
}
const getNotification = () => {
 

  return fetch(API + "/api/auth/notification", ApiInFo.GET())
    .then((response) => {
      if (response.ok || response.status === 400) {
        return response.json();
      } else {
        throw new Error("Get Search User");
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
  ApiGetPath,
  ApiGetUserInfoPublic,
  UpdateUserInfo,
  getAllUsers,getSearchUsers
  ,IsAdmin ,getNotification
};

export default Authservice;
