

import { BrowserRouter, Route, Routes   } from 'react-router-dom';

import { Login, Register } from './Compoment/Auth';
import { AppHeader, AppFooter, ItemID, Home, InFo, Notification, Cart, Add, SanPhamEdit, Search } from './Compoment/Frame';
import { ToastContainer } from 'react-toastify';


function Root() {
   
  return (

    <BrowserRouter>
      <ToastContainer autoClose={2000} className={"w-50"} theme='colored' position='top-center'></ToastContainer>
      <AppHeader></AppHeader>
      <Routes>
        <Route exact path="/search/:search"     element={<Search />} />
        <Route exact path="/sanpham/:id"        element={<ItemID />} />
        <Route exact path="/edit/:sid"          element={<SanPhamEdit/>} />
        <Route exact path="/"                   element={<Home />} />
        <Route exact path="/info"               element={<InFo />} />
        <Route exact path="/myrepository/:path" element={<Cart />} />
        <Route exact path="/home"               element={<Home />} />
        <Route exact path="/login"              element={<Login />} />
        <Route exact path="/register"           element={<Register />} />
        <Route exact path="/notification"       element={<Notification />} />
        <Route exact path="/add"              element={<Add />} />
      </Routes>
      <AppFooter></AppFooter>
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
