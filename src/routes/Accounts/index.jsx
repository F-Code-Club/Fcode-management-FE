import { useState, useEffect } from 'react';

import { List, Avatar, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

// import { themes, actions } from '@/theme/theme';
import ListAction from './ListAction/index';
import ListHeader from './ListHeader';
import { actions } from './account.data';
// import DUMMY_ACCOUNTS from './account.data';
import { ListWrapper, Wrapper } from './style';

import { toastError } from '@/components/ToastNotification';
import localStorageUtils from '@/utils/localStorageUtils';
import productApi from '@/utils/productApi';

// account management with ant design table
const AccountsManager = () => {
    const token = localStorageUtils.getItem('token');
    const [accountList, setAccountList] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadMoreData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        await productApi
            .getAllAccount(token)
            .then((result) => {
                setLoading(false);
                console.log(result.data.data);
                setAccountList([...accountList, ...result.data.data]);
            })
            .catch((err) => toastError(err));
    };
    useEffect(() => {
        loadMoreData();
        setLoading(false);
    }, []);
    return (
        <Wrapper>
            <ListWrapper id="scrollableDiv">
                <InfiniteScroll
                    dataLength={accountList.length}
                    next={loadMoreData}
                    loader={<Skeleton active paragraph={{ row: 1 }} avatar />}
                    endMessage={<h4>No more data to load</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        header={<ListHeader />}
                        dataSource={accountList}
                        renderItem={(item) => (
                            <List.Item
                                key={item.email}
                                actions={actions.map((action) => (
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
                                    description={item.email}
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
