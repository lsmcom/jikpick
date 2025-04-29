// src/components/ProductDetail/ProductCardGrid.jsx
import styled from 'styled-components';
import heartIcon from '../../assets/icon/HeartIcon.svg';

const Grid = styled.div`
  width: 100%;
  max-width: 1200px; 
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 270px);
  gap: 40px;
`;

const Card = styled.div`
  background: #ddd;
  width: 100%;
  height: 270px;
  border-radius: 8px;
  position: relative;
`;

const ContentArea = styled.div`
  padding: 5px;
`;

const FlexForLike = styled.div`
  display: flex;
  align-items: center;
  gap: 12px; /* 가격과 하트 사이 여백 */
  margin-top: 8px;
`;

const Title = styled.div`
  margin-top: 8px;
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 20px;
`;

const LikeSection = styled.div`
  
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
  }

  span {
    font-size: 20px;
    color: #fb4a67;
    margin-left: 6px;
  }
`;

export default function ProductCardGrid() {
  return (
    <Grid>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}>
          <Card />
          <ContentArea>
            <Title>파타고니아 후드티</Title>
            <FlexForLike>
              <Price>38,000원</Price>
              <LikeSection>
                <img src={heartIcon} alt="하트" />
                <span>12</span>
              </LikeSection>
            </FlexForLike>
          </ContentArea>
        </div>
      ))}
    </Grid>
  );
}
