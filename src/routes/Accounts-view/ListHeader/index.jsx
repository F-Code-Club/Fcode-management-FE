import { useState } from 'react';

import { Input } from 'antd';
import { useDispatch } from 'react-redux';

import { SearchBox, SearchWrapper, Container } from './style';

const { Search } = Input;
const ListHeader = ({ accountList }) => {
    const [filterInput, setFilterInput] = useState('');
    console.log(accountList);
    const dispatch = useDispatch();
    const filterData = () => {
        if (filterInput === '') return accountList;

        if (isNaN(filterInput)) {
            return accountList.filter(({ name }) => name.includes(filterInput));
        }
        return accountList.filter(({ age }) => age === +filterInput);
    };
    return (
        <Container>
            <SearchWrapper className="list-header">
                <SearchBox>
                    <Search
                        placeholder="Nhập tên bài viết cần tìm"
                        enterButton
                        onSearch={setFilterInput}
                    />
                </SearchBox>
            </SearchWrapper>
        </Container>
    );
};

export default ListHeader;
