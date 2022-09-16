import { Layout } from 'antd';

const { Content } = Layout;
const ContentComponent = () => {
    return (
        <Content
            style={{
                margin: '20px 16px ',
            }}
        >
            <div
                className="site-layout-background"
                style={{
                    background: '#FFFFFF',
                    padding: 24,
                    minHeight: 422,
                }}
            >
                this is content area
            </div>
        </Content>
    );
};

export default ContentComponent;
