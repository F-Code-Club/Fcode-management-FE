import { useEffect, useState } from 'react';

import { Layout, PageHeader, Breadcrumb, Modal, Badge, Dropdown, Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';

import { selectActionButtons } from '../Button/slice/selector';
import { selectTitleHeader } from '../PageHeader/slice/selector';
// import { openNotificationWithIcon } from '../ToastDemo/style';
// import { toastSuccess } from '../ToastNotification';
import StyledButton from './../Button/index';
// import { toastSuccess, toastError } from './../ToastNotification/index';
import { ButtonModalConfig } from './ModalConfig';
import { PageHeaderContainer, NotificationContainer, HeaderNotification } from './PageHeader.style';

import { actions as buttonSlice, handleClick } from '@/components/Button/slice/index';
import { actions as titleHeaderActions } from '@/components/PageHeader/slice/index';
import { selectUser } from '@/routes/Auth/slice/selector';
import NotificationCard from '@/routes/Notification/NotificationCard';
import { ArrowLeftOutlined, BellOutlined } from '@ant-design/icons';

const { Header } = Layout;

let breadcrumbNameMap = {
    '/event': 'Quản lý sự kiện',
    '/manage-resource': 'Quản lý tài nguyên',
    '/member': 'Quản lý thành viên',
    '/blog': 'Quản lý bài viết thành viên',
    '/personal-blog': 'Quản lý bài viết cá nhân',
    '/personal-blog/create': 'Tạo bài viết',
    '/personal-blog/edit': 'Chỉnh sửa bài viết',
    '/personal-blog/preview': 'Xem trước bài viết',
    '/manage-announcement': 'Quản lý thông báo',
    '/manage-announcement/view-announcement': 'Xem thông báo',
    '/information': 'Thông tin cá nhân',
    '/account': 'Quản lý tài khoản',
    '/account/edit-account': 'Chỉnh sửa thông tin',
    '/comment': 'Quản lý bình luận, câu hỏi',
    '/recruitmembers': 'Tuyển thành viên',
    '/information/view-information': 'Xem thông tin',
    '/notifications': 'Thông báo',
};
for (let i = 1; i <= 100; i++) {
    breadcrumbNameMap[`/personal-blog/${i}`] = `Chi tiết bài viết`;
    breadcrumbNameMap[`/manage-announcement/view-announcement/${i}`] = `Thông báo số ${i}`;
    breadcrumbNameMap[`/notifications/${i}`] = `Xem thông báo`;

    breadcrumbNameMap[`/manage-resource/${i}`] = `tài nguyên số ${i}`;
}
const PageHeaderComponent = () => {
    const [modal, contextHolder] = Modal.useModal();
    const userRole = useSelector(selectUser);
    const TitleHeader = useSelector(selectTitleHeader);
    const ActionButtons = useSelector(selectActionButtons);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [notificationCount, setNotificationCount] = useState(3);
    const [searchParams] = useSearchParams(location);
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });

    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/">Trang chủ</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
    // Button state
    useEffect(() => {
        const url = `/${pathSnippets.slice(0, pathSnippets.length).join('/')}`;
        dispatch(titleHeaderActions.changeTitle(breadcrumbNameMap[url] || 'Trang chủ'));
        const currentAction = searchParams.get('action') || '';
        if (currentAction === '') {
            dispatch(buttonSlice.changeButtons({ isShow: false }));
        }
    }, [location]);
    const onBack = () => {
        window.history.back();
    };
    const menu = () => {
        return (
            <NotificationContainer>
                <Menu onClick={handleClick} style={{ width: '100%' }}>
                    <HeaderNotification>
                        <h2 className="title"> Thông báo</h2>
                        <button className="btn-readAll">Đánh dấu tất cả là đã đọc</button>
                    </HeaderNotification>
                    <Menu.Item key="1">
                        <NotificationCard />
                    </Menu.Item>
                    <Menu.Item key="2">
                        <NotificationCard />
                    </Menu.Item>{' '}
                    <Menu.Item key="3">
                        <NotificationCard />
                    </Menu.Item>
                </Menu>
            </NotificationContainer>
        );
    };
    const handleButton = (button, articleId) => {
        modal.confirm(
            ButtonModalConfig(button.configs.title, button.configs.content, async () => {
                dispatch(
                    handleClick({
                        action: button.action,
                        articleId,
                        successContent: button.successContent,
                    })
                ).unwrap();
                navigate('/blog');
            })
        );
    };
    return (
        <PageHeaderContainer>
            <Header
                className="site-layout-sub-header-background"
                style={{
                    height: 100,
                    padding: 0,
                    background: 'rgb(255, 255, 255)',
                }}
            >
                <Breadcrumb>
                    {location.pathname == '/home' ? (
                        <div style={{ height: '22px' }}></div>
                    ) : (
                        extraBreadcrumbItems
                    )}
                </Breadcrumb>

                <PageHeader
                    backIcon={location.pathname !== '/home' ? <ArrowLeftOutlined /> : false}
                    className="site-page-header-responsive"
                    title={TitleHeader}
                    style={{ background: '#FFFFFF' }}
                    onBack={() => onBack()}
                    extra={[
                        ActionButtons.isShow &&
                            ActionButtons.buttons.map((button, index) => (
                                <StyledButton
                                    key={button.name + index}
                                    type={button.type}
                                    onClick={() => handleButton(button, ActionButtons.articleId)}
                                >
                                    {button.name}
                                </StyledButton>
                            )),
                        (userRole.role === 'MEMBER' || userRole.role === 'STUDENT') && (
                            <Dropdown
                                key={'notio'}
                                dropdownRender={menu}
                                // open={true}
                                trigger={['hover', 'click']}
                                style={{ minWidth: '500px', borderRadius: '10px' }}
                            >
                                <Badge
                                    dot={true}
                                    style={{ marginRight: '20px', cursor: 'pointer' }}
                                >
                                    <BellOutlined
                                        style={{
                                            fontSize: '20px',
                                            color: '#45CE7C',
                                            marginRight: '20px',
                                        }}
                                    />
                                </Badge>
                            </Dropdown>
                        ),
                    ]}
                />
            </Header>
            {contextHolder}
        </PageHeaderContainer>
    );
};

export default PageHeaderComponent;
