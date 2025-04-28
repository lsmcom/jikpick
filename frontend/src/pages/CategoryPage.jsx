import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import heartIcon from '../assets/icon/HeartIcon.svg'
import { useEffect, useState } from 'react';

// 🔧 스타일 컴포넌트
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 1200px;
  padding: 0 20px;
`;

const Breadcrumb = styled.div`
  font-size: 16px;
  color: #888;
  margin: 20px 0;
`;

const Location = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-bottom: 40px;
`;

const CategoryBox = styled.div`
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  font-size: 20px;

  font-weight: 500; 

  cursor: pointer;
  background: white;

  &:hover {
    border-color: #FB4A67;
    color: #FB4A67;
  }
`;

const SectionTitle = styled.h2`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 24px;
  span {
    color: #FB4A67;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  font-size: 20px;
  font-family: 'Pretendard', sans-serif;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 250px;
  background-color: #f0f0f0;
  border-radius: 6px;
  margin-bottom: 8px;
`;

const ProductName = styled.div`
  font-weight: 500;
  margin: 6px 0;
  text-align: left;
`;

const PriceAndLike = styled.div`
  display: flex;
  justify-content: left;
  gap: 20px;
  align-items: center;
`;

const Price = styled.div`
  font-weight: bold;
  text-align: left;
`;

const Like = styled.div`
  color: #FB4A67;
  font-size: 17px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export default function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  
  // ⭐ 현재 선택된 카테고리 상태 추가
  const [currentCategory, setCurrentCategory] = useState(categoryName);

  // ⭐ categoryName이 바뀔 때마다 업데이트
  useEffect(() => {
    setCurrentCategory(categoryName);
  }, [categoryName]);

  const dummyList = Array.from({ length: 8 }).map((_, i) => ({
    name: `${currentCategory} 상품 ${i + 1}`,
    price: '38,000원',
    like: 17,
  }));

  const categories = ['전체보기', '아우터', '상의', '바지', '치마', '원피스', '점프수트', '세트', '언더웨어/홈웨어', '테마/이벤트'];

  const handleCategoryClick = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`);
  };

  return (
    <Wrapper>
      <Container>
        <Breadcrumb>홈 &gt; 여성의류 &gt; 아우터 &gt; {currentCategory}</Breadcrumb>
        <Location>경기도 고양시 일산동구</Location>

        <CategoryGrid>
          {categories.map((cat) => (
            <CategoryBox key={cat} onClick={() => handleCategoryClick(cat)}>
              {cat}
            </CategoryBox>
          ))}
        </CategoryGrid>

        <SectionTitle><span>{currentCategory}</span>의 추천 상품</SectionTitle>

        <Grid>
          {dummyList.map((item, index) => (
            <Card key={index}>
              <Thumbnail />
              <ProductName>{item.name}</ProductName>
              <PriceAndLike>
                <Price>{item.price}</Price>
                <Like>
                  <img src={heartIcon} alt="좋아요" style={{ width: '18px', height: '18px' }} />
                  3
                </Like>
              </PriceAndLike>
            </Card>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Wrapper>
  );
}