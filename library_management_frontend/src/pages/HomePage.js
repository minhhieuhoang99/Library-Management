import React from 'react';
import Home from '../components/Home/Home'
import { Layout} from 'antd';
const { Content, Footer } = Layout;

const HomePage = () => {
    return(
        <Layout style={{ padding: '0 50px' , minHeight: "100vh"}}>
          <Content >
          <div style = {{paddingTop :50 }}></div>
          <h1 style={{ textAlign: 'center'}}> Home </h1>
            <Home/>
            </Content>
            <Footer style={{ textAlign: 'center' ,position: "sticky", bottom: "0"}}> <a href = "http://mango.viecrew.com/">Mango</a> ©2021 Created by MangoVC</Footer>
        </Layout>
    )
}
export default HomePage 