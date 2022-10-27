import { Layout, PageHeader, Breadcrumb } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { selectActionButtons } from '../Button/slice/selector';
import { selectTitleHeader } from '../PageHeader/slice/selector';
import StyledButton from './../Button/index';
import { PageHeaderContainer } from './PageHeader.style';
import { testHandleButton } from './dummy';

import { actions as buttonActions } from '@/components/Button/slice/index';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Header } = Layout;

let breadcrumbNameMap = {
    '/event': 'Quản lý sự kiện',
    '/source': 'Quản lý tài nguyên',
    '/member': 'member',
    '/blog': 'Quản lý bài viết',
    '/announcement': 'Quản lý thông báo',
    '/information': 'Thông tin cá nhân',
    '/account': 'Quản lý tài khoản',
    '/account/edit-account': 'Chỉnh sửa thông tin',
    '/announcement/notification': 'Xem thông báo',
    '/comment': 'Quản lý bình luận, câu hỏi',
    '/recruitmembers': 'Tuyển thành viên',
    '/information/view-information': 'xem thông tin',
    '/announcement/view-announcement': 'xem thông báo',
};
for (let i = 1; i <= 100; i++) {
    breadcrumbNameMap[`/blog/${i}`] = `bài viết số ${i}`;
}
const PageHeaderComponent = () => {
    const TitleHeader = useSelector(selectTitleHeader);
    const ActionButtons = useSelector(selectActionButtons);
    const dispatch = useDispatch();
    const location = useLocation();
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
                    backIcon={<ArrowLeftOutlined />}
                    className="site-page-header-responsive"
                    title={TitleHeader}
                    style={{ background: '#FFFFFF' }}
                    onBack={() => window.history.back()}
                    extra={
                        ActionButtons.isShow &&
                        ActionButtons.buttons.map((button, index) => (
                            <StyledButton
                                key={button.name + index}
                                type={button.type}
                                onClick={() =>
                                    dispatch(buttonActions.handleHidden(testHandleButton))
                                }
                            >
                                {button.name}
                            </StyledButton>
                        ))
                    }
                />
            </Header>
        </PageHeaderContainer>
    );
};

export default PageHeaderComponent;
