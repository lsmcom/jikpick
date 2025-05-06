import styled from 'styled-components'; 
import Footer from '../components/Footer';
import leftArrow from '../assets/icon/LeftArrow.svg'
import { useNavigate } from 'react-router-dom';
import heartIcon from '../assets/icon/HeartIcon.svg'; 
import axios from '../api/axios';
import { useEffect, useState } from 'react';

// 📦 전체 페이지 레이아웃 컨테이너
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column; // 위아래 방향 정렬
  align-items: center; // 중앙 정렬
`;

// 📦 내부 콘텐츠를 감싸는 외부 wrapper (좌우 여백 포함)
const Outer = styled.div`
  width: 100%;
`;

// 📦 콘텐츠 최대 너비 제한 및 중앙 정렬을 위한 wrapper
const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto; // 수평 중앙 정렬
  padding: 18px 0; // 위아래 여백
`;

// 📌 페이지 최상단의 제목과 구분선을 감싸는 영역
const TitleBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e5e5; // 아래 구분선
`;

// 📝 페이지 제목 (ex. 상품등록)
const Title = styled.h2`
  font-size: 26px;
  font-weight: 600;
  margin: 0;
  padding-bottom: 35px; // 구분선과 간격
`;

const LeftArrowIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px; // 아이콘과 텍스트 간 간격
  margin-left: -5px;
  padding-bottom: 35px; // 구분선과 간격
  cursor: pointer;
`;


const ItemList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemCard = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  padding: 28px 0;
  position: relative;
  cursor: pointer;
`;

const ItemImage = styled.img`
  width: 190px;
  height: 190px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 25px;
`;

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoTop = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-top: 5px;
  margin: 0;
`;

const Region = styled.span`
  font-size: 18px;
  color: #555;
  margin-top: 6px;
`;

const Seller = styled.span`
  font-size: 18px;
  color: #777;
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-top: 20px;
`;

const StatusTag = styled.div`
  display: inline-block;
  background-color: #fb4a67;
  color: white;
  font-size: 18px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 8px;
  margin-top: 8px;
  width: 80px;
  height: 20px;
  text-align: center;
`;

const LikeSection = styled.div`
  position: absolute;
  top: 25px;
  right: 50px;
  margin-top: 5px;
  text-align: center;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 4px;
    color: #333;
  }
`;

export default function ShopLike() {

    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isHoveringLike, setIsHoveringLike] = useState(false);

    const userData = JSON.parse(sessionStorage.getItem('user'));
    const userNo = userData?.userNo;

    useEffect(() => {
      const fetchFavorites = async () => {
        try {
          const res = await axios.get('/api/favorites/my', {
            params: { userNo }
          });
          setFavorites(res.data);
        } catch (error) {
          console.error('관심목록 불러오기 실패', error);
        }
      };
  
      fetchFavorites();
    }, [userNo]);
  
    const handleUnwish = async (itemNo) => {
      try {
        await axios.post(`/api/items/${itemNo}/wish`, {
          wish: false,
          userNo,
        });
  
        // 성공적으로 해제되면 목록에서 제거
        setFavorites(prev => prev.filter(item => item.itemNo !== itemNo));
      } catch (error) {
        console.error('찜 해제 실패', error);
      }
    };

    return (
        <Wrapper>
            <Outer>
                <Inner>
                  <TitleBox>
                      <LeftArrowIcon 
                          src={leftArrow} 
                          alt="왼쪽 화살표" 
                          onClick={() => navigate(-1)}
                      />
                      <Title>관심목록</Title>
                  </TitleBox>

                  <ItemList>
                    {favorites.map((item) => (
                      <ItemCard 
                        key={item.itemNo} 
                        onClick={() => navigate(`/items/${item.itemNo}`)}
                        onMouseEnter={() => setHoveredItem(item.itemNo)}
                        onMouseLeave={() => {
                          setHoveredItem(null);
                          setIsHoveringLike(false);
                        }}
                        style={{
                          backgroundColor:
                            hoveredItem === item.itemNo && !isHoveringLike ? '#f9f9f9' : 'transparent',
                        }}
                      >
                        <ItemImage src={`http://localhost:9090/images/${item.itemImage}`} alt="상품 이미지" />
                        <ItemInfo>
                          <InfoTop>
                            <ItemName>{item.itemName}</ItemName>
                            <Region>서울특별시 강남구</Region> {/* 지금은 더미 값, 추후 백엔드 추가 가능 */}
                            <Seller>{item.sellerNick}</Seller>
                            <Price>{item.itemCost.toLocaleString()}원</Price>
                          </InfoTop>
                          {item.pickStatus && item.pickStatus !== '판매중' && (
                            <StatusTag>{item.pickStatus}</StatusTag>
                          )}
                        </ItemInfo>

                        {/* ✅ 하트 영역 클릭 시 상세 이동 막기 */}
                        <LikeSection
                          onMouseEnter={() => setIsHoveringLike(true)}
                          onMouseLeave={() => setIsHoveringLike(false)}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnwish(item.itemNo);
                          }}
                        >
                          <img src={heartIcon} alt="하트" />
                          <span>{item.itemWish}</span>
                        </LikeSection>
                      </ItemCard>
                    ))}
                  </ItemList>
                </Inner>
            </Outer>
            <Footer />
        </Wrapper>
    );
}