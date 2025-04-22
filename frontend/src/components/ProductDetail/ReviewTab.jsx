// src/components/ProductDetail/ReviewTab.jsx
import { useState } from 'react';
import styled from 'styled-components';
import ReviewList from './ReviewList';
import ProductCardGrid from './ProductCardGrid'; // 판매상품 카드 컴포넌트

const TabWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 40px auto 0 auto;
`;


const TabMenu = styled.div`
 padding-left: 17px;
  width: 100%;              // ✅ 부모(TabWrapper)의 1200px 안으로 정렬됨
  margin: 0 auto 40px;
  display: flex;
  gap: 32px;
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

  return (
    
    <TabWrapper>
      <TabMenu>
        <Tab active={activeTab === 'product'} onClick={() => setActiveTab('product')}>
          판매상품(6)
        </Tab>
        <Tab active={activeTab === 'review'} onClick={() => setActiveTab('review')}>
          상품후기(21)
        </Tab>
      </TabMenu>

            {activeTab === 'product' ? (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <ProductCardGrid />
        </div>
      ) : (
        <ReviewList />
      )}

    </TabWrapper>
  );
}
