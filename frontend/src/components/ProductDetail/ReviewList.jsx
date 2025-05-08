// src/components/ProductDetail/ReviewList.jsx
import styled from 'styled-components';
import ReviewSeller from './ReviewSeller';

const ReviewListWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  margin: 40px auto;
  width: 100%;  // 부모의 크기를 100%로 채움
  max-width: 1200px;  // 최대 너비 1200px로 제한
`;

export default function ReviewList({ reviews }) {

  return (
    <ReviewListWrapper>
      {reviews.map((review, index) => (
        <ReviewSeller key={index} review={review} />
      ))}
    </ReviewListWrapper>
  );
}
