import { Outlet, useNavigate } from "react-router-dom";

import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Sider } = Layout;

const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));


const items2 = [
  {
    key: 'main1',
    label: 'subnav 1',
    icon: <UserOutlined/>,
    children: [
      {
        key: '/contacts/1',
        label: 'subnav 1-1',
      },
    ]
  },
  {
    key: 'main2',
    label: 'subnav 2',
    icon: <LaptopOutlined/>,
    children: [
      {
        key: '/contacts/2',
        label: 'subnav 2-1',
      },
    ]
  },
];



const Root = () => {
  let navigate = useNavigate();
  let menuClick = (item) => {
    console.log(item);
    navigate(item.key);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['/contacts/1']}
            defaultOpenKeys={['main1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
            onClick={menuClick}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Root;