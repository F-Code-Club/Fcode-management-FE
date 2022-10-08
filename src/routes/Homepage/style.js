import styled from 'styled-components';

export const ContainerHomepage = styled.div`
    width: 100%;
    min-height: calc(100vh - 190px);
    display: grid;
    grid-template-columns: 68% 30%;
    justify-content: space-between;
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
`;

export const Col1 = styled.div`
    .row1 {
        display: grid;
        grid-template-columns: 60% 35%;
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
                background: #e6f8ec;
            }
            .child2 {
                background: #e3f2fe;
            }
            .btn-view-more {
                width: 100px;
                margin-top: 10px;
                padding: 5px 15px;
                background: #ffffff;
                border: 1px solid #45ce7c;
                box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
                border-radius: 5px;
                cursor: pointer;
                transition: 0.2s linear;
                :hover {
                    background: #45ce7c;
                    color: #ffffff;
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
    }
`;

export const Col2 = styled.div`
    .row1 {
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        color: #000000;
        text-transform: uppercase;
        text-align: center;
        background: white;
        padding: 30px;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
            0px 1px 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
    }
`;
