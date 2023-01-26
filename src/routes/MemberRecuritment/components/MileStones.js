import { useSelector } from 'react-redux';

import Element from './Element';
import { Container } from './styled';

function MileStones() {
    const { listOfMilestones } = useSelector((state) => state.listOfMilestones);
    let reversedArray = [...listOfMilestones].reverse();

    return (
        <Container>
            {reversedArray.map((element) => {
                return <Element key={element.id} event={element} />;
            })}
        </Container>
    );
}

export default MileStones;
