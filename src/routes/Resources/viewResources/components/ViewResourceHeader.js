import { useSelector } from 'react-redux';

import { Title, Description, Wrap, HeaderStyled } from '../styled';

import { selectUser } from '@/routes/Auth/slice/selector';

const ViewResourceHeader = ({ title, DescriptionMore, handleClick }) => {
    const userRole = useSelector(selectUser);

    return (
        <Wrap>
            <Title> kỳ học: {title}</Title>
            <Description>Môn học: {DescriptionMore}</Description>
            {userRole.role === 'ADMIN' || userRole.role === 'MANAGER' ? (
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
