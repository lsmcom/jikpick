// src/pages/Found.jsx
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { Wrapper, Logo } from '../pages/LoginContainer';

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
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const Message = styled.div.attrs({})`
  width: 100%;
  box-sizing: border-box;   /* ✅ 패딩 포함해서 너비 계산 */
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  padding: 14px 20px;
  font-size: 20px;
  text-align: center;
  margin-bottom: 24px;
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

export default function Found() {
  const location = useLocation();
  const foundId = location?.state?.foundId;

  console.log('🧪 전달받은 값:', foundId);

  return (
    <Wrapper>
      <Logo to="/">JIKPICK</Logo>
      <Box>
        <Title>아이디 확인</Title>
        <Message $isValid={true}>
          {foundId ? (
            <>
              회원님의 아이디는 <strong>{foundId}</strong>입니다!
            </>
          ) : (
            '잘못된 접근입니다.'
          )}
        </Message>
        <FooterLinks>
          <NavLink to="/findPW">비밀번호 찾기</NavLink>
          <NavLink to="/login">로그인</NavLink>
        </FooterLinks>
      </Box>
    </Wrapper>
  );
}
