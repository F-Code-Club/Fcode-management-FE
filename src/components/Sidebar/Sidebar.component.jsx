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
    NotificationOutlined,
    UsergroupAddOutlined,
    CommentOutlined, // UserOutlined,c
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

const itemsAdmin = [
    getItem(<SidebarLink to="/home" child="Trang Chủ" />, '1', <HomeOutlined />),
    getItem(<SidebarLink to="/event" child="Quản lý sự kiện" />, '2', <CalendarOutlined />),
    getItem(<SidebarLink to="/source" child="Quản lý tài nguyên" />, '3', <InboxOutlined />),
    getItem(<SidebarLink to="/blog" child="Quản lý bài viết" />, '4', <SendOutlined />),
    getItem(<SidebarLink to="/account" child="Quản lý tài khoản" />, '5', <TeamOutlined />, [
        getItem(<SidebarLink to="/account/edit-account" child="Chỉnh sửa thông tin" />, '9'),
    ]),
    getItem(
        <SidebarLink to="/announcement" child="Quản lý thông báo" />,
        '6',
        <NotificationOutlined />,
        [getItem(<SidebarLink to="/announcement/notification" child="Xem thông báo" />, '10')]
    ),
    getItem(
        <SidebarLink to="/recruitmembers" child="Tuyển thành viên" />,
        '7',
        <UsergroupAddOutlined />
    ),
    getItem(
        <SidebarLink to="/comment" child="Quản lý bình luận, câu hỏi" />,
        '8',
        <CommentOutlined />
    ),
];
// const itemsUser = [
//     getItem(<SidebarLink to="/home" child="Trang Chủ" />, '1', <HomeOutlined />),
//     getItem(<SidebarLink to="/event" child="Sự kiện" />, '2', <CalendarOutlined />),
//     getItem(<SidebarLink to="/source" child="Tài Nguyên" />, '3', <InboxOutlined />),
//     getItem(<SidebarLink to="/blog" child="Bài Viết" />, '4', <SendOutlined />),
//     getItem(<SidebarLink to="/member" child="Tất cả thành viên" />, '5', <TeamOutlined />),
//     getItem(<SidebarLink to="/announcement" child="Thông báo" />, '6', <NotificationOutlined />),
//     getItem(<SidebarLink to="/information" child="Thông tin cá nhân" />, '7', <UserOutlined />),
// ];

const SidebarComponent = () => {
    return (
        <SideBar>
            <div className="logo">
                <FcodeLogo width={50} height={50} />F - CODE
            </div>
            <MenuBar mode="inline" items={itemsAdmin} />
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
