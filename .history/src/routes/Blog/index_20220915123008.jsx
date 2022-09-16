import { Space, Table, Tag, Tabs, Input } from 'antd';

import * as Styled from './Blog.styled';

const { Search } = Input;

const onSearch = (value) => console.log(value);

const columns = [
    {
        title: 'Tên bài viết',
        dataIndex: 'postTitle',
        key: 'postTitle',
        render: (text) => <a href="/blog">{text}</a>,
    },
    {
        title: 'Tác giả',
        dataIndex: 'author',
        key: 'author',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
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
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="middle">
                <a href="/blog">Duyệt</a>
                <a href="/blog">Từ chối</a>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        postTitle: 'John Brown',
        author: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        postTitle: 'Jim Green',
        author: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        postTitle: 'Joe Black',
        author: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const Blog = () => {
    return (
        <Styled.Background>
            <Styled.Wrapper>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Chờ đươc duyệt" key="1">
                        <Table columns={columns} dataSource={data} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Đã được duyệt" key="2">
                        <Table columns={columns} dataSource={data} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Từ chối duyệt" key="3">
                        <Table columns={columns} dataSource={data} />
                    </Tabs.TabPane>
                </Tabs>
                <Styled.Search>
                    <Search
                        placeholder="Nhập tên bài viết cần tìm"
                        onSearch={onSearch}
                        enterButton
                    />
                </Styled.Search>
            </Styled.Wrapper>
        </Styled.Background>
    );
};

Blog.propTypes = {};

export default Blog;
