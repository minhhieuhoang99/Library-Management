import { authHeader } from "../../../Services/AuthService";
import CartContext from "../../../Context/CartContext";
import UserContext from "../../../Context/UserContext";
import { useContext, useEffect } from "react";
import { Table, Space, Button } from "antd";
import axios from "axios";
const ListBorrow = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const removerBookFromCart = (bookId) => {
    if (cart) {
      const index = cart.findIndex((item) => item.id === bookId); //tim vi tri can xoa
      cart.splice(index, 1); //xoa di 1 don vi tai index
      setCart(cart);
    }
  };
  const handleBorrowBook = () => {
    const books = {
      borrowRequestDetails: [],
    };
    if (cart) {
      for (let item of cart) {
        books.borrowRequestDetails.push({ bookId: item.bookId });
      }

      axios({
        method: "post",
        url: `https://localhost:5001/api/borrow/${currentUser.userId}`,
        headers: authHeader(),
        data: {
        Id : currentUser.userId,
        UserId : currentUser.userId,
        BorrowFromDate : currentUser.borrowFromDate,
        Status : 0,
        },

      }).catch((err) => {
        if (err.response.status === 400) {
          alert(
            "Bạn chỉ được mượn tối đa 3 lần trong một tháng và mỗi lần chỉ được mượn 5 cuốn sách"
          );
        }
      });
    }
  };

  useEffect(() => {}, [cart]);
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
          <Button
            type="primary"
            danger
            onClick={() => removerBookFromCart(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={cart} />
      <Button type="primary" onClick={handleBorrowBook}>
        Borrow
      </Button>
    </div>
  );
};
export default ListBorrow;
