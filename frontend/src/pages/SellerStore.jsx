// src/pages/SellerStore.jsx
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReviewTab from '../components/ProductDetail/ReviewTab'; // 재사용
import sellerProfile from '../assets/images/profile1.jpg';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Pretendard', sans-serif;
`;

const FlexArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 45%;
`;

const EditButton = styled.button`
  background-color: #FB4A67;
  color: white;
  font-size: 14px;
  padding: 5px 12px;
  border: none;
  border-radius: 16px;
  cursor: pointer;

  &:hover {
    background-color: #e0405f;
  }
`;


const SellerBox = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 40px 0;
  border-bottom: 1px solid #eee;
  margin: auto;
  width: 1200px;
`;

const ProfileImage = styled.img`
  width: 240px;
  height: 240px;
  border-radius: 5%;
  object-fit: cover;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 500px;
  height: 240px;
  margin-top: 30px;
`;

const Name = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const Rating = styled.span`
margin-top: 30px;
  font-size: 16px;
  color: #666;
`;

const Description = styled.p`
  margin-top: 12px;
  font-size: 14px;
  color: #777;
`;

export default function SellerStore() {
  const seller = {
    name: '오로라마켓',
    rating: 3.5,
    reviewCount: 21,
    productCount: 6,
    description: '안녕하세요 오로라마켓 믿고 맡겨주세요!',
    image: sellerProfile,
  };

  return (
    <Container>
      <Header />

      <SellerBox>
        <ProfileImage src={seller.image} alt="판매자 프로필" />
        <InfoBox>
            <FlexArea> 
                <Name>{seller.name}</Name>
                <EditButton>프로필수정</EditButton>
            </FlexArea>
         
          <Rating>별점 {seller.rating} · 후기 {seller.reviewCount} · 상품 {seller.productCount}개</Rating>
          <Description>{seller.description}</Description>
        </InfoBox>
      </SellerBox>

      <ReviewTab />

      <Footer />
    </Container>
  );
}
