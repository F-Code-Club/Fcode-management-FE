import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import CreateBox from './components/CreateBox';
import Empty from './components/Empty';
import MileStones from './components/MileStones';
import { setMile } from './slice';
import { Container, Button } from './styled';

import { token } from '@/utils/data';
import productApi from '@/utils/productApi';

function Recruitment() {
    const [isUpdated, SetUpdated] = useState(false);
    const dispatch = useDispatch();
    const { listOfMilestones } = useSelector((state) => state.listOfMilestones);
    console.log(listOfMilestones);
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
        console.log(path.data);
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
