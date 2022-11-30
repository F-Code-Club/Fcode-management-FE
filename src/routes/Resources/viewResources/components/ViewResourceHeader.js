import { Title, Description, Wrap, HeaderStyled } from '../styled';

const ViewResourceHeader = ({ title, DescriptionMore, handleClick }) => {
    return (
        <Wrap>
            <Title> {title}</Title>
            <Description>{DescriptionMore}</Description>
            <HeaderStyled onClick={() => handleClick('create', null)}>
                Upload Resources
            </HeaderStyled>
        </Wrap>
    );
};

export default ViewResourceHeader;
