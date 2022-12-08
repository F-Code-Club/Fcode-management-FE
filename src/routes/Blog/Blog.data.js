import { Space, Tag } from 'antd';
import { Link } from 'react-router-dom';

export const columns = [
    {
        title: 'Tên bài viết',
        dataIndex: 'post_title',
        key: 'post_title',
        render: (text, record) => <Link to={`/blog/${record.key}?action=approve`}>{text}</Link>,
    },
    {
        title: 'Tác giả',
        dataIndex: 'author',
        key: 'author',
    },
    {
        title: 'Ngày gửi',
        dataIndex: 'created_at',
        key: 'created_at',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';

                    if (tag === 'loser') {
                        color = 'volcano';
                    }

                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Actions',
        key: 'action',
        render: () => (
            <Space size="middle">
                <a href="/blog">Duyệt</a>
                <a href="/blog">Từ chối</a>
            </Space>
        ),
    },
];

export const columns2 = [
    {
        title: 'Tên bài viết',
        dataIndex: 'post_title',
        key: 'post_title',
        render: (text, record) => <Link to={`/blog/${record.key}?action=hidden`}>{text}</Link>,
    },
    {
        title: 'Tác giả',
        dataIndex: 'author',
        key: 'author',
    },
    {
        title: 'Ngày gửi',
        dataIndex: 'created_at',
        key: 'created_at',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';

                    if (tag === 'loser') {
                        color = 'volcano';
                    }

                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Actions',
        key: 'action',
        render: () => (
            <Space size="middle">
                <a href="/blog">Ẩn</a>
                <a href="/blog">Xóa</a>
            </Space>
        ),
    },
];

export const columns3 = [
    {
        title: 'Tên bài viết',
        dataIndex: 'post_title',
        key: 'post_title',
        render: (text, record) => <Link to={`/blog/${record.key}?action=decline`}>{text}</Link>,
    },
    {
        title: 'Tác giả',
        dataIndex: 'author',
        key: 'author',
    },
    {
        title: 'Ngày gửi',
        dataIndex: 'created_at',
        key: 'created_at',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';

                    if (tag === 'loser') {
                        color = 'volcano';
                    }

                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
];

export const data = Array.from({ length: 100 }, (_, i) => ({
    key: i + 1,
    post_title: 'Tên bài viết ABC',
    author: 'Nguyễn Văn A',
    created_at: '01/01/2022',
    tags: ['Design', 'UI/UX'],
}));
