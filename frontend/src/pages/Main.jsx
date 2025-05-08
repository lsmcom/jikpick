import styled from 'styled-components';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import { useEffect, useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';

import axios from '../api/axios';


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
import sleevelessImg from '../assets/images/sleeveless.jpg';
import vestImg from '../assets/images/vest.jpg';
import jumperImg from '../assets/images/jumper.jpg';
import paddingImg from '../assets/images/padding.jpg';
import longteeImg from '../assets/images/longtee.jpg';
import knitImg from '../assets/images/knit.jpg';
import sweatshirtImg from '../assets/images/sweatshirt.jpg';
import shortteeImg from '../assets/images/shorttee.jpg';
import coatImg from '../assets/images/coat.jpg';
import jacketImg from '../assets/images/jacket.jpg';
import cardiganImg from '../assets/images/cardigan.jpg';
import clutchImg from '../assets/images/clutch.jpg';

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
  gap: 32px; // ✅ 간격 줄임
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
  min-width: 70px;
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
  cursor: pointer;
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;   // 최대 2줄
  -webkit-box-orient: vertical;
  word-break: break-word;
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
  //상품리스트 상태관리
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [popularCategories, setPopularCategories] = useState([]);

  const isLoggedIn = sessionStorage.getItem('user');

  const handleProtectedNavigate = (path) => {
    if (!isLoggedIn) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
      return;
    }
    navigate(path);
  };

  useEffect(() => {
    axios.get('http://localhost:9090/api/items/popular')
      .then((res) => {
        setProductList(res.data);
      })
      .catch((err) => {
        console.error('❌ 인기 상품 불러오기 실패:', err);
      })
      .finally(() => {
        setIsLoading(false); // ✅ 무조건 false 처리
      });
  }, []);  // 컴포넌트가 처음 렌더링 될 때 한번만 호출

  useEffect(() => {
    axios.get('http://localhost:9090/api/categories/popular-sub')
      .then((res) => {
        console.log('🔥 인기 소분류 카테고리:', res.data);
        setPopularCategories(res.data);
      })
      .catch((err) => {
        console.error('❌ 인기 카테고리 불러오기 실패:', err);
      });
  }, []);

  const categoryImages = {
    '민소매 티셔츠': sleevelessImg,
    '조끼/베스트': vestImg,
    '점퍼': jumperImg,
    '패딩': paddingImg,
    '긴팔 티셔츠': longteeImg,
    '니트/스웨터': knitImg,
    '맨투맨': sweatshirtImg,
    '셔츠/블라우스': blouseImg,
    '반팔 티셔츠': shortteeImg,
    '코트': coatImg,
    '자켓': jacketImg,
    '가디건': cardiganImg,
    '클러치백': clutchImg,
  };
  
  
  
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

  const handleCardClick = (itemNo) => {
    navigate(`/items/${itemNo}`);
  };

  // const categories = [
  //   { name: '스니커즈', icon: sneakersImg },
  //   { name: '골프', icon: golfImg },
  //   { name: 'SONY', icon: sonyImg },
  //   { name: '자전거', icon: bicycleImg },
  //   { name: '생활용품', icon: lifeImg },
  //   { name: '닌텐도', icon: nintendoImg },
  //   { name: '의류', icon: blouseImg },
  //   { name: '액세서리', icon: earingImg },
  //   { name: '전자기기', icon: heatImg },
  //   { name: '미용', icon: beautyImg },
  //   { name: '책', icon: bookImg }
  // ];


  // 👉 로딩 중엔 아무것도 렌더링하지 않음
  if (isLoading) return null;
  
  
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
          {popularCategories.map((c) => (
            <div
              key={c.cateNo}
              onClick={() => handleProtectedNavigate(`/category/${c.cateNo}`)}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <CategoryItem>
                <img
                  src={categoryImages[c.cateName] || bookImg}
                  alt={c.cateName}
                  style={{
                    width: '140px',
                    height: '140px',
                    borderRadius: '10%',
                    marginBottom: '6px',
                    objectFit: 'cover',
                  }}
                />
                {c.cateName}
              </CategoryItem>
            </div>
          ))}
        </CategoryBar>

        <SectionTitle>직픽인들의 픽!</SectionTitle>
        {Array.isArray(productList) && productList.length > 0 ? (
          <Grid>
            {productList.filter(product => product.pickStatus !== '거래완료').slice(0, 12).map((product) => (
              <Card onClick={() => handleProtectedNavigate(`/items/${product.itemNo}`)}>
                <Thumbnail
                  style={{
                    backgroundImage: product.itemImage
                      ? `url(http://localhost:9090/images/${product.itemImage})`
                      : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                  <Title>{product.itemName}</Title>
                  <ItemInfo>
                    <Price>{product.itemCost.toLocaleString()}원</Price>
                    <Like>
                      <img src={heartIcon} alt="좋아요" style={{ width: '18px', height: '18px' }} />
                      {product.itemWish}
                    </Like>
                  </ItemInfo>
                </Card>
            ))}
          </Grid>
        ) : (
          <p>상품이 없습니다</p>
        )}
      </Container>
      <Footer />
    </MainWrapper>
  );
  
}




 
