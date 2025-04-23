// src/pages/ResetPW.jsx
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Wrapper, Logo } from '../pages/LoginContainer';

const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 16px;
  padding-right: 32px;
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
      <Logo to="/">JIKPICK</Logo>
      <Box>
        <Title>비밀번호 재설정</Title>
        <InputRow>
        <Input placeholder="새비밀번호" type="password" />
        <Input placeholder="비밀번호 확인" type="password" />
        </InputRow>
        <MainButton to="/login">비밀번호 수정</MainButton>
      </Box>
    </Wrapper>
  );
}
