import styled from 'styled-components';
import heartIcon from '../../assets/icon/HeartIcon.svg';
import { useNavigate } from 'react-router-dom';

const Grid = styled.div`
  width: 100%;
  max-width: 1200px; 
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 270px);
  gap: 40px;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 250px;
  background-color: #f0f0f0;
  border-radius: 6px;
  background-size: cover;
  background-position: center;
  margin-bottom: 8px;
`;


const ContentArea = styled.div`
  padding: 5px;
`;

const FlexForLike = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
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

export default function ProductCardGrid({ items = [] }) {
  const navigate = useNavigate();

  if (!Array.isArray(items)) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  return (
    <Grid>
      {items.map((item) => (
        <div
          key={item.itemNo}
          onClick={() => navigate(`/items/${item.itemNo}`)}
          style={{ cursor: 'pointer' }}
        >
         <Card onClick={() => navigate(`/items/${item.itemNo}`)}>
            <Thumbnail
              style={{
                backgroundImage: item.itemImage
                  ? `url(http://localhost:9090${item.itemImage})`
                  : 'none',
              }}
            />
            <ContentArea>
              <Title>{item.itemName}</Title>
              <FlexForLike>
                <Price>{item.itemCost.toLocaleString()}원</Price>
                <LikeSection>
                  <img src={heartIcon} alt="하트" />
                  <span>{item.itemWish}</span>
                </LikeSection>
              </FlexForLike>
            </ContentArea>
          </Card>

        </div>
      ))}
    </Grid>
  );
}
