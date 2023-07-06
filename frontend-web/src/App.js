 
import './App.css';
import { BrowserRouter, Route, Routes ,useNavigate } from 'react-router-dom';
import Home from './Compoment/Home/Home';
import Login from './Compoment/Auth/Login';
import Register from './Compoment/Auth/Register';
 

function Root() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>
  );
}
function App() {
  return (
    <div className="App">
 
      <BrowserRouter>
        <Root/>
      </BrowserRouter>
    </div>
  );
}

export default App;
