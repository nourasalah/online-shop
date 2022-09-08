import './App.css';
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js"
import Cart from "./components/Cart.js"
import NotFound from "./components/NotFound.js"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
  
} from "react-router-dom";
function App() {
  return (
    <Router>
      <ToastContainer/>
    <div className="App">
      <Navbar/>
      <Routes>
         <Route exact path="/"  element={<Home/>}/>
         <Route path="/cart" element={<Cart/>}/>
         <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
