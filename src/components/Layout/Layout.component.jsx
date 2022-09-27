import { Layout } from 'antd';

import PageHeaderComponent from '@/components/PageHeader/PageHeader.component';
import SidebarComponent from '@/components/Sidebar/Sidebar.component';

const { Content } = Layout;
const LayoutComponent = ({ children }) => {
    return (
        <Layout>
            <SidebarComponent />
            <Layout className="site-layout" style={{ marginLeft: '200px' }}>
                <PageHeaderComponent />
                <Content
                    style={{
                        margin: '20px 16px ',
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                        }}
                    >
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutComponent;
