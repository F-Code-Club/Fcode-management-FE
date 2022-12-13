import { Title, Description, Wrap, HeaderStyled } from '../styled';

const ViewResourceHeader = ({ title, DescriptionMore, handleClick }) => {
    console.log(DescriptionMore);
    return (
        <Wrap>
            <Title> kỳ học: {title}</Title>
            <Description>Môn học: {DescriptionMore}</Description>
            <HeaderStyled onClick={() => handleClick('create', null)}>
                Upload Resources
            </HeaderStyled>
        </Wrap>
    );
};

export default ViewResourceHeader;
