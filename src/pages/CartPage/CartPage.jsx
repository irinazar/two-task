import { observer } from "mobx-react-lite";
import { userStore } from "../../store/user-srore";
import { List, Button, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons"; 
import styles from './CartPage.module.scss';

const CartPage = observer(() => {
  const { cart } = userStore;

  const handleAddToCart = (item) => {
    if (!userStore.user) {
      message.warning(
        "Пожалуйста, войдите или зарегистрируйтесь, чтобы добавить товар в корзину"
      );
      return;
    }
    userStore.addToCart(item);
  };

  const handleCheckout = () => {
    if (!cart || cart.length === 0) {
      message.warning("Корзина пуста. Добавьте товары перед оформлением заказа.");
      return;
    }
    const totalAmount = cart?.reduce((total, item) => total + item.price, 0);
    const order = {
      totalAmount: totalAmount
    };
    userStore.addToPurchaseHistory(order);
    message.success("Заказ успешно оформлен!");
  };

  const totalAmount = cart ? cart.reduce((total, item) => total + item?.price, 0) : 0;

  return (
    <div className={styles.container}>
      <h1>Корзина</h1>
      <List
        itemLayout="horizontal"
        dataSource={cart || []} 
        renderItem={(item, index) => (
          <List.Item
            key={index}
            actions={[
              <Button
                key={item?.id}
                type="primary"
                onClick={() => handleAddToCart(item)}
                icon={<ShoppingCartOutlined />}
              ></Button>,
            ]}
          >
            <List.Item.Meta
              title={item?.name}
              description={`Цена: ${item?.price}`}
            />
          </List.Item>
        )}
      />
      <div className={styles.totalAmount}>
        Общая сумма заказа: {totalAmount} руб.
      </div>
      <Button type="primary" onClick={handleCheckout}>Оформить заказ</Button>

      <h2>История покупок</h2>
      <List
        itemLayout="horizontal"
        dataSource={userStore.purchaseHistory || []} 
        renderItem={(item, index) => (
          <List.Item 
          key={index}
          >
            <List.Item.Meta
              title={`Заказ №${index + 1}`}
              description={`Сумма: ${item?.totalAmount} руб.`}
            />
          </List.Item>
        )}
      />
    </div>
  );
});

export default CartPage
