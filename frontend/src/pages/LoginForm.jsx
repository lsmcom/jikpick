// src/pages/LoginForm.jsx
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Wrapper, Logo } from '../pages/LoginContainer';

const LoginBox = styled.div`
  width: 400px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 30px 32px 50px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
`;



const Input = styled.input`
  width: 100%;
  max-width: 370px;
  padding: 14px 16px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  &::placeholder {
    color: #aaa;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: #FB4A67;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 0;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 20px;
`;

const StayLogin = styled.label`
  font-size: 14px;
  color: #555;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  cursor: pointer;

  input[type='checkbox'] {
    appearance: none;
    margin: 0;
    width: 16px;
    height: 16px;
    border: 1.5px solid #999;
    border-radius: 50%;
    position: relative;
  }

  input[type='checkbox']::after {
    content: '✔';
    color: white;
    font-size: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    display: none;
  }

  input[type='checkbox']:checked {
    background-color: #FB4A67;
    border-color: #FB4A67;
  }

  input[type='checkbox']:checked::after {
    display: block;
  }
`;
const Links = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: center;
  width: 100%;
  color: #555;
  flex-wrap: wrap;

  a {
    text-decoration: none;
    color: #555;
    padding: 0 6px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function LoginForm() {
  return (
    <Wrapper>
      <Logo to="/">JIKPICK</Logo>
      <LoginBox>
        <Title>로그인</Title>
        <Input placeholder="ID" />
        <Input placeholder="PW" type="password" />
        <StayLogin>
          <input type="checkbox" />
          로그인 상태 유지
        </StayLogin>
        <LoginButton>로그인</LoginButton>
        <Links>
          <NavLink to="/findID">아이디 찾기</NavLink>
          <NavLink to="/findPW">비밀번호 찾기</NavLink>
          <NavLink to="/signup">회원가입</NavLink>
        </Links>
      </LoginBox>
    </Wrapper>
  );
}