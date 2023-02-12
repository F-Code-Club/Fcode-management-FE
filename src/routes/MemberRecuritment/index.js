import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import CreateBox from './components/CreateBox';
import Empty from './components/Empty';
import MileStones from './components/MileStones';
import { setMile } from './slice';
import { Container, Button } from './styled';

import localStorageUtils from '@/utils/localStorageUtils';
import productApi from '@/utils/productApi';

function Recruitment() {
    const token = localStorageUtils.getToken();
    const [isUpdated, SetUpdated] = useState(false);
    const dispatch = useDispatch();
    const { listOfMilestones } = useSelector((state) => state.listOfMilestones);
    var available = listOfMilestones.length > 0;
    const [create, setCreate] = useState(false);
    const handleOpenNew = () => {
        setCreate(true);
    };
    const handleClose = () => {
        setCreate(false);
    };
    useEffect(() => {
        getAllChallenge();
    }, []);
    const getAllChallenge = async () => {
        const path = await productApi.getAllChallenge(token);

        SetUpdated(true);
        dispatch(setMile(path.data.data));
    };

    return (
        <Container>
            {available && isUpdated && <MileStones />}
            {!available && <Empty />}
            <Button onClick={() => handleOpenNew()}>Tạo Cột mốc</Button>
            {create && <CreateBox handle={() => handleClose()} />}
        </Container>
    );
}

export default Recruitment;
