import { Header, HeaderText, HeaderButton, Subtitle } from '../styles';

import { PlusSquareOutlined } from '@ant-design/icons';

const HeaderResource = ({ handleClick }) => {
    return (
        <Header>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '0px',
                    width: '312px',
                    height: '110px',
                }}
            >
                <HeaderText> Tài nguyên</HeaderText>
                <Subtitle>Quản lý tài nguyên</Subtitle>
            </div>
            <HeaderButton onClick={() => handleClick('create', null)}>
                <PlusSquareOutlined />
            </HeaderButton>
        </Header>
    );
};

export default HeaderResource;
