import { Layout, Menu } from 'antd';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
    CommentOutlined,
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
    getItem('Trang Chủ', '1', <HomeOutlined />),
    getItem('Quản lý Sự kiện', '2', <CalendarOutlined />),
    getItem('Quản lý Tài Nguyên', '3', <InboxOutlined />),
    getItem('Quản lý Bài Viết', '4', <SendOutlined />),
    getItem('Quản lý tài khoản', '5', <TeamOutlined />, [getItem('chỉnh sửa thông tin', '9')]),
    getItem('Quản lý Thông báo', '6', <NotificationOutlined />, [getItem('xem thông báo ', '10')]),
    getItem('Tuyển thành viên', '7', <UsergroupAddOutlined />),
    getItem('Quản lý bình luận, câu hỏi', '8', <CommentOutlined />),
];
// const itemsUser = [
//     getItem(<Link to="/"> Trang Chủ</Link>, '1', <HomeOutlined />),
//     getItem(<Link to="/home2"> Sự kiện</Link>, '2', <CalendarOutlined />),
//     getItem(<Link to="/home2"> Tài Nguyên</Link>, '3', <InboxOutlined />),
//     getItem(<Link to="/home2">Bài Viết</Link>, '4', <SendOutlined />),
//     getItem(<Link to="/home2">Tất cả thành viên</Link>, '5', <TeamOutlined />),
//     getItem(<Link to="/home2"> Thông báo </Link>, '6', <NotificationOutlined />),
//     getItem(<Link to="/home2"> Thông tin cá nhân</Link>, '7', <UserOutlined />),
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
    background-color: #4d4d4d !important;
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
`;
