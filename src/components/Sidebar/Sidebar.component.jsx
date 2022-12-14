import { Menu } from 'antd';

import SidebarLink from '../SidebarLink';
import { Logo, SideBar, Wrapper, SignOut } from './sdiebar.style';

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
        <SidebarLink to="/manage-announcement" child="Quản lý thông báo" />,
        '6',
        <NotificationOutlined />
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
//     getItem(<SidebarLink to="/announcement" child="Thông báo" />, '6', <NotificationOutlined />, [
// getItem(<SidebarLink to="/announcement/view-announcement" child="xem thông báo" />, '9'),
// ]),
//     getItem(<SidebarLink to="/information" child="Thông tin cá nhân" />, '7', <UserOutlined />,  [
// getItem(<SidebarLink to="/information/view-information" child="xem thông tin" />, '10'),
// ]),
// ];

const SidebarComponent = () => {
    return (
        <Wrapper>
            <SideBar width="250px">
                <Logo>
                    <FcodeLogo width={50} height={50} />F - CODE
                </Logo>
                <Menu mode="inline" items={itemsAdmin} />
                <SignOut>
                    <LogoutOutlined style={{ paddingRight: 10 }} />
                    Đăng Xuất
                </SignOut>
            </SideBar>
        </Wrapper>
    );
};

export default SidebarComponent;
