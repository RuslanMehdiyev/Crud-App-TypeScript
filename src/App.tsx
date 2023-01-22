import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Categories from "./Pages/Categories";
import Products from "./Pages/Products";
import Suppliers from "./Pages/Suppliers";
import "./assets/style/main.css";
import LogIn from "./Pages/LogIn";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Suppliers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
