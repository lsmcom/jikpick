// ✅ styled-components
import styled from 'styled-components';
import Footer from '../components/Footer';
import leftArrow from '../assets/icon/LeftArrow.svg';
import heartIcon from '../assets/icon/HeartIcon.svg'; 
import sportsBag from '../assets/images/SportsBag.svg';
import gamingMouse from '../assets/images/GamingMouse.svg';
import mugCup from '../assets/images/MugCup.svg';
import ring from '../assets/images/Ring.svg';
import ReviewModal from '../components/ReviewModal';
import { useNavigate, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Outer = styled.div`
  width: 100%;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 0;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 600;
  margin: 0;
  padding-bottom: 35px;
`;

const LeftArrowIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  margin-left: -5px;
  padding-bottom: 35px;
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
  text-align: center;

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
  font-size: 16px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  width: 80px;
  height: 32px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #e13c58;
  }
`;

export default function ShopOrder() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [purchaseList, setPurchaseList] = useState([]);

  const handleReviewSubmit = (review) => {
    console.log('제출된 리뷰:', review);
    setModalOpen(false);
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userNo = user?.userNo;
  
    if (!userNo) return;
  
    axios.get(`/api/purchases/user?userNo=${userNo}`)
      .then(res => {
        console.log('📦 구매내역:', res.data); // ✅ 로그 꼭 확인
        setPurchaseList(res.data);
      })
      .catch(err => {
        console.error('구매내역 불러오기 실패', err);
      });
  }, []);

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
            <Title>구매내역</Title>
          </TitleBox>

          <ItemList>
            {purchaseList.map((item) => (
              <ItemCard key={item.itemNo}>
                <ItemImage src={`/images/${item.itemImage}`} alt={item.itemName} />
                <ItemInfo>
                  <InfoTop>
                    <ItemName>{item.itemName}</ItemName>
                    <Region>{item.storeName}</Region>
                    <Seller>{item.sellerNick}</Seller>
                    <Price>{item.itemCost.toLocaleString()}원</Price>
                  </InfoTop>
                  <StatusTag>{item.pickStatus}</StatusTag>
                </ItemInfo>

                <LikeSection>
                  <img src={heartIcon} alt="하트" />
                  <span>{item.itemWish}</span>
                </LikeSection>

                <ActionButtons>
                  <ActionButton as="button" onClick={() => setModalOpen(true)}>리뷰쓰기</ActionButton>
                </ActionButtons>
              </ItemCard>
            ))}
          </ItemList>
        </Inner>
      </Outer>
      <Footer />

      {modalOpen && (
        <ReviewModal
          onClose={() => setModalOpen(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </Wrapper>
  );
}