import { Form, InputNumber, Button, Select, Typography } from "antd";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    offset: 4,
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const UEResultAdd = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Typography>Add University Exam Result</Typography>

      <Form.Item
        name="score"
        label="Score"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="student"
        label="Student"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="student" allowClear>
          <Option value="-----">-----</Option>
          <Option value="lau">lau</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="ue"
        label="UE"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="course" allowClear>
          <Option value="-----">-----</Option>
          <Option value="sample course">course</Option>
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UEResultAdd;
