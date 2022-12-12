import { useEffect, useState } from 'react';

import { Table, Input, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { changeBlog } from '../slice';
// import { columns } from './PersonalBlog.columns';
import * as Styled from './PersonalBlog.styled';

import Button from '@/components/Button';
import articleApi from '@/utils/apiComponents/articleApi';

const { Search } = Input;

const PersonalBlog = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const dispatch = useDispatch();

    const deleteBlog = async (id) => {
        await articleApi.deleteArticle(id);
        navigate(0);
    };

    const handleChangeBlog = (id) => {
        dispatch(changeBlog(blogs.filter((blog) => blog.id === id)[0]));
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

    useEffect(() => {
        (async () => {
            const { data } = await articleApi.getArticleByAuthor();
            setBlogs(data.data);
        })();
    }, []);

    return (
        <Styled.Background>
            <Styled.Wrapper>
                <Styled.Search>
                    <Search placeholder="Nhập tên bài viết cần tìm" enterButton />
                    <Button>
                        <Link to="/personal-blog/create">Tạo bài viết</Link>
                    </Button>
                </Styled.Search>
                <Table columns={columns} dataSource={blogs} />
            </Styled.Wrapper>
        </Styled.Background>
    );
};

PersonalBlog.propTypes = {};

export default PersonalBlog;
