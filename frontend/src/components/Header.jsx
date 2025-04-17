// src/components/Header.jsx
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  font-family: 'Pretendard', sans-serif;
  
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 24px;
  font-size: 18px;
  color: #555;
  gap: 16px;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 15px;
`;

const MiddleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
`;

const Logo = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 40px;
  color: #FB4A67;
  margin-right: 40px;
  padding-bottom: 3px;
`;

const SearchInput = styled.input`
  padding: 10px 20px;
  border: none;
  border-radius: 32px;
  background-color: #f2f2f2;
  width: 700px;
  height: 28px;
  font-size: 14px;
`;

const MiddleRight = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 20px;
  font-weight: 500;
`;

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  font-size: 20px;
`;

const MenuIcon = styled.div`
  font-size: 20px;
  cursor: pointer;
`;

const LocationIcon = styled.span`
  color: #FB4A67;
  font-size: 16px;
`;

export default function Header({ isLoggedIn }) {
  return (
    <HeaderWrapper>
      <TopBar>
        {isLoggedIn ? (
          <>
            <a href="#">로그아웃</a>
          </>
        ) : (
          <>
            <a href="#">로그인</a>
            <a href="#">회원가입</a>
          </>
        )}
      </TopBar>

      <MiddleBar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo>JIKPICK</Logo>
          <SearchInput placeholder="상품명, 지점명으로 검색" />
        </div>
        <MiddleRight>
          <a href="#">판매하기</a>
          <a href="#">프로필</a>
          <a href="#">직픽톡</a>
        </MiddleRight>
      </MiddleBar>

      <BottomBar>
        <MenuIcon>☰</MenuIcon>
        <LocationIcon>📍</LocationIcon>
        <a href="#">지역설정</a>
        <a href="#">직픽지점 조회</a>
      </BottomBar>
    </HeaderWrapper>
  );
}