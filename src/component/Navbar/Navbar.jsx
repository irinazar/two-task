import { Menu } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ShoppingCartOutlined } from "@ant-design/icons"; 
import { userStore } from "../../store/user-srore";
import styles from "./Navbar.module.scss";

const Navbar = observer(() => {
  const location = useLocation();
  let navigate = useNavigate();

  const { user } = userStore;

  const handleLogout = () => {
    userStore.logout();
    navigate("/");
  };

  return (
    <div className={styles.navbarContainer}>
      <Menu mode="horizontal" selectedKeys={[location.pathname]}>
        <Menu.Item key="/" className={styles.navItem}>
          <NavLink to="/" activeClassName={styles.active}>
            Главная
          </NavLink>
        </Menu.Item>

        {!user && (
          <>
            <Menu.Item key="/signup" className={styles.navItem}>
              <NavLink to="/signup" activeClassName={styles.active}>
                Зарегистрироваться
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/signin" className={styles.navItem}>
              <NavLink to="/signin" activeClassName={styles.active}>
                Войти
              </NavLink>
            </Menu.Item>
          </>
        )}
        {user && (
          <>
            <Menu.Item key="/cart" className={styles.navItem}>
              <NavLink to="/cart" activeClassName={styles.active}>
                <ShoppingCartOutlined /> Корзина
              </NavLink>
            </Menu.Item>

            <Menu.Item
              key="/logout"
              className={styles.navItem}
              onClick={handleLogout}
            >
              Выйти
            </Menu.Item>
          </>
        )}
      </Menu>
    </div>
  );
});

export default Navbar
