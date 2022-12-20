import { Space } from 'antd';
import { Link } from 'react-router-dom';

import CustomLink from './CustomLink';

export const columns = [
    {
        title: 'Tên bài viết',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => {
            return <Link to={`/blog/${record.id}?action=processing`}>{text}</Link>;
        },
    },
    {
        title: 'Tác giả',
        dataIndex: 'author',
        key: 'author',
    },
    {
        title: 'Ngày gửi',
        dataIndex: 'createdTime',
        key: 'createdTime',
    },
    {
        title: 'Actions',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <CustomLink
                    to="/blog"
                    id={record.id}
                    action="approveArticle"
                    successContent="Duyệt bài viết thành công"
                    failContent="Duyệt bài viết thất bại"
                    content="Duyệt"
                />
                <CustomLink
                    to="/blog"
                    id={record.id}
                    action="disapproveArticle"
                    failContent="Từ chối viết thất bại"
                    successContent="Từ chối duyệt bài viết thành công"
                    content="Từ chối"
                />
            </Space>
        ),
    },
];

export const columns2 = [
    {
        title: 'Tên bài viết',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => <Link to={`/blog/${record.id}?action=active`}>{text}</Link>,
    },
    {
        title: 'Tác giả',
        dataIndex: 'author',
        key: 'author',
    },
    {
        title: 'Ngày gửi',
        dataIndex: 'createdTime',
        key: 'createdTime',
    },
    {
        title: 'Actions',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <CustomLink
                    to="/blog"
                    id={record.id}
                    action="deleteArticle"
                    failContent="Xoá viết thất bại"
                    successContent="Xoá bài viết thành công"
                    content="Xoá"
                />
            </Space>
        ),
    },
];

export const columns3 = [
    {
        title: 'Tên bài viết',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => <Link to={`/blog/${record.id}?action=inactive`}>{text}</Link>,
    },
    {
        title: 'Tác giả',
        dataIndex: 'author',
        key: 'author',
    },
    {
        title: 'Ngày gửi',
        dataIndex: 'createdTime',
        key: 'createdTime',
    },
];

export const data = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: 'Tên bài viết ABC',
    author: 'Nguyễn Văn A',
    createdTime: '01/01/2022',
    tags: ['Design', 'UI/UX'],
}));
