import styled from 'styled-components';

// import getGutter from '@/utils/getGutter';

export const Container = styled.div`
    max-width: 920px;
    margin: 0 auto;
    background: transparent;

    .site-layout-background {
        background: transparent;
    }

    .left-side {
        .ant-avatar {
            margin: 0 auto 1em auto;
            display: block;
        }

        .ant-typography {
            text-align: center;
        }

        span.ant-typography {
            display: block;
        }

        .full-fill {
            display: flex;

            .ant-space-item {
                display: block;
                width: 100%;
            }
        }

        .pos-sticky {
            position: sticky;
            top: 24px;
        }

        .avatar {
            width: fit-content;
            margin: auto;
            position: relative;

            .overlay {
                opacity: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                border-radius: 50%;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.3);
                z-index: 1;
                backdrop-filter: blur(8px);
                cursor: pointer;
                border: none;
                transition: all cubic-bezier(0.55, 0, 0.55, 0.2) 0.2s;

                &:hover {
                    opacity: 1;
                }
            }
        }
    }

    .right-side {
        .ant-picker,
        .ant-select {
            width: 100%;
        }
    }
`;
