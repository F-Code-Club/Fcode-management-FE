import { useEffect, useState } from 'react';

import { Table, Input, Space, Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { changeBlog } from '../slice';
import { selectCurrentBlog } from '../slice/selector';
import * as Styled from './PersonalBlog.styled';

import Button from '@/components/Button';
import { toastError, toastSuccess } from '@/components/ToastNotification';
import { selectId } from '@/routes/Auth/slice/selector';
import articleApi from '@/utils/apiComponents/articleApi';
import localStorageUtils from '@/utils/localStorageUtils';
import usePersistedState from '@/utils/usePersistedState';

const { Search } = Input;

const PersonalBlog = () => {
    const tokenInLocal = localStorageUtils.getToken();
    const token = usePersistedState('token', tokenInLocal)[0];

    const [blogs, setBlogs] = useState({
        all: useSelector(selectCurrentBlog).author,
        search: useSelector(selectCurrentBlog).author,
        loading: false,
        isDelete: false,
    });

    const dispatch = useDispatch();

    // Get user ID from redux
    const userId = useSelector(selectId);
    localStorageUtils.setItem('userId', userId);

    useEffect(() => {
        (async () => {
            // * Un alternative way to get all blog when calling with Redux Thunk is slow
            // const { data } = await articleApi.getArticleByAuthor();
            // setBlogs({ ...blogs, all: data.data, search: data.data });

            dispatch(changeBlog({}));
            setBlogs({ ...blogs, loading: true, isDelete: false });
            await articleApi.getArticleByAuthor(token, userId).then((res) => {
                setBlogs({
                    ...blogs,
                    loading: false,
                    isDelete: false,
                    all: res.data.data || [],
                    search: res.data.data || [],
                });
            });
        })();
    }, [blogs.isDelete]); // If a blog is deleted, it will re-render to get all blogs

    const deleteBlog = async (id) => {
        const res = await articleApi.deleteArticle(id, token);
        if (res.data.code === 200) {
            toastSuccess('Xoá bài viết thành công!');
            setBlogs({ ...blogs, isDelete: true });
        } else {
            toastError('Xoá bài viết thất bại, vui lòng liên hệ quản trị viên!');
        }
    };

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
        // TODO: Uncomment these line when having specific genreID
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
        console.log(blogs);
        if (!value.trim()) {
            setBlogs({ ...blogs, search: blogs.all });
        } else {
            const filteredBlogs = blogs.all.filter(
                (blog) =>
                    blog.title.toLowerCase().includes(value.toLowerCase().trim()) ||
                    blog.author.toLowerCase().includes(value.toLowerCase().trim())
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
                        loading={blogs.loading}
                        enterButton
                        allowClear
                    />
                    <Button>
                        <Link to="/personal-blog/create">Tạo bài viết</Link>
                    </Button>
                </Styled.Search>
                <Skeleton loading={blogs.loading}>
                    <Table columns={columns} dataSource={blogs.search} />
                </Skeleton>
            </Styled.Wrapper>
        </Styled.Background>
    );
};

PersonalBlog.propTypes = {};

export default PersonalBlog;
