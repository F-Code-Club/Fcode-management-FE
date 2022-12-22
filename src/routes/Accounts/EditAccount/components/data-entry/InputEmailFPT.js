import { Input } from 'antd';
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
        <Input
            disabled={true}
            placeholder="student_id@fpt.edu.vn"
            value={emailFPT}
            onChange={handleEmailFPTChange}
        />
    );
};

export default InputEmailFPT;
