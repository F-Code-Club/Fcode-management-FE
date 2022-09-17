import { Layout, PageHeader } from 'antd';

import { ArrowLeftOutlined } from '@ant-design/icons';

const { Header } = Layout;
const routes = [
    {
        path: 'home',
        breadcrumbName: 'Trang Chủ',
    },
    {
        path: 'event',
        breadcrumbName: 'Sự Kiện',
    },
    {
        path: 'source',
        breadcrumbName: 'Tài Nguyên',
    },
    {
        path: 'blog',
        breadcrumbName: 'Bài Viết',
    },
    {
        path: 'member',
        breadcrumbName: 'Thành Viên',
    },
];

const PageHeaderComponent = () => {
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
                breadcrumb={{ routes }}
                onBack={() => window.history.back()}
            />
        </Header>
    );
};

export default PageHeaderComponent;
