import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, Alert, Layout, Select } from "antd";
// import styles from "./AddProduct.module.scss";
import { authHeader } from "../../../../Services/AuthService";

const { Content, Footer } = Layout;
const { Option } = Select;
const AddCategory = () => {
  let history = useHistory();
  const [category, setCategory] = useState([]);
  const [author, setAuthor] = useState([]);
  const [message, setMessage] = useState("");
  const {
    reset,
    formState: { errors },
  } = useForm();

  const onFinishFailed = () => {
    console.log("Failed:");
  };

  const onFinish = (data) => {
      axios({
        method: "post",
        url: "https://localhost:5001/api/category",
        headers: authHeader(),
        data: {
          description : data.description,
          image : data.image,
          categoryName : data.categoryName,
        },
      })
        .then((res) => {
          reset();
          setMessage("Add book successfully!");
          history.push("/admin/categoryManager");
        })
        .catch((err) => console.log(err));
  };

  return (
    <Layout style={{ padding: "0 50px", minHeight: "100vh" }}>
      <div style={{ paddingTop: 50 }}></div>
      <Content>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 8,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="categoryName"
            label="categoryName"
            rules={[
              {
                required: true,
                message: "Please input categoryName!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="image"
            rules={[
              {
                required: true,
                message: "Please input image category!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <Footer style={{ textAlign: "center", position: "sticky", bottom: "0" }}>
        {" "}
        <a href="http://mango.viecrew.com/">Mango</a> ©2021 Created by MangoVC
      </Footer>
    </Layout>
  );
};

export default AddCategory;
