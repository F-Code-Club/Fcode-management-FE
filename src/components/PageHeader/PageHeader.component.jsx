import { Layout, PageHeader, Breadcrumb } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { selectActionButtons } from '../Button/slice/selector';
import { selectTitleHeader } from '../PageHeader/slice/selector';
import StyledButton from './../Button/index';
import { testHandleButton } from './dummy';

import { actions as buttonActions } from '@/components/Button/slice/index';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Header } = Layout;

const breadcrumbNameMap = {
    '/home': 'Trang chu',
    '/event': 'event',
    '/source': 'source',
    '/member': 'member',
    '/blog': 'blog',
    '/announcement': 'announcement',
    '/information': 'information',
};

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
            <Link to="/">Home</Link>
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
                            onClick={() => dispatch(buttonActions.handleHidden(testHandleButton))}
                        >
                            {button.name}
                        </StyledButton>
                    ))
                }
            />
        </Header>
    );
};

export default PageHeaderComponent;
