import { Input, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { actions } from '../../slice';
import selector from '../../slice/selectors';

const InputPhone = () => {
    const dispatch = useDispatch();

    const phone = useSelector(selector.phone);
    const handlePhoneChange = (e) => {
        dispatch(actions.setPhone(e.target.value));
        dispatch(actions.getAccount());
    };

    return (
        <Form.Item
            name="phone"
            rules={[
                { required: true, message: 'SĐT không được để trống !!' },
                {
                    message: 'SĐT chưa đúng format !!',
                    validator: (_, value) => {
                        if (
                            /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
                                value
                            )
                        ) {
                            return Promise.resolve();
                        } else {
                            return Promise.reject('Some message here');
                        }
                    },
                },
            ]}
        >
            <Input placeholder="SDT" value={phone} onChange={handlePhoneChange} />
        </Form.Item>
    );
};

export default InputPhone;
