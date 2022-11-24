import { Header, HeaderText, HeaderButton } from '../styles';

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
                <span
                    style={{
                        fontWeight: 400,
                        fontSize: 16,
                        letterSpacing: 0.15,
                        color: '#767676',
                    }}
                >
                    Quản lý tài nguyên
                </span>
            </div>
            <HeaderButton onClick={() => handleClick('create', null)}>
                <PlusSquareOutlined />
            </HeaderButton>
        </Header>
    );
};

export default HeaderResource;
