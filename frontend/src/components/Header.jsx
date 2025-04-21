import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 0 15px;
  font-size: 18px;
  color: #555;
  gap: 16px;
  border-bottom: 1px solid #e5e5e5;

  a {
    text-decoration: none;
    color: #555;
    font-weight: 600;
  }
`;

const MiddleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  flex-wrap: wrap;
  gap: 32px;
  margin-top: 15px;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  gap: 16px;
  overflow: hidden;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
  height: 60px;
`;

const LogoIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 3px;
  flex-shrink: 0;
`;

const Logo = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 40px;
  color: #FB4A67;
  padding-bottom: 3px;
  white-space: nowrap;
  flex-shrink: 0;
  margin-right: 24px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f1f1f1;
  /* border: 2px solid #cccccc; */
  border-radius: 32px;
  flex: 1;
  min-width: 120px;
  padding: 0 20px;
  height: 50px;
  transition: box-shadow 0.2s;

  &:focus-within {
    box-shadow: inset 0 0 0 2px #FB4A67; 
    border: none;
  }
`;


const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 16px;
  outline: none;
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const MiddleRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 20px;
  font-weight: 500;
  flex-shrink: 0;

  a {
    text-decoration: none;
    color: #333;
    font-weight: 600;

    &.active {
      color: #FB4A67;
      font-weight: bold;
    }
  }
`;

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  font-size: 20px;

  a {
    text-decoration: none;
    color: #333;
    font-weight: 600;

    &.active {
      color: #FB4A67;
      font-weight: bold;
    }
  }
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
  width: 25px;
  height: 25px;
  margin-right: 3px;
  position: relative;
  top: 0px;
`;

export default function Header({ isLoggedIn }) {
  const [showCategory, setShowCategory] = useState(false);

  return (
    <HeaderWrapper>
      <HeadContainer>
        <TopBar>
          {isLoggedIn ? (
            <NavLink to="/logout">로그아웃</NavLink>
          ) : (
            <>
              <NavLink to="/login">로그인</NavLink>
              <NavLink to="/signup">회원가입</NavLink>
            </>
          )}
        </TopBar>

        <MiddleBar>
          <LeftContainer>
            <LogoLink to="/">
              <LogoIcon src={box} />
              <Logo>JIKPICK</Logo>
            </LogoLink>
            <SearchBar>
              <SearchInput placeholder="상품명, 지점명으로 검색" />
              <SearchIcon src={search} />
            </SearchBar>
          </LeftContainer>

          <MiddleRight>
            <NavLink to="/upload">판매하기</NavLink>
            <NavLink to="/myPage">프로필</NavLink>
            <NavLink to="/chat">직픽톡</NavLink>
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
            <NavLink to="/location">지역설정</NavLink>
          </LocationSetting>
          <NavLink to="/branches">직픽지점 조회</NavLink>
        </BottomBar>
      </HeadContainer>
    </HeaderWrapper>
  );
}
