import styled from 'styled-components';

import { HeaderButton } from '../styles';

import { themes } from '@/theme/theme';

export const ViewResourceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 40px 0px;
`;
export const WrapperViewResource = styled.div`
    width: 1110px;
    // height: 840px;
    // min-height: 400px;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    align-items: center;
    background: ${themes.colors.light};
    border-radius: 10px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
    padding: 22px 30px;
    position: relative;
    overflow: hidden;
`;
export const Wrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
`;
export const Title = styled.span`
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    text-transform: uppercase;
    color: ${themes.colors.dark};
`;

export const Description = styled.span`
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #a6a6a6;
`;
export const HeaderStyled = styled(HeaderButton)`
    width: 150px;
    height: 40px;
`;

export const WrapperTabs = styled.div`
    margin-top: 20px;
    // width: 1050px;
    // height: 800px;
`;
export const WrapperStyled = styled(WrapperTabs)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    overflow-y: none;
`;
export const WrapperStyledEmpty = styled(WrapperStyled)`
    width: 100%;
    height: 100%;
`;
export const ResourceCardContainer = styled.div`
    width: 1024px;
    height: 160px;
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    align-items: center;
    background: #e6f8ec;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
        0px 1px 3px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
`;
export const ResourceImage = styled.div`
    width: 255px;
    height: 160px;
    background: ${({ url }) => (url ? `url(${url})` : null)};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;
export const WrapperContent = styled.div`
    width: 780px;
    height: 160px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
export const TextTitle = styled.span`
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    & .anticon {
        margin-left: 10px;
        color: ${themes.colors.primary400};
    }
`;
