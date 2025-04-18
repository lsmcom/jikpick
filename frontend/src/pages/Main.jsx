import styled from 'styled-components';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import { useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MainWrapper = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  width: 100%;
`

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
`;

const ItemInfo = styled.div`
  display: flex;
`

const Title = styled.div`
  font-weight: 500;
  text-align: left;
  margin-bottom: 4px;
`;

const Price = styled.div`
  color: #222;
  font-weight : bold;
  text-align: left;
  margin-bottom: 4px;
`;

const Like = styled.div`
  color: #FB4A67;
  text-align: right;
  font-size: 17px;
  margin-left: 18px;
  margin-top: 3px;
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
    { name: '스니커즈' },
    { name: '골프' },
    { name: 'SONY' },
    { name: '자전거' },
    { name: '생활용품' },
    { name: '닌텐도' },
    { name: '의류' },
  ];

  return (
    <MainWrapper>
      <Header isLoggedIn={false} />
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
            <CategoryItem key={c.name}>
              <div style={{
                width: '120px',
                height: '120px',
                fontWeight: 'bold',
                backgroundColor: '#eee',
                borderRadius: '10%',
                marginBottom: '6px'
              }} />
              {c.name}
            </CategoryItem>
          ))}
        </CategoryBar>

        <SectionTitle>오늘의 상품</SectionTitle>
        <Grid>
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <Thumbnail />
              <Title>패딩/니트 후드티</Title>
              <ItemInfo>
              <Price>38,000원</Price>
              <Like>❤️ 12</Like>
              </ItemInfo>
            </Card>
          ))}
        </Grid>
      </Container>
      <Footer />
    </MainWrapper>
  );
}
