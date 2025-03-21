import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../pages/ProductsPage/productSlice"
import {
  setTitle,
  setDescription,
  setPrice,
  setThumbnail,
  setErrors,
  resetForm,
} from "../../pages/CreateProductPage/formSlice";
import { RootState } from "../../store/store";
import "./CreateProductPage.scss"; 

const CreateProductPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { title, description, price, thumbnail, errors } = useSelector(
    (state: RootState) => state.form
  );


  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (!price) newErrors.price = "Price is required";
    if (isNaN(Number(price))) newErrors.price = "Price must be a number";
    if (!thumbnail) newErrors.thumbnail = "Thumbnail URL is required";

    dispatch(setErrors(newErrors)); 
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const newProduct = {
        id: Date.now(), 
        title,
        description,
        price: parseFloat(price),
        thumbnail,
        liked: false,
      };

      dispatch(addProduct(newProduct)); 
      dispatch(resetForm()); 
      navigate("/"); 
    }
  };

  return (
    <div className="create-product-container">
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => dispatch(setTitle(e.target.value))}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => dispatch(setDescription(e.target.value))}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => dispatch(setPrice(e.target.value))}
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label>Thumbnail URL</label>
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => dispatch(setThumbnail(e.target.value))}
          />
          {errors.thumbnail && (
            <span className="error">{errors.thumbnail}</span>
          )}
        </div>

        <button type="submit" className="submit-button">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;