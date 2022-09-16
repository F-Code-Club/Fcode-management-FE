import { Layout, Menu } from 'antd';
import styled from 'styled-components';

import './style.css';

import { ReactComponent as FcodeLogo } from '@/assets/logo/logo.svg';
// import navItem from '@/components/navItem/navItem.component';
import {
    HomeOutlined,
    LogoutOutlined,
    TeamOutlined,
    CalendarOutlined,
    InboxOutlined,
    SendOutlined,
    NotificationOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Trang Chủ', '1', <HomeOutlined />),
    getItem('Sự Kiện', '2', <CalendarOutlined />),
    getItem('Tài Nguyên', '3', <InboxOutlined />),
    getItem('Bài Viết', '4', <SendOutlined />),
    getItem('Tất cả thành viên', '5', <TeamOutlined />),
    getItem('Thông báo', '6', <NotificationOutlined />),
    getItem('Thông tin cá nhân', '7', <UserOutlined />),
];

const SidebarComponent = () => {
    return (
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
    );
};

export default SidebarComponent;

export const MenuBar = styled(Menu)`
    background-color: #4d4d4d !important;
`;

export const SideBar = styled(Sider)`
    background-color: #4d4d4d !important;
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
`;
