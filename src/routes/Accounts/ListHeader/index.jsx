import { Input } from 'antd';

import { SearchBox, Wrapper } from './style';

const { Search } = Input;
const ListHeader = () => {
    return (
        <Wrapper className="list-header">
            <SearchBox>
                <Search placeholder="Nhập tên bài viết cần tìm" enterButton />
            </SearchBox>
        </Wrapper>
    );
};

export default ListHeader;
