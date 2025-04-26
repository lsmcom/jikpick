// ✅ ReviewModal.jsx (별점 1~5점 단위로 적용)
import styled from 'styled-components'; 
import { useState } from 'react';

export default function ReviewModal({ onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (rating === 0 || text.trim() === '') {
      alert('별점과 리뷰를 모두 작성해주세요!');
      return;
    }
    onSubmit({ rating, text });
  };

  return (
    <Overlay>
      <ModalBox>
        <HeaderRow>
          <Title>리뷰쓰기</Title>
          <CloseBtn onClick={onClose}>×</CloseBtn>
        </HeaderRow>

        <StarRow>
          {[1, 2, 3, 4, 5].map((num) => (
            <StarButton
              key={num}
              selected={rating >= num}
              onClick={() => setRating(num)}
            >
              {rating >= num ? '★' : '☆'}
            </StarButton>
          ))}
        </StarRow>

        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="구매하신 상품은 어떠셨나요? (최대 300자)"
          maxLength={300}
        />

        <BottomRow>
          <CharCount>{text.length} / 300</CharCount>
          <SubmitBtn onClick={handleSubmit}>작성완료</SubmitBtn>
        </BottomRow>
      </ModalBox>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: bold;
  padding-left: 8px;
`;

const CloseBtn = styled.button`
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
`;

const StarRow = styled.div`
  display: flex;
  gap: 4px;
  margin: 18px 0;
  margin-top: 0;
`;

const StarButton = styled.button`
  font-size: 30px;
  color: ${({ selected }) => (selected ? '#FB4A67' : '#ccc')};
  background: none;
  border: none;
  cursor: pointer;
  margin:0
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  font-family: 'pretendard';
  font-size: 16px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #FB4A67;
  }
`;

const BottomRow = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CharCount = styled.span`
  font-size: 14px;
  color: #999;
`;

const SubmitBtn = styled.button`
  background-color: #FB4A67;
  color: white;
  font-weight: 600;
  padding: 8px 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #e13c58;
  }
`;
