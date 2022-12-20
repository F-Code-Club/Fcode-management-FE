// import { useState, useEffect } from 'react';
import { StyledWrapper } from './style';

// const getWindowDimensions = () => {
//     const { innerWidth: width, innerHeight: height } = window;
//     return { width, height };
// };

// const useWindowDimensions = () => {
//     const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

//     useEffect(() => {
//         const handleResize = () => {
//             setWindowDimensions(getWindowDimensions());
//         };

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     return windowDimensions;
// };

const Wrapper = (props) => {
    // const { width } = useWindowDimensions();
    const { children, minHeight, ...rest } = props;
    return (
        <StyledWrapper {...rest} minHeight={minHeight} currentWidth={'100vw'}>
            {children}
        </StyledWrapper>
    );
};

export default Wrapper;
