import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./ProductDetailsPage.scss"; 

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.products.products);


  const product = products.find((p) => p.id === parseInt(id || "", 10));


  if (!product) {
    return (
      <div className="not-found-container">
        <h5>Product not found</h5>
        <button className="back-button" onClick={() => navigate("/")}>
          Go back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-container">

      <button className="back-button" onClick={() => navigate("/")}>
        ← Back to Products
      </button>


      <div className="product-card">
        <img
          alt={product.title}
          src={product.thumbnail}
          className="product-image"
        />
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
        <p className="product-liked">
          Liked: {product.liked ? "❤️ Yes" : "🤍 No"}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;