import { useEffect, useState } from 'react';

import { Table, Input, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { changeBlog } from '../slice';
import * as Styled from './PersonalBlog.styled';

import Button from '@/components/Button';
import articleApi from '@/utils/apiComponents/articleApi';

const { Search } = Input;

const PersonalBlog = () => {
    const [blogs, setBlogs] = useState({
        all: [],
        search: [],
        isDelete: false,
    });

    useEffect(() => {
        (async () => {
            const { data } = await articleApi.getArticleByAuthor();
            setBlogs({ ...blogs, all: data.data, search: data.data });
        })();
    }, [blogs.isDelete]); // If a blog is deleted, it will re-render to get all blogs

    const deleteBlog = async (id) => {
        await articleApi.deleteArticle(id);
        setBlogs({ ...blogs, isDelete: !blogs.isDelete });
    };

    const dispatch = useDispatch();
    const handleChangeBlog = (id) => {
        dispatch(changeBlog(blogs.search.filter((blog) => blog.id === id)[0]));
    };

    const columns = [
        {
            title: 'Tên bài viết',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <Link
                    to={`/personal-blog/${record.id}`}
                    onClick={() => handleChangeBlog(record.id)}
                >
                    {text}
                </Link>
            ),
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdTime',
            key: 'createdTime',
        },
        {
            title: 'Ngày chỉnh sửa',
            dataIndex: 'updatedTime',
            key: 'updatedTime',
        },
        // {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: (_, { tags }) => (
        //         <>
        //             {tags.map((tag) => {
        //                 let color = tag.length > 5 ? 'geekblue' : 'green';

        //                 if (tag === 'loser') {
        //                     color = 'volcano';
        //                 }

        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),
        // },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/personal-blog/edit/${record.id}`}>Chỉnh sửa</Link>
                    <Link to="#" onClick={() => deleteBlog(record.id)}>
                        Xóa
                    </Link>
                </Space>
            ),
        },
    ];

    const handleSearch = (value) => {
        if (!value.trim()) {
            setBlogs({ ...blogs, search: blogs.all });
        } else {
            const filteredBlogs = blogs.all.filter((blog) =>
                blog.title.toLowerCase().includes(value.toLowerCase().trim())
            );
            setBlogs({ ...blogs, search: filteredBlogs });
        }
    };

    return (
        <Styled.Background>
            <Styled.Wrapper>
                <Styled.Search>
                    <Search
                        placeholder="Nhập tên bài viết cần tìm"
                        onSearch={handleSearch}
                        enterButton
                        allowClear
                    />
                    <Button>
                        <Link to="/personal-blog/create">Tạo bài viết</Link>
                    </Button>
                </Styled.Search>
                <Table columns={columns} dataSource={blogs.search} />
            </Styled.Wrapper>
        </Styled.Background>
    );
};

PersonalBlog.propTypes = {};

export default PersonalBlog;
