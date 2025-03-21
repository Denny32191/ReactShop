import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import CreateProductPage from "./pages/CreateProductPage/CreateProductPage";
import EditProductPage from "./pages/EditProduct/EdictProduct";
import ProductDetails from "./pages/ProductDetailsPage/ProductDetailsPage";

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/ReactShop">
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
