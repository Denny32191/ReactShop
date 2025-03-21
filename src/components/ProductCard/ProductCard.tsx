import React from "react";
import { useDispatch } from "react-redux";
import { toggleLike, deleteProduct } from "../../pages/ProductsPage/productSlice";
import { useNavigate } from "react-router-dom";
import { Card, Button, Space, message, Typography } from "antd";
import { HeartOutlined, HeartFilled, DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    liked?: boolean;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLike(product.id));
    message.success(product.liked ? "Removed from favorites" : "Added to favorites");
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteProduct(product.id));
    message.success("Product deleted");
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit-product/${product.id}`); // Переход на страницу редактирования
  };

  const handleClick = () => {
    navigate(`/products/${product.id}`); // Переход на страницу продукта
  };

  return (
    <Card
      hoverable
      style={{
        width: 200,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      bodyStyle={{ padding: 12 }}
      cover={
        <img
          alt={product.title}
          src={product.thumbnail}
          style={{
            maxWidth: 200,
            height: 200,
            objectFit: "cover",
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          }}
        />
      }
      onClick={handleClick}
    >
      <Title level={5} style={{ marginBottom: 8, color: "#333" }}>
        {product.title}
      </Title>
      <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 8 }}>
        {product.description.slice(0, 30)}...
      </Text>
      <Text strong style={{ fontSize: 14, color: "#1890ff",}}>
        ${product.price}
      </Text>
      <Space style={{ marginTop: 8, display: "flex", justifyContent: "space-between"}}>
        <Button
          icon={product.liked ? <HeartFilled /> : <HeartOutlined />}
          size="small"
          onClick={handleLike}
          style={{ border: "none", background: "transparent", color: "#ff4d4f" }}
        />
        <Button
          icon={<EditOutlined />}
          size="small"
          onClick={handleEdit}
          style={{ border: "none", background: "transparent", color: "#1890ff" }}
        />
        <Button
          icon={<DeleteOutlined />}
          size="small"
          danger
          onClick={handleDelete}
          style={{ border: "none", background: "transparent" }}
        />
      </Space>
    </Card>
  );
};

export default ProductCard;