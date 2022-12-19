import { Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { actions } from '../../slice';
import selector from '../../slice/selectors';

const { Option } = Select;

const SelectMajor = () => {
    const dispatch = useDispatch();

    const crews = useSelector(selector.crews);
    const crewId = useSelector(selector.crewId);

    const handleGenderChange = (value) => {
        dispatch(actions.setCrewId(value));
        dispatch(actions.getAccount());
    };

    return (
        <Select defaultValue={crews[crewId]} onChange={handleGenderChange}>
            {crews.map((crew, index) => (
                <Option value={index} key={index}>
                    {crew}
                </Option>
            ))}
        </Select>
    );
};

export default SelectMajor;
