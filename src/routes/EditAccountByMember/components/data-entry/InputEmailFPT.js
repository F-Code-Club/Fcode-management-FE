import { Input, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { actions } from '../../slice';
import selector from '../../slice/selectors';

const InputEmailFPT = () => {
    const dispatch = useDispatch();

    const emailFPT = useSelector(selector.emailFPT);

    const handleEmailFPTChange = (e) => {
        dispatch(actions.setEmailFPT(e.target.value));
        dispatch(actions.getAccount());
    };

    return (
        <Form.Item
            name="emailFPT"
            rules={[
                { required: true, message: 'Email fpt không được để trống !!' },
                {
                    message: 'Email fpt phải chứa @fpt.edu.vn',
                    validator: (_, value) => {
                        if (/^[a-z0-9](\.?[a-z0-9]){5,}@fpt.edu.vn$/.test(value)) {
                            return Promise.resolve();
                        } else {
                            return Promise.reject('Some message here');
                        }
                    },
                },
            ]}
        >
            <Input
                disabled={true}
                placeholder="student_id@fpt.edu.vn"
                value={emailFPT}
                onChange={handleEmailFPTChange}
            />
        </Form.Item>
    );
};

export default InputEmailFPT;
