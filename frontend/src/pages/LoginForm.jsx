// src/pages/LoginForm.jsx
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard', sans-serif;
  padding-bottom: 120px;
`;

// 🔷 상단 로고
const Logo = styled(NavLink)`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 64px;
  color: #FB4A67 !important;  // ✅ 색상 강제 적용
  margin-bottom: 40px;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  &.active {
    color: #FB4A67 !important;  // ✅ active 상태에서도 유지
  }
`;


const LoginBox = styled.div`
  width: 400px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 30px 32px 50px;
  display: flex;
  flex-direction: column;
  align-items: stretch; /* ✅ 내부 요소 좌우 꽉 채움 */
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
  font-size: 13px;
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
        <Logo to="/">JIKPICK</Logo> {/* ✅ 로그인 박스 위로 뺌 */}
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
            <Links>
            <NavLink to="/findID">아이디 찾기</NavLink>
            <NavLink to="/findPW">비밀번호 찾기</NavLink>
            <NavLink to="/signup">회원가입</NavLink>
            </Links>

          </Links>
        </LoginBox>
      </Wrapper>
    );
  }
  