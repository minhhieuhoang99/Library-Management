import HomePage from "./pages/HomePage";
import Home from "./components/Home/Home";
import NavBar from "./NavBar/NavBar";
import AddBook from "./components/User/Super User/BookManager/AddBook"
import CartContext from "./Context/CartContext";
import UserContext from "./Context/UserContext";
import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React from "react";
import { authHeader } from "./Services/AuthService";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setCurrentUser(JSON.parse(token));
    }
  }, []);
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);

  const addBookToCart = (book) => {
    if (cart) {
      setCart([...cart, book]);
      window.localStorage.setItem("cart", JSON.stringify([...cart, book]));
    } else {
      setCart([book]);
      window.localStorage.setItem("cart", JSON.stringify([book]));
    }
  };

  const removerBookFromCart = (bookId) => {
    if (cart) {
      const index = cart.findIndex((item) => item.id === bookId);
      cart.splice(index, 1);
      setCart(cart);
    }
  };

  const handleBorrowBook = () => {
    const books = {
      borrowRequestDetails: [],
    };
    if (cart) {
      for (let item of cart) {
        books.borrowRequestDetails.push(item.id);
      }

      (async () => {
        axios({
          method: "post",
          url: `https://localhost:44301/api/borrow/${currentUser.UserId}`,
          headers: authHeader(),
          data: books,
        }).catch((err) => {
          if (err.response.status === 400) {
            alert(
              "Bạn chỉ được mượn tối đa 3 lần trong một tháng và mỗi lần chỉ được mượn 5 cuốn sách"
            );
          }
        });
      })();
    }
  };
  console.log(cart);
  let userLogin = null;
  let routeLink = null;
  if (currentUser !== null) {
    if (currentUser.role === 0) {
      userLogin = <Redirect to="/admin" />;
      routeLink = (
        <>
          <Route exact path="/admin">
            <HomePage/>
          </Route>
          <Route path="/admin/addBook">
            <AddBook/>
          </Route>
        </>
      );
    } else if (currentUser.role === 1) {
      userLogin = <Redirect to="/" />;
      routeLink = (
        <>
          <Route path="/borrowedBooks"></Route>
        </>
      );
    }
  } else {
    userLogin = <LoginPage />;
  }

  if (currentUser && currentUser.role === 0) {
  }

  return (
    <Router>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <div className="a">
            <NavBar />
            <Switch>
              <Route path="/">{userLogin}{routeLink}</Route>
            </Switch>
          </div>
        </CartContext.Provider>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
