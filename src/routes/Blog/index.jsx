import { useEffect } from 'react';

import { Table, Tabs, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { columns, columns2, columns3 } from './Blog.data';
import * as Styled from './Blog.styled';
// import { changeActiveBlogs, changeInactiveBlogs, changeProcessingBlogs } from './slice';
import { selectCurrentBlog } from './slice/selector';

// import { toastError } from '@/components/ToastNotification';
import { getAllBlogs } from '@/routes/Blog/slice';

// import articleApi from '@/utils/apiComponents/articleApi';

const { Search } = Input;

const Blog = () => {
    // Using redux to store data when received
    const blogs = useSelector(selectCurrentBlog);
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            dispatch(getAllBlogs());
        };
        fetchData();
    }, [location]);

    return (
        <Styled.Background>
            <Styled.Wrapper>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Chờ đươc duyệt" key="1">
                        <Table columns={columns} dataSource={blogs.processing} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Đã được duyệt" key="2">
                        <Table columns={columns2} dataSource={blogs.active} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Từ chối duyệt" key="3">
                        <Table columns={columns3} dataSource={blogs.inactive} />
                    </Tabs.TabPane>
                </Tabs>
                <Styled.Search>
                    <Search placeholder="Nhập tên bài viết cần tìm" enterButton />
                </Styled.Search>
            </Styled.Wrapper>
        </Styled.Background>
    );
};

export default Blog;
