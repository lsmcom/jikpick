// src/pages/Found.jsx
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';

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

const Box = styled.div`
  width: 400px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 30px 32px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const Message = styled.div.attrs({})`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  padding: 14px 16px;
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
