// src/components/ProductDetail/SellerProfile.jsx
import styled from 'styled-components';

const SellerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 1200px;
  padding: 45px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin: auto;
`;

const ProfileImage = styled.img`
  width: 66px;
  height: 66px;
  border-radius: 50%;
  object-fit: cover;
`;


const Rating = styled.p`
  font-size: 14px;
  color: #555;
  margin: 2px 0;
`;
const SellerInfo = styled.div`
  p {

    font-size: 18px;

    margin: 4px 0;
  }
`;

export default function SellerProfile({ seller }) {
  return (
<SellerWrapper>
  <ProfileImage src={seller.profileImage} alt="프로필 이미지" />
  <SellerInfo>
    <p>
      <strong>{seller.name}</strong>
      &nbsp;
      <span style={{ color: '#ffe600' }}>⭐</span> {seller.rating.toFixed(1)} (14)
    </p>
    <p>상품 6개</p>
  </SellerInfo>
</SellerWrapper>

  );
}
