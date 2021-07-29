import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Space, Button } from "antd";
import { authHeader } from "../../../../Services/AuthService";
const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [loading, setloading] = useState(true);
  const [changes, setChanges] = useState(false);

const deleteBook = bookId =>{
  axios({
    method: "delete",
    url: `https://localhost:5001/api/book/${bookId}`,
    headers: authHeader(),
  })
    .then(() => {
      setChanges(!changes)
    })
    .catch((err) => console.log(err));
 }
const handleDelete = (id) => {
  if (window.confirm("Are you sure to delete this book?")) {
    deleteBook(id);
  }
}

  useEffect(() => {
    axios({
      method: "get",
      url: "https://localhost:5001/api/books",
      headers: authHeader(),
    })
      .then((response) => {
        setBooks(response.data);
        setloading(false);
        //setIsLoading(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, [changes]);
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
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" >
          <a href={`/admin/detailBook/${record.bookId}`}>View Detail</a>
          </Button>
          <Button type="primary" danger onClick={()=> handleDelete(record.bookId)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div>
        <Button><Link to="/admin/addBook">Add Book</Link></Button>
      </div>
      <Table columns={columns} dataSource={books} />
    </div>
  );
};
export default BookManager;