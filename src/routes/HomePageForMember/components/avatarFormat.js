import styled from 'styled-components';

export const ProfileImage = (props) => {
    return (
        <StyledProfileImage {...props}>
            <img src={props.src} alt="Avatar" title="Avatar" />
        </StyledProfileImage>
    );
};

export const StyledProfileImage = styled.div`
    position: relative;
    width: ${(props) => props.size || '50'}px;
    height: ${(props) => props.size || '50'}px;
    overflow: hidden;
    border-radius: 50%;
    flex-shrink: 0;

    & > img {
        width: auto;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
`;
