import { Input } from 'antd';
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

    return <Input disabled={true} placeholder="MSSV" value={phone} onChange={handlePhoneChange} />;
};

export default InputPhone;
