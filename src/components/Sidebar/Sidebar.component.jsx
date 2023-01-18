import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SidebarLink from '../SidebarLink';
import { Logo, SideBar, Wrapper, SignOut } from './sdiebar.style';

import { ReactComponent as FcodeLogo } from '@/assets/logo/logo.svg';
import { selectUser } from '@/routes/Auth/slice/selector';
import localStorageUtils from '@/utils/localStorageUtils';
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
    UserOutlined,
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
    getItem(
        <SidebarLink to="/manage-resource" child="Quản lý tài nguyên" />,
        '3',
        <InboxOutlined />
    ),
    getItem(<SidebarLink to="/blog" child="Quản lý bài viết" />, '4', <SendOutlined />, [
        getItem(<SidebarLink to="/personal-blog" child="Quản lý bài viết cá nhân" />, '11'),
        getItem(<SidebarLink to="/blog" child="Quản lý bài viết thành viên" />, '12'),
    ]),
    getItem(<SidebarLink to="/account" child="Quản lý tài khoản" />, '5', <TeamOutlined />, [
        getItem(<SidebarLink to="/account" child="Quản lý tài khoản" />, '5.1'),
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
const itemsUser = [
    getItem(<SidebarLink to="/home" child="Trang chủ" />, '1', <HomeOutlined />),
    getItem(<SidebarLink to="/event" child="Sự kiện" />, '2', <CalendarOutlined />),
    getItem(<SidebarLink to="/manage-resource" child="Tài nguyên" />, '3', <InboxOutlined />),
    getItem(<SidebarLink to="/personal-blog" child="Bài viết" />, '4', <SendOutlined />),
    getItem(<SidebarLink to="/account" child="Tất cả thành viên" />, '5', <TeamOutlined />),
    getItem(<SidebarLink to="/announcement" child="Thông báo" />, '6', <NotificationOutlined />),
    // [
    //     getItem(<SidebarLink to="/announcement/view-announcement" child="Xem thông báo" />, '9'),
    // ]),
    getItem(
        <SidebarLink to="/account/view-account/:id" child="Thông tin cá nhân" />,
        '7',
        <UserOutlined />
        // [getItem(<SidebarLink to="/account/view-account/:id" child="xem thông tin" />, '10')]
    ),
];

const SidebarComponent = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    return (
        <Wrapper>
            <SideBar width="250px">
                <Logo>
                    <FcodeLogo width={50} height={50} />F - CODE
                </Logo>
                <Menu
                    // defaultSelectedKeys={['1']}
                    mode="inline"
                    items={
                        user.role === 'ADMIN' || user.role === 'MANAGER' ? itemsAdmin : itemsUser
                    }
                />
                <SignOut
                    onClick={() => {
                        localStorageUtils.deleteUser();
                        navigate('/auth');
                    }}
                >
                    <LogoutOutlined style={{ paddingRight: 10 }} />
                    Đăng Xuất
                </SignOut>
            </SideBar>
        </Wrapper>
    );
};

export default SidebarComponent;
