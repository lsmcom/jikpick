import Slider from 'react-slick';
import styled from 'styled-components';

const banners = [
  '/assets/banner1.jpg',
  '/assets/banner2.jpg',
  '/assets/banner3.jpg',
];

const Wrapper = styled.div`
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;

  .slick-dots {
    bottom: 10px;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
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
        {banners.map((src, i) => (
          <SlideImage key={i} src={src} alt={`banner-${i}`} />
        ))}
      </Slider>
    </Wrapper>
  );
}
