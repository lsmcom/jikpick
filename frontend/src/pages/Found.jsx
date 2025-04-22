// src/pages/Found.jsx
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* ✅ 가운데 정렬로 수정 */
  margin-top: 68px;
  padding-bottom: 50px;
  font-family: 'Pretendard', sans-serif;
`;

const Logo = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 64px;
  color: #FB4A67;
  text-align: center;
  margin-top: 69px;
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
  align-items: center;
`;


const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const Message = styled.div`
  width: 100%;
  box-sizing: border-box;   /* ✅ 패딩 포함해서 너비 계산 */
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  padding: 14px 20px;
  font-size: 15px;
  text-align: center;
  margin-bottom: 24px;
`;

const FooterLinks = styled.div`
  font-size: 13px;
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

export default function Found() {
  return (
    <Wrapper>
      <Logo>JIKPICK</Logo>
      <Box>
        <Title>아이디 확인</Title>
        <Message>000 회원님의 아이디는 <strong>qwer1234</strong>입니다!</Message>
        <FooterLinks>
          <NavLink to="/findPW">비밀번호 찾기</NavLink>
          <NavLink to="/login">로그인</NavLink>
        </FooterLinks>
      </Box>
    </Wrapper>
  );
}
