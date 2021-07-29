import axios from "axios";
import { useEffect, useState } from "react";
import { useParams , Link } from "react-router-dom";
import { Table ,Alert ,Spin ,Button } from 'antd';
import React from 'react';
const DetailBook = (props) => {
  const [book, setBook] = useState();
  const { bookId } = useParams();
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`https://localhost:5001/api/book/${bookId}`)
      .then((res) => {
        setBook([res.data]);
        setIsLoading(false);
        console.log("res.data",res.data)      
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
        title: "bookId",
        dataIndex: "bookId",
        key: "bookId",
      },
      {
        title: "title",
        dataIndex: "title",
        key: "title",
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
        title: "authorId",
        dataIndex: "authorId",
        key: "authorId",
      },
      {
        title: "categoryId",
        dataIndex: "categoryId",
        key: "categoryId",
      }    
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
      <h1> Book details</h1> 
      <Table dataSource={book} columns={columns}  pagination={false}  />
      <Button type="primary" >
      <Link to={`/admin/editBook/${bookId}`}>Edit Category</Link>
          </Button>
    </div>
  );
   }
};
export default DetailBook;
