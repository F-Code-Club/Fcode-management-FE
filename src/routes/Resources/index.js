// import * as Styled from '../Blog/Blog.styled';
import HeaderResource from './components/HeaderResource';
import ListResource from './components/ListResouce';
import ModalResource from './components/ModalResource';
import { Wrapper, Container } from './styles';

const ResourcesSection = () => {
    return (
        <>
            <Container>
                <Wrapper>
                    <ModalResource />
                    <HeaderResource />
                    <ListResource />
                </Wrapper>
            </Container>
        </>
    );
};

export default ResourcesSection;
