// src/components/ProductDetail/ProductCardGrid.jsx
import styled from 'styled-components';

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
`;

const Title = styled.div`
  margin-top: 8px;
  font-size: 18px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
`;

const Like = styled.div`
  color: red;
  font-size: 18px;
  margin-left: 20px;
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
                <Price>38000원</Price>
                <Like>❤️ 17</Like>
              </FlexForLike>
            </ContentArea>
          </div>
        ))}
      </Grid>

  );
}
