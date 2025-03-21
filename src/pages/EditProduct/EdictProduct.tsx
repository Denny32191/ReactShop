import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editProduct } from "../ProductsPage/productSlice";
import { RootState } from "../../store/store";
import { Button, Form, Input, Typography } from "antd";

const { Title } = Typography;

const EditProductPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { products } = useSelector((state: RootState) => state.products);

  // Находим продукт по ID
  const product = products.find((p) => p.id === parseInt(id || "", 10));

  const [form] = Form.useForm();

  // Заполняем форму данными продукта
  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
      });
    }
  }, [product, form]);

  // Обработчик отправки формы
  const handleSubmit = (values: any) => {
    if (product) {
      const updatedProduct = {
        ...product,
        ...values,
      };
      dispatch(editProduct(updatedProduct));
      navigate("/"); // Переход на главную страницу
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="edit-product-container">
      <Title level={2}>Edit Product</Title>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="thumbnail"
          label="Thumbnail URL"
          rules={[{ required: true, message: "Please enter the thumbnail URL" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default EditProductPage;