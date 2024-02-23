import { Form, Input, Button } from "antd";
import styles from "./SignUpPage.module.scss";
import { userStore } from "../../store/user-srore";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  let navigate = useNavigate();

  const onFinish = (values) => {
    userStore.setUser(values);
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h2>Регистрация</h2>
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          label="Имя"
          name="username"
          rules={[{ required: true, message: "Пожалуйста, введите ваше имя!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Пожалуйста, введите ваш email!",
            },
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
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
