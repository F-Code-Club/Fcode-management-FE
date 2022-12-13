import { useState, useEffect } from 'react';

import { List, Avatar, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

// import { themes, actions } from '@/theme/theme';
import ListAction from './ListAction/index';
import ListHeader from './ListHeader';
import { actions } from './account.data';
// import DUMMY_ACCOUNTS from './account.data';
import { ListWrapper, Wrapper } from './style';

import productApi from '@/utils/productApi';

// account management with ant design table
const AccountsManager = () => {
    const [accountList, setAccountList] = useState([]);
    const [loading, setLoading] = useState(false);
    let token =
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiYW9uZHNlMTczMDI0QGZwdC5lZHUudm4iLCJleHAiOjE2NzA5NTM0NzIsImlhdCI6MTY3MDk1MTY3Mn0.Rmeva_O4cnGtjMf1F_Zh8-71xHXp3eRLJWJK3IVz2qgzyQrLE_t7Zc60cetb_87zd2oyQFIi7_ea-oQB1iGhNw';
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
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        loadMoreData();
    }, []);
    return (
        <Wrapper>
            <ListWrapper id="scrollableDiv">
                <InfiniteScroll
                    dataLength={accountList.length}
                    next={loadMoreData}
                    hasMore={accountList.length < 30}
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
                                    title={item.firstName}
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
