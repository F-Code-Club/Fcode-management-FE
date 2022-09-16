import { Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { actions } from '../../slice';
import selector from '../../slice/selectors';

const InputFullName = () => {
    const dispatch = useDispatch();

    const fullName = useSelector(selector.fullName);

    const handleFullNameChange = (e) => {
        dispatch(actions.setFullName(e.target.value));
    };

    return <Input placeholder="Họ và tên" value={fullName} onChange={handleFullNameChange} />;
};

export default InputFullName;
