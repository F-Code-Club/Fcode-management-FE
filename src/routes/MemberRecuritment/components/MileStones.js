import { useSelector } from 'react-redux';

import Element from './Element';
import { Container } from './styled';

function MileStones() {
    const { listOfMilestones } = useSelector((state) => state.listOfEvents);
    return (
        <Container>
            {listOfMilestones.map((element) => {
                return <Element key={element.id} event={element} />;
            })}
        </Container>
    );
}

export default MileStones;
