import { observer } from "mobx-react-lite";
import { userStore } from "../../store/user-srore";
import { useEffect, useState } from "react";
import ProductCard from "../../component/ProductCard/ProductCard";
import { Col, Row, Select } from "antd";

const { Option } = Select;

const MainPage = observer(() => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    userStore.loadProducts();
  }, []);

  const { products } = userStore;

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div>
      <h1>Магазин</h1>
      <Select
        style={{ width: 200, marginBottom: 16 }}
        placeholder="Выберите категорию"
        onChange={(value) => setSelectedCategory(value)}
      >
        <Option value="">Все товары</Option>
        <Option value="Бытовая техника">Бытовая техника</Option>
        <Option value="Электроника">Электроника</Option>
        <Option value="Спорт и отдых">Спорт и отдых</Option>
        <Option value="Транспорт">Транспорт</Option>
      </Select>
      <Row gutter={[16, 16]}>
        {filteredProducts.map((product) => (
          <Col span={6} key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
});

export default MainPage;
