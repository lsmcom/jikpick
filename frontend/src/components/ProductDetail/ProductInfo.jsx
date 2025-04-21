// src/components/ProductDetail/ProductInfo.jsx
import styled from 'styled-components';
import profileImg from '../../assets/images/profile1.jpg';
import { NavLink } from 'react-router-dom';

const InfoWrapper = styled.div`
  flex: 1;
  height: 410px;
  padding-right: 10px;
  position: relative;
`;

const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 8px;
`;

const Category = styled.p`
  color: #888;
  font-size: 18px;
  margin-bottom: 6px;
`;

const Like = styled.p`
  color: red;
  font-size: 18px;
  margin-bottom: 12px;
`;

const Price = styled.p`
  font-size: 28px;
  font-weight: bold;
  margin: 16px 0;
`;

const SellerInfo = styled.div`
  display: flex;
  align-items: top;
  gap: 12px;
  margin-bottom: 20px;
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  
  border-radius: 50%;
`;

const SellerText = styled.div`
  display: flex;
  flex-direction: column;
  height: 50px;
`;



const SellerName = styled.p`
  font-weight: bold;
  margin: 0;
`;

const Rating = styled.p`
  font-size: 16px;
  color: #555;
  margin: 2px 0;
`;

const ProductStatus = styled.p`
  font-size: 16px;
  color: gray;
  margin-top: 24px;
  margin-left: -58px;
`;

const Buttons = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 0px; /* ✅ 좌우 여백 조정 */
`;

const Button = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  padding: 14px 28px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  border: none;
  border-radius: 6px;
  color: #ffffff;

  &.black {
    color: white;
    background-color: black;
  }

  &.pink {
    color: white;
    background-color: #FB4A67;
  }
`;


export default function ProductInfo({ title,
  category,
  price,
  sellerName,
  createdAt,
  }) {
    return (
      <InfoWrapper>
        <Title>{title}</Title>
        <Category>{category} ∙ {createdAt}</Category>
        <Like>❤️ 3</Like>
  
        <Price>{price.toLocaleString()}원</Price>
  
        <SellerInfo>
          <ProfileImg src={profileImg} alt="판매자 프로필" />
          <SellerText>
            <SellerName>{sellerName}</SellerName>
            <Rating>3.5 ⭐ (4)</Rating>
            <ProductStatus>• 상품 상태: 고장/파손 상품</ProductStatus>
          </SellerText>

          
          
        </SellerInfo>
  
        <Buttons>
        <Button to="#" className="black">직픽톡</Button>
        <Button to="/order" className="pink">구매하기</Button>
      </Buttons>

      </InfoWrapper>
    );
  }
