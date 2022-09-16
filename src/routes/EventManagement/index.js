import { useState } from 'react';

import { Breadcrumb, PageHeader, Button } from 'antd';
import styled from 'styled-components';

import AddEventBox from './components/AddEventBox';
import MyCalender from './components/MyCalender';
import './index.css';

import px2vw from '@/utils/px2vw';
import { SearchOutlined, PlusSquareOutlined } from '@ant-design/icons';

function Event() {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <BigContainer>
                <SideBar />
                <Container>
                    <Header>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <a href="/">Trang chủ</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Quản lý Sự Kiện</Breadcrumb.Item>
                        </Breadcrumb>
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="Quản Lý sự kiện"
                        />
                    </Header>
                    <ButtonContainer>
                        <CustomButton type="primary">
                            <SearchOutlined />
                        </CustomButton>
                        <CustomButton type="primary" onClick={() => setOpen(true)}>
                            <PlusSquareOutlined />
                        </CustomButton>
                    </ButtonContainer>
                    <Main>
                        <MyCalender />
                    </Main>
                </Container>
            </BigContainer>

            {isOpen && (
                <BoxContainer>
                    <AddEventBox handle={() => setOpen(false)}></AddEventBox>
                </BoxContainer>
            )}
        </>
    );
}

export default Event;

const BigContainer = styled.div`
    display: flex;
`;
const SideBar = styled.div`
    height: 100vh;
    width: ${px2vw(250)};
    background: #424141;
`;
const Header = styled.div`
    background: #ffffff;
`;
const Container = styled.div`
    width: 100%;
    height: 100%;
    background: #e6f8ec;
`;
const Main = styled.div`
    width: 100%;
    height: calc(100vh - ${px2vw(120)});
    display: flex;
    align-items: center;
    justify-content: center;
`;
const CustomButton = styled(Button)`
    margin: 0 12px;
    background: #45ce7c !important ;
    border-color: #45ce7c !important ;
    &:hover {
        color: black !important;
        background: #a5e7c0 !important;
        border-color: #a5e7c0 !important ;
    }
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: end;
`;
const BoxContainer = styled.div`
    height: 100vh;
    z-index: 99;
    width: 100vw;
    background: rgba(0, 0, 0, 0.38);
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;
