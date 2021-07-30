import {  Link } from "react-router-dom";
import { Layout, Menu ,Button } from "antd";
import React from "react";
import { useContext } from "react";
import UserContext from "../Context/UserContext";
import CartContext from "../Context/CartContext";
import LoginPage from "../pages/LoginPage";
const { Header } = Layout;
const NavBar = ({ logout, isUserLoggedIn }) => {
  const { Header } = Layout;
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };
  return (
    <Layout>
      {currentUser && currentUser.role === 0 && (
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" >
          <Menu.Item key="1">
            <Link to="/admin">Admin</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/admin/borrowManager">Borrow Manager</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/admin/categoryManager">Category Manager</Link>
          </Menu.Item>
          <Menu.Item key="x" disabled danger>
          <Button type="primary" shape="round" danger onClick={handleLogout}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      </Header>
      )}
      {currentUser && currentUser.role === 1 && ( 
        <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key={1}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key={2}>
            <Link to="/borrowedBooks">Borrowed Books</Link>
          </Menu.Item>
          <Menu.Item key={3}>
            <Link to="/bookcart">Cart ({cart.length})</Link>
          </Menu.Item>
          <Menu.Item key="x" disabled danger>
            <Button type="primary" shape="round" danger onClick={handleLogout}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      </Header>
      )}
      {currentUser ? (
        ""
      ) : (
        <LoginPage />
      )}
      {}
    </Layout>
  );
};
export default NavBar;
