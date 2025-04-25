import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import leftArrow from '../assets/icon/LeftArrow.svg';
import { useNavigate } from 'react-router-dom';

const reasons = [
  '찾는 물품이 없어요',
  '물품이 안 팔려요',
  '비매너 사용자를 만났어요',
  '새 상점을 만들고 싶어요',
  '개인정보를 삭제하고 싶어요',
  '기타',
];

export default function WithdrawReason() {
  const navigate = useNavigate();

  const handleSelect = (reason) => {
    // 선택된 사유를 다음 페이지로 전달
    navigate('/withdrawConfirm', { state: { reason } });
  };

  return (
    <Wrapper>
      <Header />
      <Outer>
        <Inner>
          <TitleBox>
            <img src={leftArrow} alt="뒤로가기" onClick={() => navigate(-1)} />
            <Title>탈퇴 사유가 무엇인가요?</Title>
          </TitleBox>

          <ReasonList>
            {reasons.map((reason) => (
              <ReasonItem key={reason} onClick={() => handleSelect(reason)}>
                {reason}
              </ReasonItem>
            ))}
          </ReasonList>
        </Inner>
      </Outer>
      <Footer />
    </Wrapper>
  );
}

// styled-components 생략 (기존과 동일)


// ✅ 레이아웃
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Outer = styled.div`
  width: 100%;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 0;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;        // 세로 중앙 정렬
  gap: 12px;                  // 아이콘과 타이틀 간격
  padding: 24px 0;            // ✅ 위아래 여백 확보
  border-bottom: 1px solid #e5e5e5;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;           // ✅ 라인 정렬 안정화
  transform: translateY(1px); // ✅ 약간 아래로 내리기 (시각적 보정)
`;


// ✅ 탈퇴 사유 리스트
const ReasonList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 40px 0;
`;

const ReasonItem = styled.li`
  font-size: 18px;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  color: ${({ selected }) => (selected ? '#000' : '#444')};
  cursor: pointer;
  display: flex;
  justify-content: space-between;

  &::after {
    content: '>';
    color: #999;
  }
`;

// ✅ 유의사항
const SubTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Notice = styled.ul`
  font-size: 15px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 32px;

  li {
    margin-bottom: 8px;
    a {
      color: #00a862;
      text-decoration: underline;
      margin-left: 4px;
    }
  }
`;

// ✅ 버튼 영역
const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
`;

const CancelButton = styled.button`
  flex: 1;
  background: #eee;
  padding: 14px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const WithdrawButton = styled.button`
  flex: 1;
  background: #fb4a67;
  padding: 14px;
  font-size: 16px;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #e13c58;
  }
`;
