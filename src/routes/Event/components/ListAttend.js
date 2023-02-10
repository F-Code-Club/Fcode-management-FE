import { useState, useEffect } from 'react';

import { Button, Modal, Table, Input, Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { columns } from '../AttendData';
import { selectAttends } from '../slice/externalSelector';
import { getAttendById, filterAttends } from '../slice/externalSlice';
import { WrapperListAttend } from '../styled';

import { themes } from '@/theme/theme';

const ListAttend = ({ eventId }) => {
    const { Search } = Input;
    const dispatch = useDispatch();
    const Attends = useSelector(selectAttends);

    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onSearch = async (value) => {
        setLoading(true);
        await dispatch(filterAttends(value))
            .unwrap()
            // eslint-disable-next-line no-console
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(getAttendById(eventId))
                .unwrap()
                // eslint-disable-next-line no-console
                .catch((err) => console.log(err))
                .finally(() => setLoading(false));
        };

        fetchData();
    }, []);
    return (
        <WrapperListAttend>
            <Button type="primary" onClick={showModal}>
                Điểm danh
            </Button>
            <ModalStyled
                title={
                    <StyledHeader>
                        <h1 className="title">Điểm danh</h1>
                        <SearchWrapper>
                            {' '}
                            <Search
                                placeholder="Nhập tên bài viết cần tìm"
                                enterButton
                                loading={loading}
                                onSearch={(value) => onSearch(value)}
                            />
                        </SearchWrapper>
                    </StyledHeader>
                }
                closable={false}
                open={isModalOpen}
                // onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
                okText={'Lưu'}
                width={1000}
                centered
                className="custom-modal"
            >
                <Skeleton loading={loading}>
                    <Table
                        columns={columns}
                        dataSource={Attends.searchedAttends}
                        pagination={false}
                        scroll={{
                            y: 300,
                        }}
                    />
                </Skeleton>
                <TwoButton>
                    <Button onClick={() => handleCancel()} className="cancel-btn">
                        Hủy
                    </Button>
                    <Button onClick={() => handleCancel()} className="ok-btn">
                        Lưu
                    </Button>
                </TwoButton>
            </ModalStyled>
        </WrapperListAttend>
    );
};

export default ListAttend;
export const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    .title {
        width: 100%;
        font-weight: 500;
        font-size: 34px;
        line-height: 123.5%;
        /* identical to box height, or 42px */

        letter-spacing: 0.25px;

        /* Character/Title .85 */

        color: rgba(0, 0, 0, 0.85);
    }
`;
export const SearchWrapper = styled.div`
    position: absolute;
    display: flex;
    width: 400px;
    height: 30px;
    right: 30px;
    top: 30px;
    .ant-input-search .ant-input:hover,
    .ant-input-search .ant-input:focus {
        border-color: ${themes.colors.primary};
    }
    & button {
        // margin-left: 10px;
        border-color: ${themes.colors.primary};
        background-color: ${themes.colors.primary};
    }
`;
export const TwoButton = styled.div`
    margin-top: 1rem;
    text-align: right;
    .cancel-btn {
        margin-top: 0.5rem;
        color: black;
        border: 1px solid #d9d9d9;
        margin-right: 10px;
        :hover {
            color: #ff4d4f;
            border: 1px solid #ff4d4f;
        }
    }
    .ok-btn {
        margin-top: 0.5rem;
        background: #45ce7c;
        color: white;
        border: 1px solid #45ce7c;
        :hover {
            color: rgba(69, 206, 124, 1);
            border: 1px solid #45ce7c;
            background: white;
        }
    }
`;
export const ModalStyled = styled(Modal)`
    .ant-table-filter-trigger.active {
        color: ${themes.colors.primary};
    }
    .ant-table-filter-dropdown {
        .ant-dropdown-menu-item-selected {
            color: ${themes.colors.primary};
        }
    }
`;
