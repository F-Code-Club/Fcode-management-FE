// import { down } from 'styled-breakpoints';
import styled from 'styled-components';

import Resource_01 from '../../assets/Resource/Resource_01.jpg';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 40px 0px;
    isolation: isolate;
`;

export const Wrapper = styled.div`
    width: 1110px;
    height: 840px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
    padding: 22px 30px;
    position: relative;
`;
export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;
export const HeaderText = styled.span`
    font-style: normal;
    font-weight: 650;
    font-size: 50px;
    margin: 0;
`;

export const HeaderButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 14px;
    width: 40px;
    height: 40px;
    color: #ffffff;
    border: 1px solid #45ce7c;
    background: #45ce7c;
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
    border-radius: 5px;
    cursor: pointer;
    transition: 0.1s ease-in;
    &:hover {
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
            0px 1px 5px rgba(0, 0, 0, 0.2);
    }
`;
export const CardWrapper = styled.div`
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: flex-start;
    padding: 0px;
    border-radius: 10px;
    overflow: hidden;
    width: 519.5px;
    height: 300px;
`;
export const BackgroundCard = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 30px;
    width: 100%;
    min-height: 100%;
    background: url(${Resource_01});
`;

export const TitleResource = styled.span`
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0.15px;
    color: #ffffff;
    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
`;
export const ContentResource = styled.span`
    font-style: normal;
    font-weight: 500;
    font-size: 34px;
    letter-spacing: 0.25px;
    color: #ffffff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 3px 4px rgba(0, 0, 0, 0.14),
        0px 3px 3px rgba(0, 0, 0, 0.12), 0px 1px 8px rgba(0, 0, 0, 0.2);
`;
export const Description = styled.span`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0.15px;
    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
    color: #ffffff;
`;

export const ContentButton = styled(HeaderButton)`
    width: 56px;
    height: 32px;
    padding: 4px 15px;
`;

export const ReverseContentButton = styled(HeaderButton)`
    background: #ffffff;
    color: #000000;
    width: 56px;
    height: 32px;
    &:hover {
        color: #ffffff;
        background: #45ce7c;
    }
`;
