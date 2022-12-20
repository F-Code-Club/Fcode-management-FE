import { Input, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

// import * as yup from 'yup';
import { actions } from '../../slice';
import selector from '../../slice/selectors';

const InputFullName = () => {
    const dispatch = useDispatch();
    // const yupSync = {
    //     async validator({ field }, value) {
    //         await schema.validateSyncAt(field, { [field]: value });
    //     },
    // };
    // let schema = yup.object().shape({
    //     name: yup.string().required(),
    //     age: yup.number().required().typeError('Number only.').positive().integer().round(),
    // });
    const fullName = useSelector(selector.fullName);
    const handleFullNameChange = (e) => {
        dispatch(actions.setFullName(e.target.value));
        dispatch(actions.getAccount());
    };

    return (
        <Form.Item
            name="age"
            label="Họ và tên"
            rules={[
                { required: true, message: 'Tên không được để trống !!' },
                {
                    message: 'this is custom',
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
            <Input placeholder="Họ và tên" value={fullName} onChange={handleFullNameChange} />
        </Form.Item>
    );
};

export default InputFullName;
