import styled from 'styled-components';

export const Box = styled.div`
    width: min(100vw - 48px - 250px, 980px); // 48px: margin left right, 250px: sidebar width
    margin: auto;
    padding: 40px 45px;
    gap: 10px;

    background: #ffffff;

    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    /* display: flex;
    justify-content: center; */
`;
export const Title = styled.h1`
    font-size: 30px;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 20px;
`;
// export const Box = styled.div``;
