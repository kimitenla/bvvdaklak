import { Layout } from "antd";
import { Row, Col } from "antd";
import "./layout.css";
import Header from "./header";
import Footer from "./footer";
const { Content } = Layout;
const role = localStorage.getItem("role");
const Layout1 = (props: any) => {
  if (role === "admin" || role === "manager") {
    return (
      <Layout className="layout">
        <Row>
          <Col className="row-col">
            <Header />
            <Content className="site-layout">
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 380 }}
              >
                <main>{props.children}</main>
              </div>
            </Content>
            <Footer />
          </Col>
        </Row>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Header />
        <Content className="site-layout">
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            <main>{props.children}</main>
          </div>
        </Content>
      </Layout>
    );
  }
};

export default Layout1;
