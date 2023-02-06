import styled from 'styled-components';

/**
 * This function return the number in a pixel string
 * @param {string} str to be matched
 * @returns {number} number
 */
const parsePixelNumber = (str) => {
    const regex = new RegExp('([0-9]+)(px)?', 'g');
    const match = regex.exec(str);
    return match ? match[1] : null;
};

const StyledFlexbox = styled.div`
    width: ${(props) => (props.width ? `${props.width}` : '100%')};
    height: ${(props) => (props.height ? `${props.height}` : '100%')};
    display: flex;
    justify-content: ${(props) => props.justifyContent};
    align-items: ${(props) => props.alignItems};
    flex-direction: ${(props) => props.flexDirection};
    gap: ${(props) => parsePixelNumber(props.gap)}px;
    position: ${(props) => (props.position ? props.position : 'static')};
`;

export { StyledFlexbox };
