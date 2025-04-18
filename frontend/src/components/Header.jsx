// src/components/Header.jsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import box from '../assets/icon/Logo.svg';
import search from '../assets/icon/SearchIcon.svg';
import ping from '../assets/icon/LocationPing.svg';
import menu from '../assets/icon/Menu.svg';
import CategoryDropdown from './CategoryDropdown';
import { useState } from 'react';

const HeaderWrapper = styled.header`
  font-family: 'Pretendard', sans-serif;
  width: 1200px;
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

const LogoIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 3px;
`

const Logo = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 40px;
  color: #FB4A67;
  margin-right: 40px;
  padding-bottom: 3px;
`;

const SearchBar = styled.div`
  position: relative;
  width: 650px;
`

const SearchInput = styled.input`
  width: 100%;
  height: 20px;
  padding: 10px 20px;
  padding-right: 0px;
  margin-right: 45px; /* 오른쪽에 아이콘 들어갈 공간 확보 */
  border: none;
  border-radius: 32px;
  background-color: #f2f2f2;
  font-size: 14px;
`;

const SearchIcon = styled.img`
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  pointer-events: none;
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

const MenuWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const LocationSetting = styled.div`
  display: flex;
  justify-content: center;
`;

const MenuIcon = styled.img`
  width: 26px;
  height: 26px;
  cursor: pointer;
`;

const LocationIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 3px;
`;

export default function Header({ isLoggedIn }) {
  const [showCategory, setShowCategory] = useState(false);

  return (
    <HeaderWrapper>
      <TopBar>
        {isLoggedIn ? (
          <Link to="/logout">로그아웃</Link>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
      </TopBar>

      <MiddleBar>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <LogoIcon src={box}></LogoIcon>
          <Logo>JIKPICK</Logo>
          <SearchBar>
            <SearchInput placeholder="상품명, 지점명으로 검색" />
            <SearchIcon src={search}></SearchIcon>
          </SearchBar>
        </div>
        <MiddleRight>
          <Link to="/sell">판매하기</Link>
          <Link to="/profile">프로필</Link>
          <Link to="/chat">직픽톡</Link>
        </MiddleRight>
      </MiddleBar>

      <BottomBar>
        <MenuWrapper
          onMouseEnter={() => setShowCategory(true)}
          onMouseLeave={() => setShowCategory(false)}
        >
        <MenuIcon src={menu} />
          {showCategory && <CategoryDropdown />}
        </MenuWrapper>

        <LocationSetting>
          <LocationIcon src={ping} />
          <Link to="/location">지역설정</Link>
        </LocationSetting>
        <Link to="/branches">직픽지점 조회</Link>
      </BottomBar>
    </HeaderWrapper>
  );
}