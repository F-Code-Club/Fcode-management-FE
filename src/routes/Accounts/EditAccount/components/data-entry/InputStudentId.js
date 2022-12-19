import { Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { actions } from '../../slice';
import selector from '../../slice/selectors';

const InputStudentId = () => {
    const dispatch = useDispatch();

    const StudentId = useSelector(selector.studentId);
    const handleStudentIdChange = (e) => {
        dispatch(actions.setStudentId(e.target.value));
        dispatch(actions.getAccount());
    };

    return (
        <Input
            disabled={true}
            placeholder="MSSV"
            value={StudentId}
            onChange={handleStudentIdChange}
        />
    );
};

export default InputStudentId;
