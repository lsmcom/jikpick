import { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 12px;
  width: 380px;
  padding: 24px;
  text-align: center;
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 12px;
`;

const ModalText = styled.p`
  font-size: 15px;
  color: #555;
  margin-bottom: 16px;
  line-height: 1.5;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
`;


const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const ModalButton = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background: ${({ cancel, disabled }) => {
    if (cancel) return '#f0f0f0';
    if (disabled) return '#FB4A67';
    return '#FB4A67';
  }};
  color: ${({ cancel }) => (cancel ? '#333' : '#fff')};
  opacity: ${({ cancel, disabled }) => (cancel ? 1 : disabled ? 0.5 : 1)};

  &:hover {
    background: ${({ cancel, disabled }) =>
      cancel ? '#e4e4e4' : disabled ? '#FB4A67' : '#e0405f'};
  }
`;


function CancelModal({ onCancel, onConfirm }) {
  const [reason, setReason] = useState('');

  return (
    <ModalOverlay>
      <ModalBox>
        <ModalTitle>판매를 정말 취소하실 건가요?</ModalTitle>
        <ModalText>
          일방적인 판매 취소가 계속되면<br />판매 활동에 제재를 받을 수 있어요.
        </ModalText>
        <Select value={reason} onChange={(e) => setReason(e.target.value)}>
        <option value="" style={{ color: '#aaa' }}>취소 사유를 선택해주세요</option>
        <option value="buyer_request">구매자가 취소를 요청했어요</option>
        <option value="stock_issue">재고가 부족해요</option>
        <option value="damage_found">상품에 문제가 생겼어요</option>
        <option value="other">기타 사유</option>
        </Select>


        <ModalButtons>
            <ModalButton cancel onClick={onCancel}>
                아니요
            </ModalButton>
            <ModalButton
                onClick={() => onConfirm(reason)}
                disabled={!reason}
                cancel={false}
            >
                판매 취소
            </ModalButton>
            </ModalButtons>

      </ModalBox>
    </ModalOverlay>
  );
}

export default CancelModal;
