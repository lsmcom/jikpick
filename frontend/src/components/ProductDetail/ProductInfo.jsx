// src/components/ProductDetail/ProductInfo.jsx
import styled from 'styled-components';

const InfoWrapper = styled.div`
  flex: 1;
  height: 490px; // ✅ 이미지 높이랑 맞춰야 버튼이 아래로 갈 수 있어
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
  margin-bottom: 12px;
`;

const Price = styled.p`
  font-size: 28px;
  font-weight: bold;
  margin: 16px 0;
`;

const Seller = styled.p`
  margin-bottom: 25px;
`;

const Buttons = styled.div`
 
 position: absolute;
  bottom: 0;
  display: flex;
  gap: 30px;
  padding: 0px;

  button {
    width: 210px;
    padding: 14px 28px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    border: none;
  }

  .black {
    background-color: black;
    color: white;
  }

  .pink {
    background-color: #FB4A67;
    color: white;
  }
`;

export default function ProductInfo({ title, category, price, sellerName, createdAt }) {
  return (
    <InfoWrapper>
      <Title>{title}</Title>
      <Category>{category} ∙ {createdAt}</Category>
      <Price>{price.toLocaleString()}원</Price>
      <Seller>{sellerName} · 거래가능 상태</Seller>

      <Buttons>
        <button className="black">직픽톡</button>
        <button className="pink">구매하기</button>
      </Buttons>
    </InfoWrapper>
  );
}
