// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Compoment/Home/Home';
import Login from './Compoment/Login/Login';
function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home/>} ></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' ></Route>
        <Route path='/customer'></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
