import { Form, Input, Button } from "antd";
import styles from "./SignInPage.module.scss";
import { userStore } from "../../store/user-srore";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  let navigate = useNavigate();

  const onFinish = (values) => {
    userStore.setUser(values);
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h2>Авторизация</h2>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Пожалуйста, введите ваш Email!" },
            { type: "email", message: "Пожалуйста, введите корректный Email!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            { required: true, message: "Пожалуйста, введите ваш пароль!" },
          ]}
        >
          <Input.Password  />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "10px" }}
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
