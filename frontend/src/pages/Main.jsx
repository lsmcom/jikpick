import styled from 'styled-components';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import { useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';


import sneakersImg from '../assets/images/sneakers.jpg';
import golfImg from '../assets/images/golf.jpg';
import sonyImg from '../assets/images/sony.jpg';
import bicycleImg from '../assets/images/bicycle.png';
import lifeImg from '../assets/images/life.jpg';
import nintendoImg from '../assets/images/nintendo.jpg';
import blouseImg from '../assets/images/blouse.jpg';
import earingImg from '../assets/images/earing.jpg';
import heatImg from '../assets/images/heat.png';
import beautyImg from '../assets/images/beauty.jpg';
import bookImg from '../assets/images/book.jpg';
import heartIcon from '../assets/icon/HeartIcon.svg'
// 필요한 만큼 추가


const MainWrapper = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CategoryBar = styled.div`
  display: flex;
  gap: 60px;
  overflow-x: auto;
  margin: 20px 0;
  padding-bottom: 8px;
  cursor: grab;
  user-select: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #444;
  min-width: 60px;
  flex-shrink: 0;
`;

const SectionTitle = styled.h2`
  font-size: 30px;
  font-weight: 600;
  text-align: left;
  margin: 24px 0 12px;
  font-family: 'Pretendard', sans-serif;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 한 줄에 4개
  gap: 20px; // 카드 사이 여백
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  font-size: 20px;
  font-family: 'Pretendard', sans-serif;
  margin-bottom: 20px;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 250px;
  background-color: #f0f0f0;
  border-radius: 6px;
  margin-bottom: 8px;
  object-fit: cover;
`;

const ItemInfo = styled.div`
  display: flex;
  justify-content: left; // 가격과 하트 아이콘이 좌우로 정렬되게 함
  align-items: center; // 세로 정렬
  gap: 20px; // 필요한 간격을 여기서 조정할 수 있습니다
`;

const Title = styled.div`
  font-weight: 500;
  text-align: left;
  margin-top: 15px;
  margin-bottom: 4px;
`;

const Price = styled.div`
  color: #222;
  font-weight: bold;
`;

const Like = styled.div`
  color: #FB4A67;
  font-size: 17px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export default function Main() {
  const scrollRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const onMouseDown = (e) => {
    isDown = true;
    scrollRef.current.classList.add('dragging');
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDown = false;
    scrollRef.current.classList.remove('dragging');
  };

  const onMouseUp = () => {
    isDown = false;
    scrollRef.current.classList.remove('dragging');
  };

  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const categories = [
    { name: '스니커즈', icon: sneakersImg },
    { name: '골프', icon: golfImg },
    { name: 'SONY', icon: sonyImg },
    { name: '자전거', icon: bicycleImg },
    { name: '생활용품', icon: lifeImg },
    { name: '닌텐도', icon: nintendoImg },
    { name: '의류', icon: blouseImg },
    { name: '액세서리', icon: earingImg },
    { name: '전자기기', icon: heatImg },
    { name: '미용', icon: beautyImg },
    { name: '책', icon: bookImg }
  ];

  const productList = [
    { title: '패딩/니트 후드티', price: '38,000원', likes: 12, img: sneakersImg },
    { title: '골프공 세트', price: '45,000원', likes: 8, img: golfImg },
    { title: 'SONY 헤드폰', price: '120,000원', likes: 17, img: sonyImg },
    { title: '산악 자전거', price: '230,000원', likes: 6, img: bicycleImg },
    { title: '주방 생활용품', price: '15,000원', likes: 3, img: lifeImg },
    { title: '닌텐도 스위치', price: '380,000원', likes: 21, img: nintendoImg },
    { title: '여성 블라우스', price: '29,000원', likes: 7, img: blouseImg },
    { title: '은귀걸이 세트', price: '19,800원', likes: 5, img: earingImg }
  ];
  
  
  
  return (
    <MainWrapper>
      <Container>
        <Banner />

        <CategoryBar
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {categories.map((c) => (
            <Link to={`/popular/${encodeURIComponent(c.name)}`} key={c.name} style={{ textDecoration: 'none', color: 'inherit' }}>
            <CategoryItem>
              <img
                src={c.icon}
                alt={c.name}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '10%',
                  marginBottom: '6px',
                  objectFit: 'cover'
                }}
              />
              {c.name}
            </CategoryItem>
          </Link>
          ))}
        </CategoryBar>

        <SectionTitle>오늘의 상품</SectionTitle>
        <Grid>
          {productList.map((item, i) => (
            <Link to={`/product/${i + 1}`} key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card>
              <Thumbnail style={{ backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <Title>{item.title}</Title>
                <ItemInfo>
                  <Price>{item.price}</Price>
                  <Like>
                            <img src={heartIcon} alt="좋아요" style={{ width: '18px', height: '18px' }} />
                            3
                          </Like>
                </ItemInfo>
              </Card>
            </Link>
          ))}
      </Grid>

      </Container>
      <Footer />
    </MainWrapper>
  );
}
