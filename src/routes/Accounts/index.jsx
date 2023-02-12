import { useState, useEffect } from 'react';

import { List, Avatar, Input, Tabs, Checkbox } from 'antd';

import ListAction from './ListAction/index';
import { actions_btn, tabs } from './account.data';
import { ListWrapper, Wrapper, SearchBox, Divider, TabContainer, StyledCol } from './style';

import { toastError } from '@/components/ToastNotification';
import localStorageUtils from '@/utils/localStorageUtils';
import productApi from '@/utils/productApi';
import { searchString } from '@/utils/stringHelper';

// account management with ant design table
const AccountsManager = () => {
    const [filterInput, setFilterInput] = useState([]);
    const token = localStorageUtils.getItem('token');
    const [allAccounts, setAllAccount] = useState([]);
    const [accountList, setAccountList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { Search } = Input;
    const { TabPane } = Tabs;
    const onChange = async (checkedValues) => {
        if (checkedValues.length === 0) {
            setAccountList(allAccounts);
        } else {
            const filterList = await allAccounts.filter(({ generationYear }) => {
                return checkedValues.includes(generationYear.toString());
            });
            setAccountList(filterList);
        }
    };
    useEffect(() => {}, [accountList]);
    const loadMoreData = async () => {
        setLoading(true);
        await productApi
            .getAllAccount(token)
            .then((result) => {
                setLoading(false);
                setAccountList(result.data.data || []);
                setAllAccount(result.data.data);
            })

            .catch((err) => toastError(err));
    };
    useEffect(() => {
        loadMoreData();
    }, []);
    useEffect(() => {
        filterData();
    }, [filterInput]);
    const handleSearch = (value) => {
        setFilterInput(value);
    };
    const filterData = () => {
        if (filterInput === '') setAccountList(allAccounts);
        else {
            const filteredList = allAccounts.filter(
                ({ firstName, lastName, studentId }) =>
                    // firstName.toLowerCase().includes(filterInput.toLowerCase()) ||
                    // lastName.toLowerCase().includes(filterInput.toLowerCase()) ||
                    // studentId.toLowerCase().includes(filterInput.toLowerCase())
                    searchString(firstName, filterInput) ||
                    searchString(lastName, filterInput) ||
                    searchString(studentId, filterInput)
            );
            setAccountList(filteredList);
        }
    };
    const handleChange = () => {};
    const dataSource = (tab) => {
        if (tab.category === 0) return accountList;
        return accountList.filter((member) => member.positionId === tab.category);
    };
    return (
        <Divider>
            <TabContainer>
                <h3>Lọc theo khóa</h3>
                <Checkbox.Group
                    style={{
                        width: '100%',
                    }}
                    onChange={onChange}
                >
                    <StyledCol span={24}>
                        <Checkbox value="15">Khóa 15</Checkbox>
                    </StyledCol>
                    <StyledCol span={24}>
                        <Checkbox value="16">Khóa 16</Checkbox>
                    </StyledCol>
                    <StyledCol span={24}>
                        <Checkbox value="17">Khóa 17</Checkbox>
                    </StyledCol>
                    <StyledCol span={24}>
                        <Checkbox value="18">Khóa 18</Checkbox>
                    </StyledCol>
                </Checkbox.Group>
            </TabContainer>
            <Wrapper>
                {/* Header Section*/}
                <SearchBox>
                    <Search
                        placeholder="Nhập tên bài viết cần tìm"
                        enterButton
                        onSearch={handleSearch}
                    />
                </SearchBox>
                {/* End of Header Section*/}
                <ListWrapper id="scrollableDiv">
                    <Tabs defaultActiveKey="0" onChange={handleChange}>
                        {tabs.map((tab) => {
                            return (
                                <TabPane tab={tab.name} key={tab.key}>
                                    <List
                                        dataSource={dataSource(tab)}
                                        renderItem={(item) => (
                                            <List.Item
                                                key={item.email}
                                                actions={actions_btn.map((action) => (
                                                    <ListAction
                                                        key={action.key}
                                                        type={action.type}
                                                        name={action.name}
                                                        status={action.isLinked}
                                                        id={item.id}
                                                        item={item}
                                                    />
                                                ))}
                                            >
                                                <List.Item.Meta
                                                    avatar={<Avatar src={item.avatarUrl} />}
                                                    title={item.lastName + ' ' + item.firstName}
                                                    description={item.studentId}
                                                />
                                            </List.Item>
                                        )}
                                    ></List>
                                </TabPane>
                            );
                        })}
                    </Tabs>
                </ListWrapper>
            </Wrapper>
        </Divider>
    );
};

export default AccountsManager;
