 

import { BrowserRouter, Route, Routes  } from 'react-router-dom';

import {Login,Register} from './Compoment/Auth';
import {AppHeader ,AppFooter ,ItemID ,Home ,InFo}  from './Compoment/Frame';
import { ToastContainer } from 'react-toastify';


function Root() {
  return (
    <Routes>
      <Route exact path="/test"  element={<ItemID  />} />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/info"  element={<InFo  />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
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
