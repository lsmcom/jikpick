import { useState } from 'react';
import styled from 'styled-components';
import ReviewList from './ReviewList';
import ProductCardGrid from './ProductCardGrid';

const TabWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 40px auto 0 auto;
  font-family: 'Pretendard', sans-serif;
  overflow-x: hidden; /* 오른쪽으로 밀리지 않게 설정 */
  overflow-y: auto; /* 세로 스크롤을 추가 */
  height: 100%; /* 탭 영역의 높이를 100%로 설정 */
  padding-bottom: ${({ isReviewTabActive }) => (isReviewTabActive ? '100px' : '0px')}; /* 버튼 클릭 시 여백 추가 */
`;

const TabMenu = styled.div`
  width: 100%;
  margin: 0 auto 40px;
  display: flex;
  gap: 10px; /* 간격을 줄여봅니다 */
  font-weight: bold;
`;

const Tab = styled.button`
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ active }) => (active ? '#000' : '#888')};
  border-bottom: ${({ active }) => (active ? '2px solid #000' : 'none')};
  padding-bottom: 4px;
  font-weight: ${({ active }) => (active ? '700' : '500')};
`;

export default function ReviewTab() {
  const [activeTab, setActiveTab] = useState('product');

  // 여백 조정을 위해 isReviewTabActive 상태 추가
  const isReviewTabActive = activeTab === 'review';

  return (
    <TabWrapper isReviewTabActive={isReviewTabActive}>
      <TabMenu>
        <Tab active={activeTab === 'product'} onClick={() => setActiveTab('product')}>
          판매상품(6)
        </Tab>
        <Tab active={activeTab === 'review'} onClick={() => setActiveTab('review')}>
          상품후기(21)
        </Tab>
      </TabMenu>

      {activeTab === 'product' ? (
        <ProductCardGrid />
      ) : (
        <ReviewList />
      )}
    </TabWrapper>
  );
}
