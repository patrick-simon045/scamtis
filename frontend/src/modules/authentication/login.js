import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

export default function NormalLoginForm() {
  const history = useHistory();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    fetch("http://127.0.0.1:8000/token_auth/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    })
      .then((response) => response.json())
      .then(async (response) => {
        console.log(await response);
        // only the token
        // console.log(response.token);

        // navigating to main page
        history.replace("/home/");
      })
      .catch((error) => {
        console.error(error);
        console.log("error has occured");
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Form.Item
          style={{ width: "30%" }}
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={
              <UserOutlined style={{ padding: "10px", borderRadius: "20px" }} />
            }
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          style={{ width: "30%" }}
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={
              <LockOutlined style={{ padding: "10px", borderRadius: "20px" }} />
            }
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item style={{ width: "30%" }}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a
            className="login-form-forgot"
            href=""
            style={{ marginLeft: "20px" }}
          >
            Forgot password
          </a>
        </Form.Item>

        <Form.Item style={{ width: "30%" }}>
          <Button
            style={{
              padding: "10px",
              width: "100%",
              // width: "80%",
              height: "50px",
              borderRadius: "5px",
              // marginLeft: "10%",
            }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
