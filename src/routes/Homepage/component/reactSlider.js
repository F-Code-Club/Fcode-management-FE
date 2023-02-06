// requires a loader
import Banner_1 from '../../../assets/banner/banner_1.png';
import Banner_2 from '../../../assets/banner/banner_2.png';
import Banner_3 from '../../../assets/banner/banner_3.png';
import Banner_4 from '../../../assets/banner/banner_4.png';
import { CarouselStyled, ImgPreviewStyled } from '../style';

import { API_URL } from '@/config';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const IMG = [Banner_1, Banner_2, Banner_3, Banner_4];
const Carousel2 = () => {
    return (
        <CarouselStyled
            autoPlay={true}
            interval={3000}
            emulateTouch
            infiniteLoop
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
        >
            {IMG.map((el, id) => {
                return <img key={id} src={`${el}`} alt="ImgPreview" />;
            })}
        </CarouselStyled>
    );
};

export default Carousel2;
