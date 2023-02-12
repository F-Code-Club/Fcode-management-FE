import { useState, useEffect } from 'react';

import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';

import { CustomTable } from './style';

import { toastError } from '@/components/ToastNotification';
import localStorageUtils from '@/utils/localStorageUtils';
import productApi from '@/utils/productApi';

function BlogTable({ id }) {
    const token = localStorageUtils.getItem('token');
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const columns = [
        {
            title: 'Tên bài viết',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <Link to={`/personal-blog/${record.id}`}>{text}</Link>,
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
    ];
    const loadMoreData = async () => {
        setLoading(true);
        await productApi
            .getOwnArticle(id, token)
            .then((result) => {
                setLoading(false);
                setBlogs(result.data.data);
            })

            .catch((err) => toastError(err));
    };
    useEffect(() => {
        loadMoreData();
    }, []);
    return (
        <Skeleton loading={loading}>
            <CustomTable columns={columns} dataSource={blogs} />
        </Skeleton>
    );
}

export default BlogTable;