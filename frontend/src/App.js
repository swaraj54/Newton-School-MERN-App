import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import Register from './Components/Register';
import Navbar from './Components/Navbar';
import AllProducts from './Components/AllProducts';
import AddProduct from './Components/AddProduct';
import VerifyProducts from './Components/VerifyProducts';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/all-products" element={<AllProducts />} />
        <Route exact path="/add-product" element={<AddProduct />} />
        <Route exact path="/verify-products" element={<VerifyProducts />} />
      </Routes>
    </div>
  );
}

export default App;
