/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-unresolved
import { Layout, PageHeader, Menu } from 'antd';
import styled from 'styled-components';

import './style.css';

import { ReactComponent as FcodeLogo } from '@/assets/logo/logo.svg';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const routes = [
    {
        path: 'index',
        breadcrumbName: 'First-level Menu',
    },
    {
        path: 'first',
        breadcrumbName: 'Second-level Menu',
    },
    {
        path: 'second',
        breadcrumbName: 'Third-level Menu',
    },
];
const items = [
    getItem('Trang chủ', '1', <HomeOutlined />, [
        getItem('Quản lý tài khoản', 'manageAccount'),
        getItem('Quản lý sự kiện', 'manageEvent'),
        getItem('Quản lý thông báo', 'manageAnnouncement'),
        getItem('Quản lý tuyển thành viên', 'manageUser'),
        getItem('Quản lý bình luận', 'manageComment'),
        getItem('Quản lý tài nguyên', 'manageResource'),
        getItem('Quản lý bài viết', 'manageBlog'),
    ]),
];

const AppSidebar = () => {
    return (
        <Layout>
            <SideBar>
                <div className="logo">
                    <FcodeLogo width={50} height={50} />F - CODE
                </div>
                <MenuBar mode="inline" items={items} />
                <div className="signOut">
                    <LogoutOutlined style={{ paddingRight: 10 }} />
                    Đăng Xuất
                </div>
            </SideBar>
            <Layout>
                <Header
                    className="site-layout-sub-header-background"
                    style={{
                        height: 100,
                        padding: 0,
                        background: 'rgb(255, 255, 255)',
                    }}
                >
                    <PageHeader
                        className="site-page-header"
                        title="Title"
                        style={{ background: '#FFFFFF' }}
                        breadcrumb={{ routes }}
                        subTitle="This is a subtitle"
                    />
                </Header>
                <Content
                    style={{
                        margin: '20px 16px ',
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            background: '#FFFFFF',
                            padding: 24,
                            minHeight: 422,
                        }}
                    >
                        this is content area
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppSidebar;

export const SideBar = styled(Sider)`
    background-color: #4d4d4d !important;
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
`;

export const MenuBar = styled(Menu)`
    background-color: #4d4d4d !important;
`;
