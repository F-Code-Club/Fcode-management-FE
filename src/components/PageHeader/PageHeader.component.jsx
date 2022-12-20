import { useEffect } from 'react';

import { Layout, PageHeader, Breadcrumb, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';

import { selectActionButtons } from '../Button/slice/selector';
import { selectTitleHeader } from '../PageHeader/slice/selector';
// import { openNotificationWithIcon } from '../ToastDemo/style';
// import { toastSuccess } from '../ToastNotification';
import StyledButton from './../Button/index';
// import { toastSuccess, toastError } from './../ToastNotification/index';
import { ButtonModalConfig } from './ModalConfig';
import { PageHeaderContainer } from './PageHeader.style';

import { actions as buttonSlice, handleClick } from '@/components/Button/slice/index';
import { actions as titleHeaderActions } from '@/components/PageHeader/slice/index';
import { ArrowLeftOutlined } from '@ant-design/icons';

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
};
for (let i = 1; i <= 100; i++) {
    breadcrumbNameMap[`/personal-blog/${i}`] = `Chi tiết bài viết`;
    breadcrumbNameMap[`/manage-announcement/view-announcement/${i}`] = `Thông báo số ${i}`;
    breadcrumbNameMap[`/manage-resource/${i}`] = `tài nguyên số ${i}`;
}
const PageHeaderComponent = () => {
    const [modal, contextHolder] = Modal.useModal();
    const TitleHeader = useSelector(selectTitleHeader);
    const ActionButtons = useSelector(selectActionButtons);
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
    const onBack = () => {
        window.history.back();
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
                <Breadcrumb>{breadcrumbItems}</Breadcrumb>
                <PageHeader
                    backIcon={location.pathname !== '/home' ? <ArrowLeftOutlined /> : false}
                    className="site-page-header-responsive"
                    title={TitleHeader}
                    style={{ background: '#FFFFFF' }}
                    onBack={() => onBack()}
                    extra={
                        ActionButtons.isShow &&
                        ActionButtons.buttons.map((button, index) => (
                            <StyledButton
                                key={button.name + index}
                                type={button.type}
                                onClick={() => handleButton(button, ActionButtons.articleId)}
                            >
                                {button.name}
                            </StyledButton>
                        ))
                    }
                />
            </Header>
            {contextHolder}
        </PageHeaderContainer>
    );
};

export default PageHeaderComponent;
