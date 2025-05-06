// src/components/ProductDetail/ProductInfo.jsx
import styled from 'styled-components';
import profileImg from '../../assets/images/profile1.jpg';
import { NavLink } from 'react-router-dom';
import heartIcon from '../../assets/icon/HeartIcon.svg'
import emptyHeartIcon from '../../assets/icon/EmptyHeartIcon.svg';
import starIcon from '../../assets/icon/StarIcon.svg'
import { useEffect, useState } from 'react';
import axios from '../../api/axios';

const InfoWrapper = styled.div`
  flex: 1;
  height: 410px;
  position: relative;
`;

const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 8px;
  margin-top: 0px;
`;

const Category = styled.p`
  color: #888;
  font-size: 18px;
  margin-bottom: 6px;
`;


const Like = styled.div`
  color: #FB4A67;
  font-size: 18px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px; /* 아이콘과 숫자 사이 여백 */
  cursor: pointer;
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
const Rating = styled.div`
  font-size: 16px;
  color: #555;
  margin: 2px 0;
  display: flex;
  align-items: center;
  gap: 4px;
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


export default function ProductInfo({ 
  title,
  category,
  price,
  sellerName,
  createdAt,
  itemWish,
  itemStatus,
  productId
  }) {

    // 찜 상태와 찜 횟수 상태 관리
    const [isWish, setIsWish] = useState(false);
    const [itemWishCount, setItemWishCount] = useState(itemWish);  // 찜 횟수

    // 상품 상태에 따른 텍스트 매핑
    const getItemStatusText = (status) => {
      switch (status) {
        case 'A':
          return '새 상품';
        case 'B':
          return '사용감 없음';
        case 'C':
          return '사용감 적음';
        case 'D':
          return '사용감 많음';
        case 'E':
          return '고장/파손 상품';
        default:
          return '상태 정보 없음';
      }
    };

    const handleWishToggle = () => {
      const userData = JSON.parse(sessionStorage.getItem('user'));
      const userNo = userData?.userNo;
    
      if (!userNo) {
        alert('로그인 후 사용해주세요.');
        return;
      }
    
      const newIsWish = !isWish;
      setIsWish(newIsWish); // UI 먼저 반영
    
      const payload = {
        wish: newIsWish,
        userNo: userNo,
      };
    
      axios.post(`/api/items/${productId}/wish`, payload)
        .then(() => {
          setItemWishCount((prev) => prev + (newIsWish ? 1 : -1));
        })
        .catch((error) => {
          console.error("❌ 찜 상태 변경 실패:", error);
          setIsWish(!newIsWish); // 실패시 롤백
        });
    };

    useEffect(() => {
      const userData = JSON.parse(sessionStorage.getItem('user'));
      const userNo = userData?.userNo;

      if (!userNo) {
        setIsWish(false);
        return;
      }

      axios.get(`/api/items/${productId}/wish/check`, {
        params: { userNo }
      })
        .then((res) => {
          setIsWish(res.data); // true or false
        })
        .catch((err) => {
          console.error('찜 여부 확인 실패', err);
          setIsWish(false); // 실패 시 안전하게 false 처리
        });
    }, [productId]);

    return (
      <InfoWrapper>
        <Title>{title}</Title>
        <Category>{category} ∙ {createdAt}</Category>
          <Like onClick={handleWishToggle}>
            <img 
              src={isWish ? heartIcon : emptyHeartIcon} 
              alt="좋아요" 
              style={{ width: '18px', height: '18px' }} 
            />
            {itemWishCount}
          </Like>

  
        <Price>{price.toLocaleString()}원</Price>
  
        <SellerInfo>
          <ProfileImg src={profileImg} alt="판매자 프로필" />
          <SellerText>
            <SellerName>{sellerName}</SellerName>
            <Rating>
              3.5
              <img src={starIcon} alt="별점" style={{ width: '16px', height: '16px', marginLeft: '2px' }} />
              (4)
            </Rating>
            <ProductStatus>• 상품 상태: {getItemStatusText(itemStatus)}</ProductStatus>
          </SellerText>
        </SellerInfo>
  
        <Buttons>
        <Button to="#" className="black">직픽톡</Button>
        <Button to="/order" className="pink">구매하기</Button>
      </Buttons>

      </InfoWrapper>
    );
  }
