 

import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Home from './Compoment/Frame/Home';
import Login from './Compoment/Auth/Login';
import Login2 from './Compoment/Auth/Login2';
import Register from './Compoment/Auth/Register';
import AppHeader from './Compoment/Frame/AppHeader';
import AppFooter from './Compoment/Frame/AppFooter';
import { ToastContainer } from 'react-toastify';
import ItemID from './Compoment/Frame/ItemID'

function Root() {
  return (
    <Routes>
      <Route exact path="/test"  element={<ItemID  />} />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/login2" element={<Login2 />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>
  );
}
function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
        <AppHeader></AppHeader>
          <Root/>
        <AppFooter></AppFooter>
      </BrowserRouter>
    </div>
  );
}

export default App;
