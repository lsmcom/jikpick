// src/pages/ResetPW.jsx
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* ✅ 중앙정렬 대신 상단부터 시작 */
  padding-top: 86px;            /* ✅ 로그인폼 등과 일관되게 */
  padding-bottom: 120px;
  font-family: 'Pretendard', sans-serif;
`;


const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 16px;
  padding-right: 32px;
`;
const Logo = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 64px;
  color: #FB4A67;
  margin-bottom: 40px;
`;

const Box = styled.div`
  width: 400px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 30px 32px 50px;
  display: flex;
  flex-direction: column;
`;


const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;

  &::placeholder {
    color: #aaa;
  }
`;


const MainButton = styled(NavLink)`
  display: block;
  width: 100%;
  background-color: #FB4A67;
  color: white;
  color: white !important; 
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  margin: 20px 0;
  text-align: center;
  text-decoration: none;
`;

export default function ResetPW() {
  return (
    <Wrapper>
      <Logo>JIKPICK</Logo>
      <Box>
        <Title>비밀번호 재설정</Title>
        <InputRow>
        <Input placeholder="새비밀번호" type="password" />
        <Input placeholder="비밀번호 확인" type="password" />
        </InputRow>
        <MainButton to="/foundID">비밀번호 수정</MainButton>
      </Box>
    </Wrapper>
  );
}
