import img from '../../../assets/image/404.png';
import { Img, Box, Container } from './styled';

function Empty() {
    return (
        <Container>
            <Img src={img} />
            <Box>
                Bạn vẫn chưa có cột mốc nào<br></br> Tạo cột mốc để mở ra hành trình mới?
            </Box>
        </Container>
    );
}

export default Empty;
