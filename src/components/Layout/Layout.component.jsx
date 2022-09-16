import { Layout } from 'antd';

import ContentComponent from '@/components/Content/Content.component';
import PageHeaderComponent from '@/components/PageHeader/PageHeader.component';
import SidebarComponent from '@/components/Sidebar/Sidebar.component';

const LayoutComponent = () => {
    return (
        <Layout>
            <SidebarComponent />
            <Layout>
                <PageHeaderComponent />
                <ContentComponent />
            </Layout>
        </Layout>
    );
};

export default LayoutComponent;
