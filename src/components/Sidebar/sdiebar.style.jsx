import { Layout } from 'antd';
import styled from 'styled-components';

import { themes } from '@/theme/theme';

const { Sider } = Layout;
export const Logo = styled.div`
    display: flex;
    align-items: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 900;
    font-size: 16px;
    line-height: 24px;
    color: #45ce7c;
    margin: 38px 0px;
    height: 32px;
    margin: 16px;
`;

export const Wrapper = styled.div`
    .ant-layout-sider {
        background-color: ${themes.colors.gray};
    }
    .ant-menu-light .ant-menu-submenu-title:hover,
    .ant-menu-light .ant-menu-item-title:hover {
        color: ${themes.colors.primary};
    }
    .ant-menu {
        background-color: ${themes.colors.gray};
        &-sub {
            &.ant-menu-inline {
                background: ${themes.colors.submenu};
            }
        }
        &-item {
            color: ${themes.colors.light};
            &-active {
                color: ${themes.colors.primary};
            }
            &:hover {
                color: ${themes.colors.primary} !important;
            }
            &.ant-menu-submenu-selected {
                color: ${themes.colors.primary};
            }
            &-selected {
                color: ${themes.colors.primary};
                background-color: ${themes.colors.primary050};

                & .ant-menu-title-content a {
                    color: ${themes.colors.primary};
                }
            }
            &-title {
                &:hover {
                    color: ${themes.colors.primary};
                }
            }
        }

        &-item a {
            color: #ffffff;
            &:hover {
                color: ${themes.colors.primary};
            }
        }
        &-submenu {
            color: ${themes.colors.light};
            &-arrow {
                color: ${themes.colors.light};
            }
            &-active {
                color: ${themes.colors.primary};
            }
            &:hover {
                & > .ant-menu-submenu-title > .ant-menu-submenu-arrow {
                    color: ${themes.colors.primary};
                }
            }
            &-title {
                &:hover {
                    color: ${themes.colors.primary};
                }
            }
        }
        &-submenu a {
            color: ${themes.colors.light};
            &:hover {
                color: ${themes.colors.primary};
            }
        }
        &-inline {
            border: none;
            & .ant-menu-item::after {
                border-right: 3px solid ${themes.colors.primary};
            }
        }
    }
`;
export const SideBar = styled(Sider)`
    width: 300px !important;
    position: fixed !important;
    height: 100vh;
    top: 0;
    bottom: 0;
    left: 0;
`;

export const SignOut = styled.div`
    display: flex;
    align-items: center;
    font-family: 'Roboto';
    color: rgba(255, 255, 255, 0.85);
    position: absolute;
    bottom: 20px;
    padding-left: 24px;
`;
