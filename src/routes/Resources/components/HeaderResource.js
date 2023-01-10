import { Header, HeaderText, HeaderButton, Subtitle } from '../styles';

import localStorageUtils from '@/utils/localStorageUtils';
import usePersistedState from '@/utils/usePersistedState';
import { PlusSquareOutlined } from '@ant-design/icons';

const HeaderResource = ({ handleClick }) => {
    const roleInLocal = localStorageUtils.getItem('role');
    const role = usePersistedState('role', roleInLocal)[0];

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
            {role === 'ADMIN' || role === 'MANAGER' ? (
                <HeaderButton
                    onClick={() => {
                        handleClick('create', null);
                    }}
                >
                    <PlusSquareOutlined />
                </HeaderButton>
            ) : (
                ''
            )}
        </Header>
    );
};

export default HeaderResource;
