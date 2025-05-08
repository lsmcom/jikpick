import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReviewList from './ReviewList';
import ProductCardGrid from './ProductCardGrid';
import DefaultProfile from '../../assets/images/DefaultProfile.svg';
import axios from '../../api/axios';

const TabWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 30px auto 0 auto;
  font-family: 'Pretendard', sans-serif;
  overflow-x: hidden; /* 오른쪽으로 밀리지 않게 설정 */
  overflow-y: auto; /* 세로 스크롤을 추가 */
  height: 100%; /* 탭 영역의 높이를 100%로 설정 */
  padding-bottom:${({ $isReviewTabActive }) => ($isReviewTabActive ? '100px' : '0px')};
`;

const TabMenu = styled.div`
  width: 100%;
  margin: 0 auto 30px;
  display: flex;
  gap: 10px; /* 간격을 줄여봅니다 */
  font-weight: bold;
`;

const Tab = styled.button`
   font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $active }) => ($active ? '#000' : '#888')};
  border-bottom: ${({ $active }) => ($active ? '2px solid #000' : 'none')};
  padding-bottom: 4px;
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
`;

export default function ReviewTab({ userNo }) {
  // 탭 상태 저장/불러오기
const [activeTab, setActiveTab] = useState(() => {
  return sessionStorage.getItem('activeReviewTab') || 'product';
});
const [reviews, setReviews] = useState([]);

const isReviewTabActive = activeTab === 'review';

const tempReviews = [
    {
      profile: DefaultProfile,
      writer: '라떼는 말이야',
      content: '오로라여신 정말 감사합니다~ 직접 보지 못해서 걱정했는데 상태가 정말 좋다고 합니다!',
    },
    {
      profile: DefaultProfile,
      writer: '송도찐정연',
      content: '이런 이쁘게 찍은 필터리가 좋군요,, ㅠㅠㅠ 잘 받을게요 진짜 감사합니다!!',
    },
    {
      profile: DefaultProfile,
      writer: '쿨거래가이',
      content: '여기는 늘 믿고 삽니다',
    },
    {
      profile: DefaultProfile,
      writer: '품질 좋으면 짖는 개',
      content: '월!! 월워우웡!! 왕!! 크르르',
    },
    {
      profile: DefaultProfile,
      writer: '깐깐징어',
      content: '이정도면 뭐... 가격 값은 하네요',
    },
  ];


useEffect(() => {
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/reviews/seller/${userNo}`);
      setReviews(response.data); // 판매자의 모든 상품에 대한 리뷰를 받아옴
    } catch (error) {
      console.error('리뷰 불러오기 실패:', error);
      setReviews(tempReviews);
    }
  };
  
  fetchReviews();

}, [userNo]);

const handleTabClick = (tab) => {
  setActiveTab(tab);
  sessionStorage.setItem('activeReviewTab', tab);
};

  return (
    <TabWrapper $isReviewTabActive={isReviewTabActive}>
      <TabMenu>
      <Tab $active={activeTab === 'product'} onClick={() => handleTabClick('product')}>
        판매상품(6)
      </Tab>
      <Tab $active={activeTab === 'review'} onClick={() => handleTabClick('review')}>
        상품후기({reviews.length})
      </Tab>

      </TabMenu>

      {activeTab === 'product' ? (
        <ProductCardGrid />
      ) : (
        <ReviewList reviews={reviews} />
      )}
    </TabWrapper>
  );
}