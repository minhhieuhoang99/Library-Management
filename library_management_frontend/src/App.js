import HomePage from "./pages/HomePage";
import NavBar from "./NavBar/NavBar";
import BookManager from "./components/User/Super User/BookManager/BookManager"
import EditBook from "./components/User/Super User/BookManager/EditBook"
import DetailBook from "./components/User/Super User/BookManager/DetailBook"
import BorrowManager from "./components/User/Super User/BorrowManager/BorrowManager"
import DetailBorrow from "./components/User/Super User/BorrowManager/DetailBorrow"
import CategoryManager from "./components/User/Super User/CategoryManager/CategoryManager"
import DetailCategory from "./components/User/Super User/CategoryManager/DetailCategory"
import EditCategory from "./components/User/Super User/CategoryManager/EditCategory"
import AddCategory from "./components/User/Super User/CategoryManager/AddCategory"
import AddBook from "./components/User/Super User/BookManager/AddBook"
import ListStatus from "./components/User/User/ListStatus";
import ListBorrow from "./components/User/User/ListBorrow";
import ListBook from "./components/User/User/ListBook";
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


  let userLogin = null;
  let routeLink = null;
  if (currentUser !== null) {
    if (currentUser.role === 0) {
      userLogin = <Redirect to="/admin" />;
      routeLink = (
        <>
          <Route exact path="/admin">
            <BookManager/>
          </Route>
          <Route path="/admin/addBook">
            <AddBook/>
          </Route>
          <Route path="/admin/detailBook/:bookId">
            <DetailBook/>
          </Route>
          <Route path="/admin/editBook/:bookId">
            <EditBook/>
          </Route>
          <Route path="/admin/borrowManager">
            <BorrowManager />
          </Route>
          <Route path="/admin/detailBorrow/:borrowRequestId">
            <DetailBorrow />
          </Route>
          <Route path="/admin/categoryManager">
            <CategoryManager />
          </Route>
          <Route path="/admin/detailCategory/:categoryId">
            <DetailCategory/>
          </Route>
          <Route path="/admin/editCategory/:categoryId">
            <EditCategory/>
          </Route>
          <Route path="/admin/addCategory">
            <AddCategory/>
          </Route>
        </>
      );
    } else if (currentUser.role === 1) {
      userLogin = <Redirect to="/" />;
      routeLink = (
        <>
        <Route path="/borrowedBooks">
          <ListStatus />
        </Route>
        <Route path="/bookcart">
          <ListBorrow
          />
        </Route>
        <Route exact path="/">
          <ListBook  />
        </Route>
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
              <Route path="login/">{userLogin}</Route>
              {routeLink}
            </Switch>
          </div>
        </CartContext.Provider>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
