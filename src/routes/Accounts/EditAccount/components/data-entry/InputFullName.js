import { Input } from 'antd';
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
        <Input
            disabled={true}
            placeholder="Họ và tên"
            value={fullName}
            onChange={handleFullNameChange}
        />
    );
};

export default InputFullName;
