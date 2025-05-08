import styled from 'styled-components';

// ✅ 모달 전체 배경
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// ✅ 모달 컨텐츠 박스
export const ModalContent = styled.div`
  background: white;
  width: 420px;
  padding: 32px 24px;
  border-radius: 16px;
  position: relative;
  font-family: 'Pretendard', sans-serif;
`;

// ✅ 닫기 버튼
export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

// ✅ 모달 헤더 (제목 + 닫기버튼)
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  font-size: 18px;
  font-weight: 600;
`;

// ✅ 닫기 버튼 래퍼
export const CloseBtn = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }
`;

// ✅ 모달 본문 콘텐츠 영역
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// ✅ 확인 버튼 (중복 제거)
export const ConfirmBtn = styled.button`
  width: 100%;
  margin-top: 24px;
  padding: 14px;
  background-color: #FB4A67;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #e0405c;
  }
`;

// ✅ 모달 제목
export const ModalTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
`;

// ✅ 정보 설명 텍스트
export const ModalText = styled.p`
  font-size: 16px;
  color: #555;
  text-align: center;
  line-height: 1.6;
`;

// ✅ 가상계좌번호 박스 등 정보 박스
export const InfoBox = styled.div`
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  font-size: 16px;
  margin-top: 16px;
  text-align: center;
  word-break: break-word;
`;

// ✅ 바코드 이미지 박스
export const BarcodeImage = styled.img`
  margin: 24px auto;
  display: block;
  width: 160px;
  height: 160px;
  object-fit: contain;
`;

// ✅ 입금기한 텍스트
export const DeadlineText = styled.div`
  margin-top: 12px;
  font-size: 14px;
  color: #888;
  text-align: center;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center; // 또는 space-between 도 가능
  gap: 10px;
  margin-top: 32px;
`;

export const CancelButton = styled.button`
  width: 200px;
  padding: 14px 0;
  background-color: #ddd;
  color: #333;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;

export const ConfirmButton = styled.button`
  width: 200px;
  padding: 14px 0;
  background-color: #FB4A67;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #e0405c;
  }
`;

export default function PaymentModal({ method, onClose, onConfirm, icon }) {
  return (
    <ModalOverlay>
      <ModalContent>
        <Header>
          <span>{method} 결제</span>
          <CloseBtn onClick={onClose}>
            <img src={icon} alt="close" />
          </CloseBtn>
        </Header>

        <Content>
        {method === '무통장 (가상계좌)' && (
            <>
                <ModalTitle>가상계좌 발급 완료</ModalTitle>
                <ModalText>우리은행 1002-123-456789</ModalText>
                <DeadlineText>예금주: 직픽주식회사 / 입금 기한: 24시간 이내</DeadlineText>
            </>
            )}

            {method === '편의점 결제' && (
            <>
                <ModalTitle>편의점 결제 바코드</ModalTitle>
                <img src="/assets/icon/barcode.svg" alt="barcode" style={{ width: '80%', margin: '16px 0' }} />
                <DeadlineText>GS25, CU, 이마트24 등에서 결제 가능</DeadlineText>
            </>
            )}

            {method === '카카오페이' && (
            <>
                <ModalTitle>카카오페이 결제 중</ModalTitle>
                <img src="/assets/icon/kakaopay.svg" alt="kakaopay" style={{ width: '40%', margin: '16px 0' }} />
                <DeadlineText>카카오페이 결제가 완료되었습니다.</DeadlineText>
            </>
            )}

            {method === '네이버페이' && (
            <>
                <ModalTitle>네이버페이 결제</ModalTitle>
                <img src="/assets/icon/naverpay.svg" alt="naverpay" style={{ width: '40%', margin: '16px 0' }} />
                <DeadlineText>네이버페이로 결제가 완료되었습니다.</DeadlineText>
            </>
            )}

            {['체크카드', '휴대폰결제'].includes(method) && (
            <>
                <ModalTitle>{method} 결제 진행 중</ModalTitle>
                <ModalText>결제 정보를 확인 중입니다...</ModalText>
            </>
            )}

            {method === 'TossPay' && (
            <>
                <ModalTitle>TossPay 결제</ModalTitle>
                <ModalText>토스페이로 결제를 진행했습니다.</ModalText>
                <DeadlineText>결제가 정상적으로 완료되었습니다.</DeadlineText>
            </>
            )}
        </Content>

        <ButtonBox>
            <CancelButton onClick={onClose}>취소</CancelButton>
            <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
        </ButtonBox>
      </ModalContent>
    </ModalOverlay>
  );
}