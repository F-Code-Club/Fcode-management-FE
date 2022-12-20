import styled from 'styled-components';

import { themes } from '@/theme/theme';

export const Wrapper = styled.section`
    .container {
        width: 100%;
        min-height: 100vh;
        padding: 8rem 0;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: ${themes.colors.primary050};
        h2 {
            font-size: 10rem;
            margin-bottom: 0rem;
        }

        h3 {
            font-size: 4.2rem;
        }

        p {
            margin: 2rem 0;
        }
    }
`;
