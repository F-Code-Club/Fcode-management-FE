import styled from 'styled-components';

import FCodeLogo from '../../assets/logo/F-Code.png';
// import { Button } from '../../components/Button';
import Divider from '../../components/Divider/index';
import Wrapper from '../../components/Wrapper/index';

import { themes } from '@/theme/theme';

// import Avatar from './../../asset/image/Avatar.png'

export const PageWrapper = styled.div``;

export const StyledLogo = styled.div`
    width: ${(props) => props.size || 50}px;
    height: ${(props) => props.size || 50}px;
    overflow: hidden;
    border-radius: 5px;

    & img {
        width: 100%;
        height: auto;
    }
`;

export const Logo = (props) => {
    return (
        <StyledLogo size={props.size}>
            <img src={FCodeLogo} alt="F-Code logo" />
        </StyledLogo>
    );
};

export const LoginWrapper = styled(Wrapper)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const StyledHeading = styled.h1`
    margin-top: 20px;
    color: ${themes.high_contrast};
    font-size: ${18 / 14}rem;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    & strong {
        font-weight: 900;
    }
`;

export const LoginHeading = (props) => {
    return <StyledHeading>{props.children}</StyledHeading>;
};

export const StyledDescription = styled.p`
    margin-top: 10px;
    color: ${themes.low_contrast};
    font-size: 0.75rem;
    font-weight: 500;
`;

export const LoginDescription = (props) => {
    return <StyledDescription>{props.children}</StyledDescription>;
};

export const LoginDivider = styled(Divider)`
    margin: 30px 0 20px 0;
`;

export const LoginButton = styled.button`
    font-size: 0.8em;
`;

export const StyledLoginCredit = styled.a`
    position: absolute;
    bottom: 2rem;
    margin: 0 auto;
    font-size: 0.65em;
    font-weight: 500;

    & > strong {
        font-weight: 700;
    }
`;

export const LoginCredit = (props) => {
    return <StyledLoginCredit>{props.children}</StyledLoginCredit>;
};
