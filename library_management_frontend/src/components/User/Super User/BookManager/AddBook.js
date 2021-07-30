import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Input, Button, Layout, Select } from "antd";
// import styles from "./AddProduct.module.scss";
import { useHistory } from "react-router-dom";
import { authHeader } from "../../../../Services/AuthService";

const { Content, Footer } = Layout;
const { Option } = Select;
const AddBook = () => {
  let history = useHistory();
  const [category, setCategory] = useState([]);
  const [author, setAuthor] = useState([]);
  const [message, setMessage] = useState("");

  const onFinishFailed = () => {
    console.log("Failed:");
  };

  const onFinish = (data) => {
    const categoryData = JSON.parse(data.category);
    const categoryId = categoryData.categoryId;
    const authorData = JSON.parse(data.author);
    const authorId = authorData.authorId;
    axios({
      method: "post",
      url: "https://localhost:5001/api/book",
      headers: authHeader(),
      data: {
        description: data.description,
        image: data.image,
        title: data.title,
        authorId: authorId,
        categoryId: categoryId,
      },
    })
      .then((res) => {
        setMessage("Add book successfully!");
        history.push("/admin");
      })
      .catch((err) => console.log(err));
      
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "https://localhost:5001/api/category",
      headers: authHeader(),
    })
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios({
      method: "get",
      url: "https://localhost:5001/api/author",
      headers: authHeader(),
    })
      .then((res) => {
        setAuthor(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input Title Book!",
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
                message: "Please input image Book!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="category"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please select Category!",
              },
            ]}
          >
            <Select placeholder="Please select a Category">
              {category &&
                category.length > 0 &&
                category.map((item) => (
                  <Option value={JSON.stringify(item)} key={item.id}>
                    {item.categoryName}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="author"
            label="author"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please select your country!",
              },
            ]}
          >
            <Select placeholder="Please select a country">
              {author &&
                author.length > 0 &&
                author.map((item) => (
                  <Option value={JSON.stringify(item)} key={item.id}>
                    {item.firstName}
                  </Option>
                ))}
            </Select>
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

export default AddBook;
