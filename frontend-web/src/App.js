

import { BrowserRouter, Route, Routes   } from 'react-router-dom';
import { App_Login, App_Register } from './Compoment/Auth';
import { App_Header, App_Footer, App_ItemID, App_Home, App_InFo, App_Notification, App_Cart, App_Add, App_SanPhamEdit, App_Search, App_EditProFile ,App_AnySV } from './Compoment/Frame';
import { ToastContainer } from 'react-toastify';
import { AdminDS } from './Compoment/Admin';
 


function Root() {
   
  return (

    <BrowserRouter>
      <ToastContainer autoClose={2000} className={"w-50"} theme='colored' position='top-center'></ToastContainer>
      <App_Header></App_Header>
      <Routes>
        <Route exact path="/editprofile"        element={<App_EditProFile />} />
        <Route exact path="/search/:search"     element={<App_Search />} />
        <Route exact path="/sanpham/:id"        element={<App_ItemID />} />
        <Route exact path="/edit/:sid"          element={<App_SanPhamEdit/>} />
        <Route exact path="/"                   element={<App_Home />} />
        <Route exact path="/info"               element={<App_InFo />} />
        <Route exact path="/myrepository/:path" element={<App_Cart />} />
        <Route exact path="/home"               element={<App_Home />} />
        <Route exact path="/login"              element={<App_Login />} />
        <Route exact path="/register"           element={<App_Register />} />
        <Route exact path="/notification"       element={<App_Notification />} />
        <Route exact path="/add"                element={<App_Add />} />
        <Route exact path="/dashboard"          element={<AdminDS />} />
        <Route exact path="/anyurl/link=:link"       element={<App_AnySV />} />
      </Routes>
      <App_Footer></App_Footer>
    </BrowserRouter>
  );
}
function App() {
  return (
    <div className="App">
        <Root />
    </div>
  );
}

export default App;
