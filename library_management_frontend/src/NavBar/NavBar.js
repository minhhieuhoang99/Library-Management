import {  Link } from "react-router-dom";
import { Layout, Menu ,Button } from "antd";
import React from "react";
const { Header } = Layout;
const NavBar = ({ logout, isUserLoggedIn }) => {
  return (
    <Layout>
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
        </Menu>
      </Header>
    </Layout>
  );
};
export default NavBar;
