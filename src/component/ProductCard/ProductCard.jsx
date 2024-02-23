import { Card, Button, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons"; // Импортируем иконку корзины
import styles from "./ProductCard.module.scss";
import { userStore } from "../../store/user-srore";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  

  const handleAddToCart = () => {
    if (!userStore.user) {
      message.warning(
        "Пожалуйста, войдите или зарегистрируйтесь, чтобы добавить товар в корзину"
      );
      return;
    }
    userStore.addToCart(product);
  };

  return (
    <Card
      hoverable
      style={{
        minHeight: "400px",
      }}
    >
      <div className={styles.containerCard}>
        <img className={styles.img} alt={product.name} src={product.image} />
      </div>
      <div>
        <Meta title={product.name} description={product.description} />
        <p>Категория: {product.category}</p>
        <p>Цена: {product.price}</p>
      </div>
      <div>
        <Button
          type="primary"
          onClick={handleAddToCart}
          icon={<ShoppingCartOutlined />}
        ></Button>
      </div>
    </Card>
  );
};

export default ProductCard;
