// src/components/ProductDetail/ReviewList.jsx
import styled from 'styled-components';
import ReviewSeller from './ReviewSeller';

// 필요하면 더 import

const ReviewListWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  width: 1200px;
  margin: 40px auto 0 auto;
`;

export default function ReviewList({ itemId }) {
  // 더미 리뷰 데이터
  const reviews = [
    {
      writer: '라떼는 말이야',
      
      content: '오로라여신 정말 감사합니다~ 직접 보지 못해서 걱정했는데 상태가 정말 좋다고 합니다!',
    },
    {
      writer: '송도찐정연',
     
      content: '이런 이쁘게 찍은 필터리가 좋군요,, ㅠㅠㅠ 잘 받을게요 진짜 감사합니다!!',
    },
    // ...
  ];

  return (
    <ReviewListWrapper>
      {reviews.map((review, index) => (
        <ReviewSeller key={index} review={review} />
      ))}
    </ReviewListWrapper>
  );
}
