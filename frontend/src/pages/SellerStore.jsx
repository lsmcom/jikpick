import styled from 'styled-components';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReviewTab from '../components/ProductDetail/ReviewTab';
import sellerProfile from '../assets/images/profile1.jpg';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Pretendard', sans-serif;
`;

const FlexArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: left;
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

const SaveButton = styled.button`
  margin-top: 12px;
  align-self: flex-end;
  background-color: #FB4A67;
  color: white;
  font-size: 14px;
  padding: 8px 22px;
  border: none;
  border-radius: 16px;
  cursor: pointer;

  &:hover {
    background-color: #e0405f;
  }
`;

const SellerBox = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 16px; // ✅ Header랑 똑같이
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 24px;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
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

const Rating = styled.p`
  font-size: 14px;
  color: #555;
`;

const Description = styled.p`
  margin-top: 0px;
  font-size: 14px;
  color: #555;
`;

const DescriptionTextarea = styled.textarea`
  margin-top: 12px;
  font-size: 14px;
  padding: 10px;
  width: 96%;
  height: 100px;
  resize: none;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

export default function SellerStore() {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState('안녕하세요 오로라마켓 믿고 맡겨주세요!');
  const [tempDescription, setTempDescription] = useState(description);

  const seller = {
    name: '오로라마켓',
    rating: 3.5,
    reviewCount: 21,
    productCount: 6,
    image: sellerProfile,
  };

  const handleEditClick = () => {
    setTempDescription(description);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setDescription(tempDescription);
    setIsEditing(false);
  };

  return (
    <Container>
      <Header />

      <SellerBox>
        <ProfileImage src={seller.image} alt="판매자 프로필" />
        <InfoBox>
          <FlexArea>
            <Name>{seller.name}</Name>
            <EditButton onClick={handleEditClick}>프로필 수정</EditButton>
          </FlexArea>

          <Rating>
            별점 <span style={{ color: '#ffe600' }}>⭐</span> {seller.rating.toFixed(1)} (14) · 후기 {seller.reviewCount} · 상품 {seller.productCount}개
          </Rating>

          {isEditing ? (
            <>
              <DescriptionTextarea
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
              />
              <SaveButton onClick={handleSaveClick}>수정 완료</SaveButton>
            </>
          ) : (
            <Description>{description}</Description>
          )}
        </InfoBox>
      </SellerBox>

      <ReviewTab />
      <Footer />
    </Container>
  );
}
