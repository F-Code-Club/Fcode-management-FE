import { Table, Tabs, Input } from 'antd';
import { Link } from 'react-router-dom';

import { columns, columns2, columns3, data } from './Blog.data';
import * as Styled from './Blog.styled';

import Button from '@/components/Button';

const { Search } = Input;

const Blog = () => {
    // Using redux to store data when received

    return (
        <Styled.Background>
            <Styled.Wrapper>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Chờ đươc duyệt" key="1">
                        <Table columns={columns} dataSource={data} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Đã được duyệt" key="2">
                        <Table columns={columns2} dataSource={data} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Từ chối duyệt" key="3">
                        <Table columns={columns3} dataSource={data} />
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
