import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ManageProduct from "./screens/ManageProduct";
import ManageEmployee from "./screens/ManageEmployee";
import Login from "./screens/Login";
import Home from "./screens/Home";
import ManageOder from "./screens/ManageOder";
import ProductSample from "./screens/ProductSample";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/manageproduct" element={<ManageProduct />} />
        <Route path="/manageemployee" element={<ManageEmployee />} />
        <Route path="/manageoder" element={<ManageOder />} />
        <Route path="/productsample" element={<ProductSample />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
