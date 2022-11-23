import { useState } from 'react';

import { useSelector } from 'react-redux';

import CreateBox from './components/CreateBox';
import Empty from './components/Empty';
import MileStones from './components/MileStones';
import { Container, Button } from './styled';

function Recuritment() {
    const { listOfMilestones } = useSelector((state) => state.listOfEvents);
    var available = listOfMilestones.length > 0;
    const [create, setCreate] = useState(false);
    const handleOpenNew = () => {
        setCreate(true);
    };
    const handleClose = () => {
        setCreate(false);
    };

    return (
        <Container>
            {available && <MileStones />}
            {!available && <Empty />}
            <Button onClick={() => handleOpenNew()}>Tạo Cột mốc</Button>
            {create && <CreateBox handle={() => handleClose()} />}
        </Container>
    );
}

export default Recuritment;
