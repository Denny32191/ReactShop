import React from "react";
import ProductCard from "./../ProductCard/ProductCard";
import { Row, Col } from "antd";


interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  liked?: boolean;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "16px" }}>
      <Row gutter={[16, 16]} style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <Col
            key={product.id}
            xs={24} 
            sm={12}
            md={8}  
            lg={6} 
            xl={4}  
            style={{ flex: "0 0 auto" }} 
          >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;