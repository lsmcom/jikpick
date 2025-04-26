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
  padding-bottom: 33px;
  border-bottom: 1px solid #e5e5e5;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 600;
  margin: 0;
  padding-left: 10px;
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
const ReasonList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 30px 0;
`;

const ReasonItem = styled.li`
  font-size: 20px;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  color: ${({ selected }) => (selected ? '#000' : '#444')};
  cursor: pointer;
  display: flex;
  justify-content: space-between;  // 좌우 정렬
  align-items: center;  // 세로 중앙 정렬

  &::after {
    content: '>';
    color: #999;
    font-size: 20px;
    margin-left: 8px;
  }
`;

const Button = styled.button`
  flex: 1;
  padding: 14px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
`;

const CancelButton = styled(Button)`
  background: #eee;
`;

const WithdrawButton = styled(Button)`
  background: #fb4a67;
  color: white;

  &:hover {
    background-color: #e13c58;
  }
`;

export default function WithdrawReason() {
  const navigate = useNavigate();

  const handleSelect = (reason) => {
    navigate('/withdrawConfirm', { state: { reason } });
  };

  return (
    <Wrapper>
      <Header />
      <Outer>
        <Inner>
          <TitleBox>
            <LeftArrowIcon src={leftArrow} alt="뒤로가기" onClick={() => navigate(-1)} />
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
