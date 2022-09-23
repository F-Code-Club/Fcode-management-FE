import { Layout, Menu } from 'antd';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SidebarLink from '../SidebarLink';
import './style.css';

import { ReactComponent as FcodeLogo } from '@/assets/logo/logo.svg';
import {
    HomeOutlined,
    LogoutOutlined,
    TeamOutlined,
    CalendarOutlined,
    InboxOutlined,
    SendOutlined,
    NotificationOutlined, // UsergroupAddOutlined,
    // CommentOutlined,
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

// const itemsAdmin = [
//     getItem('Trang Chủ', '1', <HomeOutlined />),
//     getItem('Quản lý Sự kiện', '2', <CalendarOutlined />),
//     getItem('Quản lý Tài Nguyên', '3', <InboxOutlined />),
//     getItem('Quản lý Bài Viết', '4', <SendOutlined />),
//     getItem('Quản lý tài khoản', '5', <TeamOutlined />, [getItem('chỉnh sửa thông tin', '9')]),
//     getItem('Quản lý Thông báo', '6', <NotificationOutlined />, [getItem('xem thông báo ', '10')]),
//     getItem('Tuyển thành viên', '7', <UsergroupAddOutlined />),
//     getItem('Quản lý bình luận, câu hỏi', '8', <CommentOutlined />),
// ];
const itemsUser = [
    getItem(<SidebarLink to="/home" child="Trang Chủ" />, '1', <HomeOutlined />),
    getItem(<SidebarLink to="/event" child="Sự kiện" />, '2', <CalendarOutlined />),
    getItem(<SidebarLink to="/source" child="Tài Nguyên" />, '3', <InboxOutlined />),
    getItem(<SidebarLink to="/blog" child="Bài Viết" />, '4', <SendOutlined />),
    getItem(<SidebarLink to="/member" child="Tất cả thành viên" />, '5', <TeamOutlined />),
    getItem(<SidebarLink to="/announcement" child="Thông báo" />, '6', <NotificationOutlined />),
    getItem(<SidebarLink to="/information" child="Thông tin cá nhân" />, '7', <UserOutlined />),
];

const SidebarComponent = () => {
    return (
        <SideBar>
            <div className="logo">
                <FcodeLogo width={50} height={50} />F - CODE
            </div>
            <MenuBar mode="inline" items={itemsUser} />
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
    width: 300px !important;
    background-color: #4d4d4d !important;
    /* overflow: auto; */
    position: fixed !important;
    height: 100vh;
    top: 0;
    bottom: 0;
    left: 0;
`;
