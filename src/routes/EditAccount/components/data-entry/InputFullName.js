import { Input, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { actions } from '../../slice';
import selector from '../../slice/selectors';

const InputFullName = () => {
    const dispatch = useDispatch();

    const fullName = useSelector(selector.fullName);
    const handleFullNameChange = (e) => {
        dispatch(actions.setFullName(e.target.value));
        dispatch(actions.getAccount());
    };

    return (
        <Form.Item
            name="fullName"
            rules={[{ required: true, message: 'Tên không được để trống !!' }]}
        >
            <Input placeholder="Họ và tên" value={fullName} onChange={handleFullNameChange} />
        </Form.Item>
    );
};

export default InputFullName;
