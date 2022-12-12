import { useEffect } from 'react';

import { Table, Tabs, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { columns, columns2, columns3 } from './Blog.data';
import * as Styled from './Blog.styled';
import { changeActiveBlogs, changeInactiveBlogs, changeProcessingBlogs } from './slice';
import { selectCurrentBlog } from './slice/selector';

import articleApi from '@/utils/apiComponents/articleApi';

const { Search } = Input;

const Blog = () => {
    // Using redux to store data when received
    const blogs = useSelector(selectCurrentBlog);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const activeBlogs = await articleApi.getActiveArticle();
            const inactiveBlogs = await articleApi.getInactiveArticle();
            const processingBlogs = await articleApi.getProcessingArticle();

            dispatch(changeActiveBlogs(activeBlogs.data.data));
            dispatch(changeInactiveBlogs(inactiveBlogs.data.data));
            dispatch(changeProcessingBlogs(processingBlogs.data.data));
        };
        fetchData();
    }, [navigate]);

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
