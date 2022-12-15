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
    padding: 0 0.75rem;
    color: ${themes.colors.high_contrast};
    font-size: ${28 / 14}rem;
    font-weight: 500;
    text-align: center;
    font-family: 'Inter', sans-serif;
    & strong {
        font-weight: 900;
    }
`;

export const LoginHeading = (props) => {
    return <StyledHeading>{props.children}</StyledHeading>;
};

export const StyledDescription = styled.p`
    color: ${themes.colors.lowContrast};
    font-size: 0.75rem;
    font-weight: 500;
    text-align: center;
`;

export const LoginDescription = (props) => {
    return <StyledDescription>{props.children}</StyledDescription>;
};

export const LoginDivider = styled(Divider)`
    margin: 20px 0px;
`;

export const LoginButton = styled.a`
    font-size: 0.8em;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0.5rem 2rem;
    width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
    background-color: ${themes.colors.light};
    color: ${themes.colors.lowContrast};
    border: none;
    border-radius: 10px;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    text-decoration: none;
    filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.14))
        drop-shadow(0px 2px 1px rgba(0, 0, 0, 0.12)) drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.2));

    &:hover {
        color: ${themes.colors.high_contrast};
        opacity: 0.75;
    }
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
