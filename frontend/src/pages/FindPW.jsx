import { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Wrapper, Logo } from '../pages/LoginContainer';

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

const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
  padding-right: 32px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;

  &::placeholder {
    color: #aaa;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const SmallButton = styled.button`
  width: 100px;
  height: 48px;
  font-size: 14px;
  background-color: white;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
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

const FooterLinks = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: center;
  gap: 16px;
  color: #555;

  a {
    text-decoration: none;
    color: #555;

    &:hover {
      text-decoration: underline;
    }
  }
`;


export default function FindPassword() {
  const [showAuthField, setShowAuthField] = useState(false);

  return (
    <Wrapper>
      <Logo to="/">JIKPICK</Logo>
      <Box>
        <Title>비밀번호 찾기</Title>

        <InputRow>
          <Input placeholder="아이디" />
          <Input placeholder="이름" />
        </InputRow>

        <Row>
          <Input placeholder="이메일" style={{ flex: 1 }} />
          <SmallButton onClick={() => setShowAuthField(true)}>인증하기</SmallButton>
        </Row>

        {showAuthField && (
          <Row>
            <Input placeholder="인증번호" style={{ flex: 1 }} />
            <SmallButton>인증확인</SmallButton>
          </Row>
        )}

        <MainButton to="/resetPW">비밀번호 찾기</MainButton>

        <FooterLinks>
          <NavLink to="/findID">아이디 찾기</NavLink>
          <NavLink to="/login">로그인</NavLink>
        </FooterLinks>
      </Box>
    </Wrapper>
  );
}
