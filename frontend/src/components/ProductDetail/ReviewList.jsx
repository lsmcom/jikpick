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
    // 추가 리뷰들...
  ];

  return (
    <ReviewListWrapper>
      {reviews.map((review, index) => (
        <ReviewSeller key={index} review={review} />
      ))}
    </ReviewListWrapper>
  );
}
