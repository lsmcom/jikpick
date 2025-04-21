// src/components/ProductDetail/SellerProfile.jsx
import styled from 'styled-components';

const SellerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 1100px;
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

const SellerInfo = styled.div`
  p {
    margin: 4px 0;
  }
`;

export default function SellerProfile({ seller }) {
  return (
    <SellerWrapper>
      <ProfileImage src={seller.profileImage} alt="프로필 이미지" />
      <SellerInfo>
        <p><strong>{seller.name}</strong> · {seller.rating.toFixed(1)} (14)</p>
        <p>상품 6개</p> {/* 실제 상품 수는 추후 props로 분리 가능 */}
      </SellerInfo>
    </SellerWrapper>
  );
}
