import styled from 'styled-components';

export const Container = styled.div`
    background-color: white;
    padding: 24px;
`;

export const Header = styled.div``;

export const Title = styled.div``;
export const Body = styled.div``;
export const BoxContainer = styled.div`
    height: 100vh;
    z-index: 99;
    width: 100vw;
    background: rgba(0, 0, 0, 0.38);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const ButtonConTainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;
export const Button = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 25px;
    border-radius: 8px;
    margin: 8px 12px;
    cursor: pointer;
    /* Inside auto layout */
    flex: none;
    order: 0;
    border: 2px solid #45ce7c;
    flex-grow: 0;
    &:hover {
        background-color: #37a463;
        span {
            color: white;
        }
    }
    span {
        color: #45ce7c !important ;
        width: 14px;
        height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
export const RedButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 15px;
    gap: 10px;

    width: 55px;
    height: 30px;

    /* Character/danger */
    margin: 8px 12px;
    background: #ff4d4f;
    /* drop-shadow/button-primary */

    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
    border-radius: 2px;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;

    .anticon-close-circle {
        color: white !important;
    }
`;
export const GreenButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 15px;
    margin: 8px 12px;
    gap: 10px;

    width: 55px;
    height: 30px;

    /* Character/danger */

    background: #45ce7c;
    /* drop-shadow/button-primary */

    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
    border-radius: 2px;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
    color: white;
`;
