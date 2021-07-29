import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { authHeader } from "../../../Services/AuthService";
import CartContext from "../../../Context/CartContext";

import { Table, Space, Button } from "antd";

const ListBook=() =>{
  const [book, setBooks] = useState([]);
  const { cart, setCart} = useContext(CartContext);
  const addBookToCart = (_book) => {
    if (cart) {
      setCart([...cart, _book]);
      window.localStorage.setItem("cart", JSON.stringify([...cart, _book]));
    } else {
      setCart([_book]);
      window.localStorage.setItem("cart", JSON.stringify([_book]));
    }
  };
  useEffect(() => {
    (async () => {
      axios({
        method: "get",
        url: "https://localhost:5001/api/books",
        headers: authHeader(),
      })
        .then((res) => {
          setBooks(res.data);
        })
        .catch((err) => console.log(err));
    })();
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
          <Button type="primary" onClick={() => addBookToCart(record)}>
            Add to carts
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={book} />
    </div>
  );
}
export default ListBook;
