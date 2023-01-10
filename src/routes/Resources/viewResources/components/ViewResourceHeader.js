import { Title, Description, Wrap, HeaderStyled } from '../styled';

import localStorageUtils from '@/utils/localStorageUtils';
import usePersistedState from '@/utils/usePersistedState';

const ViewResourceHeader = ({ title, DescriptionMore, handleClick }) => {
    const roleInLocal = localStorageUtils.getItem('role');
    const role = usePersistedState('role', roleInLocal)[0];
    return (
        <Wrap>
            <Title> kỳ học: {title}</Title>
            <Description>Môn học: {DescriptionMore}</Description>
            {role === 'ADMIN' || role === 'MANAGER' ? (
                <HeaderStyled onClick={() => handleClick('create', null)}>
                    Upload Resources
                </HeaderStyled>
            ) : (
                ''
            )}
        </Wrap>
    );
};

export default ViewResourceHeader;
