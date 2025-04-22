// src/pages/ResetPW.jsx
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  text-align: center;
`;

const Box = styled.div`
  width: 400px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 30px 32px 40px;
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

const MainButton = styled.button`
  width: 100%;
  background-color: #FB4A67;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 5px;
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
        <MainButton>비밀번호 수정</MainButton>
      </Box>
    </Wrapper>
  );
}
