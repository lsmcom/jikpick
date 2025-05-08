// src/components/ProductDetail/SellerProfile.jsx
import styled from 'styled-components';
import starIcon from '../../assets/icon/StarIcon.svg'

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
          <img src={starIcon} alt="별 아이콘" style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginBottom: '2px' }} />
          &nbsp;{(seller.rating ?? 0).toFixed(1)} ({seller.ratingCount})
        </p>
        <p>상품 {seller.saleCount}개</p>
      </SellerInfo>
    </SellerWrapper>

  );
}
