import { useEffect, useState } from 'react';

import { Table, Tabs, Input, Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { columns, columns2, columns3 } from './Blog.data';
import * as Styled from './Blog.styled';
import { filterBlogs, getAllBlogs } from './slice';
// import articleApi from '@/utils/apiComponents/articleApi';
// import { changeActiveBlogs, changeInactiveBlogs, changeProcessingBlogs } from './slice';
import { selectCurrentBlog } from './slice/selector';

import localStorageUtils from '@/utils/localStorageUtils';
// import { toastError } from '@/components/ToastNotification';
import usePersistedState from '@/utils/usePersistedState';

const { Search } = Input;

const Blog = () => {
    // Using redux to store data when received
    const tokenInLocal = localStorageUtils.getToken();
    const token = usePersistedState('token', tokenInLocal)[0];
    const blogs = useSelector(selectCurrentBlog);
    const location = useLocation();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(getAllBlogs(token))
                .unwrap()
                // eslint-disable-next-line no-console
                .catch((err) => console.log(err))
                .finally(() => setLoading(false));
        };
        fetchData();
    }, [location.pathname]);
    const onSearch = async (value) => {
        setLoading(true);
        await dispatch(filterBlogs(value))
            .unwrap()
            // eslint-disable-next-line no-console
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };
    return (
        <Styled.Background>
            <Styled.Wrapper>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Chờ đươc duyệt" key="1">
                        <Skeleton loading={loading}>
                            <Table columns={columns} dataSource={blogs.searchedProcessing} />
                        </Skeleton>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Đã được duyệt" key="2">
                        <Skeleton loading={loading}>
                            <Table columns={columns2} dataSource={blogs.searchedActive} />
                        </Skeleton>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Từ chối duyệt" key="3">
                        <Skeleton loading={loading}>
                            <Table columns={columns3} dataSource={blogs.searchedInactive} />
                        </Skeleton>
                    </Tabs.TabPane>
                </Tabs>
                <Styled.Search>
                    <Search
                        placeholder="Nhập tên bài viết cần tìm"
                        enterButton
                        loading={loading}
                        onSearch={(value) => onSearch(value)}
                    />
                </Styled.Search>
            </Styled.Wrapper>
        </Styled.Background>
    );
};

export default Blog;
