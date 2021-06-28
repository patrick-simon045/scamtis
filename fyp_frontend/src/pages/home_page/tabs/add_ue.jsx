import { Form, Button, Select, Typography } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";

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
    const options = {
      headers: {
        Accept: "text/plain,*/*",
        "Content-Type": "application/json",
      },
    };
    const url = "http://127.0.0.1:8000/api/add-ue/";
    const data = JSON.stringify(values);
    axios.post(url, data, options).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(JSON.stringify(values));
    return <Redirect to="/home/ue" />;
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Typography>Add University Exam</Typography>

      <Form.Item
        name="academic_year"
        label="Academic Year"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="academic year" allowClear>
          <option value="2020/2021">2020/2021</option>
          {/* <option value="2021/2022">2021/2022</option>
          <option value="2022/2023">2022/2023</option>
          <option value="2023/2024">2023/2024</option>
          <option value="2024/2025">2024/2025</option>
          <option value="2025/2026">2025/2026</option> */}
        </Select>
      </Form.Item>

      <Form.Item
        name="exam_type"
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
          <Option value="UE">UE</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="date_taken"
        label="Date Time"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <input type="datetime-local" />
      </Form.Item>
      <Form.Item
        name="number_of_questions"
        label="number of questions"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <input type="number" />
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
          <Option value="cs 451">cs 451</Option>
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

export default AddUE;
