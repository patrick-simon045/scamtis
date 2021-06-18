import { Form, Input, Button, Select, Typography } from "antd";
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

const AddUE = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Typography>Add University Exam</Typography>

      <Form.Item
        name="examtype"
        label="Exam Type"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          // onChange={onGenderChange}
          allowClear
        >
          <Option value="-----">-----</Option>
          <Option value="supplimentary">supplimentary</Option>
          <Option value="special">special</Option>
          <Option value="ue">ue</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="course"
        label="Course"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="course" allowClear>
          <Option value="-----">-----</Option>
          <Option value="cs451">Cs451</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="academicYear"
        label="Academic Year"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddUE;
