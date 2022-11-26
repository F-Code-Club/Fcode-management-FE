import { Button, Input } from 'antd';

import { SearchBox, Wrapper } from './style';

import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';

const { Search } = Input;
const ListHeader = () => {
    return (
        <Wrapper className="list-header">
            <SearchBox>
                <Search placeholder="Nhập tên bài viết cần tìm" enterButton />
            </SearchBox>
            <Button icon={<DownloadOutlined />}>Tải danh sách</Button>
            <Button>Chọn tất cả</Button>
            <Button type="primary" icon={<DeleteOutlined />}></Button>
        </Wrapper>
    );
};

export default ListHeader;
