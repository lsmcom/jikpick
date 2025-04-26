import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
// styled-components 생략 (이전 코드 재사용)


// styled-components 생략 (기존과 동일)


// ✅ 레이아웃
// 📦 뒤로가기 아이콘 스타일
const LeftArrowIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  margin-left: -5px; 
  cursor: pointer;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 34px;
  border-bottom: 1px solid #e5e5e5;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 600;
  margin: 0;
`;

const Outer = styled.div`
  width: 100%;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 0 80px; /* ⬅️ 아래쪽 패딩으로 푸터 여백 확보 */
  min-height: 70vh; /* ⬅️ 기본 높이 확보 (스크롤 유도용) */
`;
// ✅ 탈퇴 사유 리스트
const ReasonList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 40px 0;
`;



const Notice = styled.ul`
  font-size: 20px;
  color: #555;
  line-height: 1.6;
  margin-top: 40px;
  margin-bottom: 72px;

  li {
    margin-bottom: 8px;
    margin-left: -20px;
    a {
      color: #FB4A67;
      text-decoration: underline;
      margin-left: 4px;
    }
  }
`;
const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 40px;
`;

const CancelButton = styled.button`
  width: 300px;
  height: 50px;
  border: none;
  background-color: #f1f1f1;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #e4e4e4;
  }
`;

const WithdrawButton = styled.button`
  width: 300px;
  height: 50px;
  border: none;
  background-color: #FB4A67;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 500;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #e63c5b;
  }
`;


export default function WithdrawConfirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const reason = location.state?.reason || '기타';

  const handleWithdraw = () => {
    alert(`탈퇴 처리 완료`);
    navigate('/');
  };

  return (
    <Wrapper>
      <Header />
      <Outer>
        <Inner>
          <TitleBox>
            <Title>탈퇴 전 유의사항</Title>
          </TitleBox>

          <Notice>
            <li>탈퇴 후 7일간 재가입이 불가능합니다.</li>
            <li>유료 아이템은 소멸되며, 환불 불가입니다.</li>
            <li>계정 정보는 복구 불가하게 삭제됩니다.</li>
            <li>판매 접수된 스마트폰은 자동 취소됩니다.</li>
            <li>법적 기준에 따라 일부 정보는 일정 기간 보관됩니다.</li>
            <li>
              남은 포인트는 소멸됩니다. <a href="#">잔여 번개포인트</a>
            </li>
            <li>
              광고포인트는 환불 가능합니다. <a href="#">환불 가능한 광고포인트</a>
            </li>
          </Notice>

          <ButtonRow>
            <CancelButton onClick={() => navigate(-1)}>취소하기</CancelButton>
            <WithdrawButton onClick={handleWithdraw}>탈퇴하기</WithdrawButton>
          </ButtonRow>
        </Inner>
      </Outer>
      <Footer />
    </Wrapper>
  );
}

