import axios from "axios";
import { useEffect, useState } from "react";
import { useParams , Link } from "react-router-dom";
import { Table ,Alert ,Spin ,Button } from 'antd';
import React from 'react';
const DetailBorrow = (props) => {
  const [borrow, setBorrow] = useState();
  const { borrowRequestId } = useParams();
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`https://localhost:5001/api/borrow/${borrowRequestId}`)
      .then((res) => {
        setBorrow(res.data);
        setIsLoading(false);
        console.log("res.data",res.data)      
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
        title: "borrowRequestId",
        dataIndex: "borrowRequestId",
        key: "borrowRequestId",
      },
      {
        title: "userId",
        dataIndex: "userId",
        key: "userId",
      },
      {
        title: "borrowFromDate",
        dataIndex: "borrowFromDate",
        key: "borrowFromDate",
      },
      {
        title: "status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "user",
        dataIndex: "user",
        key: "user",
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
      <h1> Borrow details</h1> 
      <Table dataSource={borrow} columns={columns}  pagination={false}  />
    </div>
  );
   }
};
export default DetailBorrow;
