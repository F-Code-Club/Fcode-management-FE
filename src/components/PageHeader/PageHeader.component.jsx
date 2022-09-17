import { Layout, PageHeader, Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import { ArrowLeftOutlined } from '@ant-design/icons';

const { Header } = Layout;
// const routes = [
//     {
//         path: 'home',
//         breadcrumbName: 'Trang Chủ',
//     },
//     {
//         path: 'event',
//         breadcrumbName: 'Sự Kiện',
//     },
//     {x
//         path: 'source',
//         breadcrumbName: 'Tài Nguyên',
//     },
//     {
//         path: 'blog',
//         breadcrumbName: 'Bài Viết',
//     },
//     {
//         path: 'member',
//         breadcrumbName: 'Thành Viên',
//     },
// ];
const breadcrumbNameMap = {
    '/apps': 'Application List',
    '/apps/1': 'Application1',
    '/apps/2': 'Application2',
    '/apps/1/detail': 'Detail',
    '/apps/2/detail': 'Detail',
};
const PageHeaderComponent = () => {
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
    const routes = [
        <Breadcrumb.Item key="home">
            <Link to="/home2">Home</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
    return (
        <Header
            className="site-layout-sub-header-background"
            style={{
                height: 100,
                padding: 0,
                background: 'rgb(255, 255, 255)',
            }}
        >
            <PageHeader
                backIcon={<ArrowLeftOutlined />}
                className="site-page-header"
                title="Trang Chủ"
                style={{ background: '#FFFFFF' }}
                breadcrumb={routes}
                onBack={() => window.history.back()}
            />
        </Header>
    );
};

export default PageHeaderComponent;
