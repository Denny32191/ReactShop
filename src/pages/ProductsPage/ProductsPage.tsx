import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchProducts } from "../../api/api";
import { setProducts, setCurrentPage } from "./productSlice";
import ProductList from "../../components/ProductList/ProductList";
import PaginationControl from "../../components/Pagination/Pagination";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, currentPage, pageSize } = useSelector(
    (state: RootState) => state.products
  );


  const paginatedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );


  const handlePageChange = useCallback((page: number) => {
    dispatch(setCurrentPage(page));
  }, [dispatch]);


  useEffect(() => {
    if (products.length === 0) {
      const loadProducts = async () => {
        try {
          const products = await fetchProducts();
          dispatch(setProducts(products));
        } catch (error) {
          console.error("Error loading products:", error);
        }
      };

      loadProducts();
    }
  }, [dispatch, products.length]); 

  return (
    <div className="products-page">
      <h1>Products</h1>
      <Button
        type="primary"
        onClick={() => navigate("/create-product")}
        style={{ marginBottom: 16 }}
      >
        Create Product
      </Button>
      <ProductList products={paginatedProducts} />
      <div>
        <PaginationControl
          total={products.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductsPage;