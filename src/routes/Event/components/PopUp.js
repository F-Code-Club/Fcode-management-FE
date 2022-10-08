import styled from 'styled-components';

import { ButtonConTainer, RedButton, GreenButton } from '../styled';

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

function PopUp({ text, handleClose }) {
    return (
        <BoxContainer>
            <Container>
                <h2>{text}</h2>
                <ButtonConTainer>
                    <GreenButton>
                        <CheckCircleOutlined style={{ fontSize: '150%' }} />
                    </GreenButton>
                    <RedButton onClick={handleClose()}>
                        <CloseCircleOutlined style={{ fontSize: '150%' }} />
                    </RedButton>
                </ButtonConTainer>
            </Container>
        </BoxContainer>
    );
}

export default PopUp;
const BoxContainer = styled.div`
    height: 100vh;
    z-index: 99;
    width: 100vw;
    background: rgba(0, 0, 0, 0.38);
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Container = styled.div`
    height: 10vw;
    width: 30vw;
    background: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h2 {
        margin: 8px 12px;
    }
`;
