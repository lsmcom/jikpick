import Slider from 'react-slick';
import styled, { createGlobalStyle } from 'styled-components';
import image1 from '../assets/images/banner1.jpg';
import image2 from '../assets/images/banner2.jpg';
import image3 from '../assets/images/banner3.jpg';

const banners = [image1, image2, image3];

// ✅ slick 내부 구조 수정 (중첩 div에도 radius 적용)
const GlobalSlickFix = createGlobalStyle`
  .slick-slide > div {
    border-radius: 8px;
    overflow: hidden;
  }

  .slick-list {
    overflow: hidden !important;
  }
`;

const Wrapper = styled.div`
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;

  .slick-dots {
    bottom: 10px;
  }
`;

const Slide = styled.div`
  overflow: hidden;
  border-radius: 8px;
  background-color: white;
`;

const SlideImage = styled.img`
  width: 100%;
  aspect-ratio: 3 / 1;
  height: auto;
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
    <>
      <GlobalSlickFix /> {/* ✅ slick 스타일 오류 방지용 글로벌 스타일 */}
      <Wrapper>
        <Slider {...settings}>
          {banners.map((src, i) => (
            <Slide key={i}>
              <SlideImage src={src} alt={`banner-${i}`} />
            </Slide>
          ))}
        </Slider>
      </Wrapper>
    </>
  );
}
