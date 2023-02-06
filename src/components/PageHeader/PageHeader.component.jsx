import { useEffect, useState } from 'react';

import { Layout, PageHeader, Breadcrumb, Modal, Badge, Dropdown, Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useSearchParams, useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

import { get } from '../../utils/ApiCaller';
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
import { API_URL } from '@/config';
import { selectUser } from '@/routes/Auth/slice/selector';
import NotificationCard from '@/routes/Notification/NotificationCard';
import localStorageUtils from '@/utils/localStorageUtils';
import { ArrowLeftOutlined, BellOutlined } from '@ant-design/icons';

const { Header } = Layout;

let breadcrumbNameMap = {
    '/event': 'Quản lý sự kiện',
    '/manage-resource': 'Quản lý tài nguyên',
    '/member': 'Quản lý thành viên',
    '/blog': 'Quản lý bài viết',
    '/personal-blog': 'Quản lý bài viết cá nhân',
    '/personal-blog/create': 'Tạo bài viết',
    '/personal-blog/edit': 'Chỉnh sửa bài viết',
    '/personal-blog/preview': 'Xem trước bài viết',
    '/manage-announcement': 'Quản lý thông báo',
    '/manage-announcement/': 'Xem thông báo',
    '/information': 'Thông tin cá nhân',
    '/account': 'Quản lý tài khoản',
    '/account/edit-account': 'Chỉnh sửa thông tin',
    '/comment': 'Quản lý bình luận, câu hỏi',
    '/recruitmembers': 'Tuyển thành viên',
    '/information/view-information': 'Xem thông tin',
    '/notifications': 'Thông báo',
};

// for (let i = 1; i <= 10000; i++) {
// }
const PageHeaderComponent = () => {
    let { id } = useParams();
    breadcrumbNameMap[`/personal-blog/${id}`] = `Chi tiết bài viết`;
    breadcrumbNameMap[`/notifications/${id}`] = `Xem thông báo`;
    breadcrumbNameMap[`/manage-announcement/${id}`] = `Xem thông báo`;
    breadcrumbNameMap[`/manage-resource/${id}`] = `tài nguyên số ${id}`;
    const [modal, contextHolder] = Modal.useModal();
    const userRole = useSelector(selectUser);
    const TitleHeader = useSelector(selectTitleHeader);
    const ActionButtons = useSelector(selectActionButtons);

    const [memberAnnounce, setMemberAnnounce] = useState();
    const [notiCount, setNotiCount] = useState(0);
    const [announcements, setAnnouncements] = useState([]);
    console.log(memberAnnounce);
    let stompClient = null;
    const token = localStorageUtils.getToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

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
    useEffect(() => {
        var socket = new SockJS(`${API_URL}/websocket`);
        stompClient = over(socket);
        if (token) {
            stompClient.connect({ token: token }, function () {
                // stompClient.subscribe(`/topic/messages`, function (message) {
                //     setMessage(JSON.parse(message.body));
                // });
                stompClient.subscribe(`/user/queue/private-messages`, function (message) {
                    const announce = JSON.parse(message.body);
                    setAnnouncements((prevAnnouncements) => [...prevAnnouncements, announce]);
                    setNotiCount((prevState) => prevState + 1);
                });
            });
        }

        return () => {
            if (token) {
                stompClient.disconnect(function () {
                    console.log('Disconnected from WebSocket');
                });
            }
        };
    }, []);
    const readAllNotifications = () => {
        setAnnouncements((prevNotifications) =>
            prevNotifications.map((notification) => ({
                ...notification,
                read: true,
            }))
        );
        setNotiCount(0);
    };
    const handleReadNotification = (index) => {
        setAnnouncements((prevNotifications) =>
            prevNotifications.map((notification, i) => {
                if (notification.id == index) {
                    return { ...notification, read: true };
                }
                return notification;
            })
        );
        if (notiCount === 0) {
            return;
        } else {
            setNotiCount((prevState) => prevState - 1);
        }
    };

    useEffect(() => {
        get('/announcement/notifications', '', { authorization: token })
            .then((res) => {
                let sortData = res.data?.data?.sort((a, b) => (a.id < b.id ? 1 : -1));
                setMemberAnnounce(sortData?.splice(0, 3));
            })
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
        return () => {
            setAnnouncements((prevAnnouncements) => prevAnnouncements.slice(1));
        };
    }, [location]);
    const onBack = () => {
        window.history.back();
    };
    const onClickNotification = ({ key }) => {
        if (userRole.role === 'MEMBER' || userRole.role === 'STUDENT') {
            handleReadNotification(key);
            navigate(`/notifications/${key}`);
        } else {
            handleReadNotification(key);
            navigate(`/manage-announcement/${key}`);
        }
    };

    const menu = () => {
        let announcement1 = announcements?.reverse();
        return (
            <NotificationContainer>
                <Menu onClick={onClickNotification} style={{ width: '100%' }}>
                    <HeaderNotification>
                        <h2 className="title"> Thông báo</h2>
                        <button className="btn-readAll" onClick={readAllNotifications}>
                            Đánh dấu tất cả là đã đọc
                        </button>
                    </HeaderNotification>
                    {announcements.length !== 0 && (
                        <>
                            <h4 className="title" style={{ marginLeft: '20px' }}>
                                Mới nhất
                            </h4>
                            {announcements.map((announcement) => (
                                <Menu.Item
                                    key={`${announcement.id}`}
                                    style={{
                                        backgroundColor: announcement.read
                                            ? 'transparent'
                                            : '#E6F8EC',
                                    }}
                                >
                                    <NotificationCard announce={announcement} />
                                </Menu.Item>
                            ))}
                        </>
                    )}
                </Menu>
                <Menu onClick={onClickNotification} style={{ width: '100%' }}>
                    <h4 className="title" style={{ marginLeft: '20px' }}>
                        Gần đây
                    </h4>
                    {memberAnnounce?.map((announcement) => (
                        <Menu.Item key={announcement.id}>
                            <NotificationCard announce={announcement} />
                        </Menu.Item>
                    ))}
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
                        // (userRole.role === 'MEMBER' || userRole.role === 'STUDENT') && (
                        <Dropdown
                            key={'notio'}
                            dropdownRender={menu}
                            // open={true}
                            trigger={['hover', 'click']}
                            style={{ minWidth: '500px', borderRadius: '10px' }}
                        >
                            <Badge
                                dot={notiCount !== 0}
                                // count={notiCount}
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
                        </Dropdown>,
                        // ),
                    ]}
                />
            </Header>
            {contextHolder}
        </PageHeaderContainer>
    );
};

export default PageHeaderComponent;
