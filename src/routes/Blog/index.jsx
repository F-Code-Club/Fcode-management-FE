import { useEffect, useState } from 'react';

import { Table, Tabs, Input } from 'antd';
import { Link } from 'react-router-dom';

import { columns, columns2, columns3 } from './Blog.data';
import * as Styled from './Blog.styled';

import Button from '@/components/Button';
import articleApi from '@/utils/apiComponents/articleApi';

const { Search } = Input;

const Blog = () => {
    // Using redux to store data when received
    const [blogs, setBlogs] = useState({
        active: [],
        inactive: [],
        processing: [],
    });

    useEffect(() => {
        (async () => {
            const allBlogs = await articleApi.getActiveArticle();
            setBlogs({ ...blogs, active: [...allBlogs.data.data] });

            const inactiveBlogs = await articleApi.getInactiveArticle();
            setBlogs({ ...blogs, inactive: [...inactiveBlogs.data.data] });

            const processingBlogs = await articleApi.getProcessingArticle();
            setBlogs({ ...blogs, processing: [...processingBlogs.data.data] });
        })();
    }, []);

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
                    <Button>
                        <Link to="/blog/create">Tạo bài viết</Link>
                    </Button>
                </Styled.Search>
            </Styled.Wrapper>
        </Styled.Background>
    );
};

Blog.propTypes = {};

export default Blog;
