import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { authHeader } from "../../../../Services/AuthService";
import { Form, Input, Button, Checkbox, Alert, Layout, Select } from "antd";
import { useHistory } from "react-router-dom";
const { Content, Footer } = Layout;
const { Option } = Select;
const EditCategory=()=> {
  let history = useHistory();
  const [form] = Form.useForm();
  const [category, setCategory] = useState([]);
  const [message, setMessage] = useState("");
  const { categoryId } = useParams();

  
  const onFinishFailed = () => {
    console.log("Failed:");
  };
  const onFinish = (data) => {

    (async () => {
      axios({
        method: "put",
        url: `https://localhost:5001/api/category/${categoryId}`,
        headers: authHeader(),
        data: {
          categoryId : categoryId,
          description : data.description,
          image : data.image,
          categoryName : data.categoryName,
        },
      })
        .then((res) => {
          console.log("onFinish")
          setMessage("Update successfully!");
          history.push("/admin/categoryManager");
        })
        .catch((err) => console.log(err));
    })();
  }


  useEffect(() => {
    (async () => {
      axios({
        method: "get",
        url: `https://localhost:5001/api/category/${categoryId}`,
        headers: authHeader(),
      })
      .then((res) => {
        setCategory(res.data);
      })
        .catch((err) => console.log(err));
    })();
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
            name="categoryName"
            label="categoryName"
            
            rules={[
              {
                required: true,
                message: "Please input categoryName !",
                whitespace: true,
              },
            ]}
          >
            {/* {getFieldDecorator('name', { rules: rules.name })(<Input />)} */}
            <Input/>
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
}

export default EditCategory;
