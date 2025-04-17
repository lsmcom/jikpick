import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e5e5e5;
  font-family: 'Pretendard', sans-serif;
`;

const Logo = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #FB4A67;
`;

const Nav = styled.nav`
  display: flex;
  gap: 24px;
  color: #333;
  font-size: 14px;
`;

const AuthArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  a {
    color: #555;
    font-size: 14px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SearchInput = styled.input`
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 240px;
  font-size: 14px;
`;

export default function Header({ isLoggedIn }) {
  return (
    <HeaderContainer>
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        <Logo>JIKPICK</Logo>
        <Nav>
          <a href="#">기본판매점</a>
          <a href="#">직거래조회</a>
        </Nav>
      </div>

      <AuthArea>
        <SearchInput placeholder="상품명, 지점명으로 검색" />
        {isLoggedIn ? (
          <>
            <a href="#">마이페이지</a>
            <a href="#">로그아웃</a>
          </>
        ) : (
          <>
            <a href="#">로그인</a>
            <a href="#">회원가입</a>
          </>
        )}
      </AuthArea>
    </HeaderContainer>
  );
}
