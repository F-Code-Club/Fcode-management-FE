import { useState, useEffect } from 'react';

import { List, Avatar, Skeleton, Input } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import ListAction from './ListAction/index';
import { actions_btn } from './account.data';
import { ListWrapper, Wrapper, Container, SearchWrapper, SearchBox } from './style';

import { toastError } from '@/components/ToastNotification';
import localStorageUtils from '@/utils/localStorageUtils';
import productApi from '@/utils/productApi';

// account management with ant design table
const AccountsManager = () => {
    const [filterInput, setFilterInput] = useState('');
    const token = localStorageUtils.getItem('token');
    const [accountList, setAccountList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { Search } = Input;
    const loadMoreData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        await productApi
            .getAllAccount(token)
            .then((result) => {
                setLoading(false);
                setAccountList(result.data.data);
            })

            .catch((err) => toastError(err));
    };
    useEffect(() => {
        loadMoreData();
        setLoading(false);
    }, []);
    const filterData = () => {
        if (filterInput === '') return accountList;

        return accountList.filter(
            ({ firstName, lastName }) =>
                firstName.includes(filterInput) || lastName.includes(filterInput)
        );
    };
    return (
        <Wrapper>
            {/* Search Section*/}
            <Container>
                <SearchWrapper className="list-header">
                    <SearchBox>
                        <Search
                            placeholder="Nhập tên bài viết cần tìm"
                            enterButton
                            onSearch={setFilterInput}
                        />
                    </SearchBox>
                </SearchWrapper>
            </Container>
            {/* End of Search Section*/}
            <ListWrapper id="scrollableDiv">
                <InfiniteScroll
                    dataLength={accountList.length}
                    next={loadMoreData}
                    loader={<Skeleton active paragraph={{ row: 1 }} avatar />}
                    endMessage={<h4>No more data to load</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={filterData()}
                        renderItem={(item) => (
                            <List.Item
                                key={item.email}
                                actions={actions_btn.map((action) => (
                                    <ListAction
                                        key={action.key}
                                        type={action.type}
                                        name={action.name}
                                        event={action.event}
                                        status={action.isLinked}
                                        id={item.id}
                                        item={item}
                                    />
                                ))}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatarUrl} />}
                                    title={item.lastName + ' ' + item.firstName}
                                    description={item.studentId}
                                />
                            </List.Item>
                        )}
                    ></List>
                </InfiniteScroll>
            </ListWrapper>
        </Wrapper>
    );
};

export default AccountsManager;
