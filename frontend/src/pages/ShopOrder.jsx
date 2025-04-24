import styled from 'styled-components'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import leftArrow from '../assets/icon/LeftArrow.svg'
import { NavLink, useNavigate } from 'react-router-dom';
import heartIcon from '../assets/icon/HeartIcon.svg'; 
import sportsBag from '../assets/images/SportsBag.svg'
import gamingMouse from '../assets/images/GamingMouse.svg'
import mugCup from '../assets/images/MugCup.svg'
import ring from '../assets/images/Ring.svg'

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
  padding-bottom: 34px; // 구분선과 간격
`;

const LeftArrowIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px; // 아이콘과 텍스트 간 간격
  padding-bottom: 34px; // 구분선과 간격
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

  img {
    width: 20px;
    height: 20px;
  }

  span {
    display: block;
    font-size: 12px;
    margin-top: 4px;
    color: #333;
  }
`;

const ActionButtons = styled.div`
  position: absolute;
  bottom: 28px;
  right: 50px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ActionButton = styled(NavLink)`
  background-color: #fb4a67;
  color: white !important;
  font-size: 18px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  width: 80px;
  height: 20px;

  &:hover {
    background-color: #e13c58;
  }
`;

export default function ShopOrder() {

    const navigate = useNavigate();

    const dummyData = [
        {
          id: 1,
          name: '잔스포츠가방-핑크',
          region: '인천광역시 연수구',
          seller: '하츄핑',
          price: '25,000원',
          status: '거래완료',
          likes: 60,
          image: sportsBag,
        },
        {
          id: 2,
          name: '로지텍 게이밍 마우스',
          region: '서울특별시 서초구',
          seller: '서울역개발자',
          price: '105,000원',
          status: '거래완료',
          likes: 25,
          image: gamingMouse,
        },
        {
          id: 3,
          name: '스타벅스 머그컵',
          region: '경기도 양주시 옥정동',
          seller: '계양맘은수',
          price: '10,000원',
          status: '거래완료',
          likes: 21,
          image: mugCup,
        },
        {
          id: 4,
          name: '못된고양이 반지',
          region: '경기도 남양주시 별내동',
          seller: '공덕걸스',
          price: '5,000원',
          status: '거래완료',
          likes: 30,
          image: ring,
        },
      ];

    return (
        <Wrapper>
            <Header />
            <Outer>
                <Inner>
                <TitleBox>
                    <LeftArrowIcon 
                        src={leftArrow} 
                        alt="왼쪽 화살표" 
                        onClick={() => navigate(-1)}
                    />
                    <Title>구매내역</Title>
                </TitleBox>

                <ItemList>
                    {dummyData.map((item) => (
                        <ItemCard key={item.id}>
                        <ItemImage src={item.image} alt={item.name} />
                        <ItemInfo>
                            <InfoTop>
                                <ItemName>{item.name}</ItemName>
                                <Region>{item.region}</Region>
                                <Seller>{item.seller}</Seller>
                                <Price>{item.price}</Price>
                            </InfoTop>
                            {item.status && <StatusTag>{item.status}</StatusTag>}
                        </ItemInfo>
                        <LikeSection>
                            <img src={heartIcon} alt="하트" />
                            <span>{item.likes}</span>
                        </LikeSection>

                        <ActionButtons>
                            <ActionButton to="/write-review">거래취소</ActionButton>
                            <ActionButton to="/cancel-order">리뷰쓰기</ActionButton>
                        </ActionButtons>
                        </ItemCard>
                    ))}
                    </ItemList>
                </Inner>
            </Outer>
            <Footer />
        </Wrapper>
    );
}