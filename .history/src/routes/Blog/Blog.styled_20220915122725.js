import styled from 'styled-components';

export const Background = styled.div`
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e6f8ec;
`;

export const Wrapper = styled.div`
    width: 920px;
    height: 693px;
    background: #ffffff;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 22px 30px;
`;

export const Search = styled.div`
    position: absolute;
    width: 400px;
    height: 40px;
    inset: 0;
`;
