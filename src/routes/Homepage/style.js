import styled from 'styled-components';

import { themes } from '@/theme/theme';

export const ContainerHomepage = styled.div`
    width: 100%;
    min-height: calc(100vh - 190px);
    display: grid;
    grid-template-columns: 65% 33%;
    justify-content: space-between;
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    .ant-list-item {
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
            0px 1px 3px rgba(0, 0, 0, 0.2);
        margin-bottom: 10px;
    }
`;

export const Col1 = styled.div`
    .row1 {
        display: grid;
        grid-template-columns: 65% 30%;
        justify-content: space-between;
        background: white;
        padding: 20px;
        margin-bottom: 30px;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
            0px 1px 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            h3 {
                padding: 20px;
                font-weight: 600;
                font-size: 18px;
                line-height: 22px;
            }
            p {
                width: 100%;
                padding: 20px;
                margin-bottom: 10px;
                box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
                    0px 1px 3px rgba(0, 0, 0, 0.2);
                border-radius: 5px;
            }
            .child1 {
                background: ${themes.colors.primary050};
            }
            .child2 {
                background: ${themes.colors.secondary050};
            }
            .btn-view-more {
                width: 100px;
                margin-top: 10px;
                padding: 5px 15px;
                background: ${themes.colors.light};
                border: 1px solid ${themes.colors.primary};
                color: ${themes.colors.primary};
                box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
                border-radius: 5px;
                cursor: pointer;
                transition: 0.2s linear;
                :hover {
                    background: ${themes.colors.primary};
                    color: ${themes.colors.light};
                }
            }
        }
        img {
            width: 100%;
        }
    }

    .row2 {
        padding: 20px;
        margin-bottom: 30px;
        background: white;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
            0px 1px 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        .title {
            text-align: center;
            padding: 20px;
            font-weight: 600;
            font-size: 18px;
            line-height: 22px;
        }
        .ant-list-item-meta-title {
            margin: 0;
        }
        .ant-list-item-meta-avatar {
            margin: auto 15px;
            margin-left: 0;
        }
        .content {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
        }
        h4 {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
        }
    }
`;

export const Col2 = styled.div`
    .row1,
    .row2 {
        padding: 20px;
        background: white;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
            0px 1px 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        margin-bottom: 30px;
        h3 {
            padding: 20px;
            font-weight: 600;
            font-size: 18px;
            line-height: 22px;
            color: ${themes.colors.dark};
            text-transform: uppercase;
            text-align: center;
        }
    }

    .row2 {
        .content {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
        }
        .ant-list-item-meta-title {
            margin: 0;
        }
        .ant-list-item-extra {
            display: flex;
            align-items: center;
            margin-left: 5px;
            a {
                color: black;
                padding: 5px;
                border-radius: 5px;
                border: 1px solid white;
                transition: 0.25s linear;
                :hover {
                    text-decoration: underline;
                }
            }
        }
        h4 {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
        }
    }

    .row3 {
        padding: 20px;
        background: white;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
            0px 1px 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        margin-bottom: 30px;
        h3 {
            padding: 20px;
            font-weight: 600;
            font-size: 18px;
            line-height: 22px;
            color: ${themes.colors.dark};
            text-transform: uppercase;
            text-align: center;
        }
        h4 {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
        }
        .ant-list-item-extra {
            margin-left: 10px;
            a {
                color: black;
                padding: 5px;
                border-radius: 5px;
                border: 1px solid white;
                transition: 0.25s linear;
                :hover {
                    text-decoration: underline;
                }
            }
        }
        .ant-list-item-meta,
        .ant-list-item-meta-title {
            margin-bottom: 0;
        }
    }
`;
