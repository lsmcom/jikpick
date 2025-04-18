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
  width: 100%;
`;

const HeadContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 0px;
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
  padding: 12px 0px;
`;

const LogoIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 3px;
`;

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
  width: 680px;
  margin-top: 4px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 20px;
  padding: 10px 20px;
  padding-right: 0px;
  margin-right: 45px;
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
  height: 50px;
  font-size: 20px;
`;

const MenuWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const LocationSetting = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuIcon = styled.img`
  width: 26px;
  height: 26px;
  cursor: pointer;
  position: relative;
  top: 2px;
`;

const LocationIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 3px;
  position: relative;
  top: 0px;
`;

const TopLink = styled(Link)`
  font-weight: 600;
`;

const MiddleLink = styled(Link)`
  font-weight: 600;
`;

const BottomLink = styled(Link)`
  font-weight: 600;
`;

export default function Header({ isLoggedIn }) {
  const [showCategory, setShowCategory] = useState(false);

  return (
    <HeaderWrapper>
      <HeadContainer>
        <TopBar>
          {isLoggedIn ? (
            <TopLink to="/logout">로그아웃</TopLink>
          ) : (
            <>
              <TopLink to="/login">로그인</TopLink>
              <TopLink to="/signup">회원가입</TopLink>
            </>
          )}
        </TopBar>

        <MiddleBar>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LogoIcon src={box}></LogoIcon>
            <Logo>JIKPICK</Logo>
            <SearchBar>
              <SearchInput placeholder="상품명, 지점명으로 검색" />
              <SearchIcon src={search}></SearchIcon>
            </SearchBar>
          </div>
          <MiddleRight>
            <MiddleLink to="/sell">판매하기</MiddleLink>
            <MiddleLink to="/profile">프로필</MiddleLink>
            <MiddleLink to="/chat">직픽톡</MiddleLink>
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
            <BottomLink to="/location">지역설정</BottomLink>
          </LocationSetting>
          <BottomLink to="/branches">직픽지점 조회</BottomLink>
        </BottomBar>
      </HeadContainer>
    </HeaderWrapper>
  );
}
