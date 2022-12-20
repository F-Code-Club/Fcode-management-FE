import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import PageHeaderComponent from '@/components/PageHeader/PageHeader.component';
import SidebarComponent from '@/components/Sidebar/Sidebar.component';
import { themes } from '@/theme/theme';

const { Content } = Layout;
const LayoutComponent = () => {
    return (
        <Layout>
            <SidebarComponent />
            <Layout
                className="site-layout"
                style={{ background: `${themes.colors.primary050}`, marginLeft: '250px' }}
            >
                <PageHeaderComponent />
                <Content style={{ margin: '20px 16px' }}>
                    <div className="site-layout-background">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutComponent;
