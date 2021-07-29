import axios from "axios";
import { useEffect, useState } from "react";
import { useParams , Link } from "react-router-dom";
import { Table ,Alert ,Spin ,Button } from 'antd';
import React from 'react';
const DetailCategory = (props) => {
  const [category, setCategory] = useState();
  const { categoryId } = useParams();
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`https://localhost:5001/api/category/${categoryId}`)
      .then((res) => {
        setCategory([res.data]);
        setIsLoading(false);
        console.log("res.data",res.data)      
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      title: "categoryId",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "categoryName",
      dataIndex: "categoryName",
      key: "categoryName",
    },    
  ];
  if (isloading) {
    return (<Spin tip="Loading...">
    <Alert
      message="Alert message title"
      description="Further details about the context of this alert."
      type="info"
    />
  </Spin>);
  } else {
   return (
    <div>
      <h1> Category details</h1> 
      <Table dataSource={category} columns={columns}  pagination={false}  />
      <Button type="primary">
      <Link to={`/admin/editCategory/${categoryId}`}>Edit Category</Link>
          </Button>
    </div>
  );
   }
};
export default  DetailCategory;
