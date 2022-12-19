import { Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { actions } from '../../slice';
import selector from '../../slice/selectors';

const InputPersonalEmail = () => {
    const dispatch = useDispatch();

    const personalEmail = useSelector(selector.personalEmail);

    const handlePersonalEmailChange = (e) => {
        dispatch(actions.setPersonalEmail(e.target.value));
        dispatch(actions.getAccount());
    };

    return (
        <Input
            placeholder="personal_email@gmail.com"
            value={personalEmail}
            onChange={handlePersonalEmailChange}
        />
    );
};

export default InputPersonalEmail;
