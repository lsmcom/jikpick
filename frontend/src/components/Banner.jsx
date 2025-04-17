import Slider from 'react-slick';
import styled from 'styled-components';
import image1 from '../assets/images/banner1.jpg';
import image2 from '../assets/images/banner2.jpg';
import image3 from '../assets/images/banner3.png'; 


const banners = [image1, image2, image3];

const Wrapper = styled.div`
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  height: 300px; /* 테스트용 */
  background: yellow; /* 테스트용 */


  .slick-dots {
    bottom: 10px;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
`;

export default function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    speed: 500,
  };

  return (
    <Wrapper>
      <Slider {...settings}>
      {banners.map((src, i) => {
    console.log('이미지 경로:', src);
    return (
      <div key={i}>
        <SlideImage src={src} alt={`banner-${i}`} />
      </div>
            );
    })}
      </Slider>
    </Wrapper>


  
  );
}
