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
        render: (text, record) => (
            <Space size="middle">
                <CustomLink
                    to="/blog"
                    id={record.id}
                    action="approveArticle"
                    successContent="Duyệt bài viết thành công"
                    content="Duyệt"
                />
                <CustomLink
                    to="/blog"
                    id={record.id}
                    action="disapproveArticle"
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
        render: (text, record) => (
            <Space size="middle">
                {/* <Link>Ẩn</Link> */}
                <CustomLink
                    to="/blog"
                    id={record.id}
                    action="deleteArticle"
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
];

export const data = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: 'Tên bài viết ABC',
    author: 'Nguyễn Văn A',
    createdTime: '01/01/2022',
    tags: ['Design', 'UI/UX'],
}));
