import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import box from '../assets/icon/Logo.svg';
import search from '../assets/icon/SearchIcon.svg';
import ping from '../assets/icon/LocationPing.svg';
import menu from '../assets/icon/Menu.svg';
import CategoryDropdown from './CategoryDropdown';
import { useState, useRef } from 'react';
import closeXIcon from '../assets/icon/CloseXIcon.svg'

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
  cursor: pointer;

  &:hover {
    filter: brightness(0) saturate(100%) invert(33%) sepia(79%) saturate(2748%) hue-rotate(330deg) brightness(95%) contrast(101%);
  }
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

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  width: 560px;
  height: 452px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ModalInner = styled.div`
  flex: 1;
  padding: 0 18px;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -16px;
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-left: -4px;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  margin-right: -4px;
  display: flex;
  align-items: center;

  img {
    width: 18px;
    height: 18px;
  }

  &:hover img {
    filter: brightness(0) saturate(100%) invert(33%) sepia(79%) saturate(2748%) hue-rotate(330deg) brightness(95%) contrast(101%);
  }
`;

const ModalDivider = styled.div`
  height: 1px;
  width: calc(100% + 48px);
  background-color: rgba(0, 0, 0, 0.06);
  margin: 12px -24px 16px; // padding 반영해서 마진 음수로 빼기
`;

const ModalSearchArea = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2px;
  padding: 0 2px;
  height: 40px;
  border: 1px solid #bbb;
  border-radius: 8px;

  &:focus-within {
    border: 1px solid #FB4A67;
  }
`;

const ModalSearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  padding: 0 10px;

  &::placeholder {
    color: #aaa;
  }
`;

const ModalSearchIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    filter: brightness(0) saturate(100%) invert(33%) sepia(79%) saturate(2748%) hue-rotate(330deg) brightness(95%) contrast(101%);
  }
`;

const ModalLocationButton = styled.button`
  width: calc(100% + 0px);
  height: 34px;
  background-color: #fff4f0;
  color: #FB4A67;
  font-weight: 600;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 18px 0 0 0;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
    margin-right: 6px;
  }

  &:hover {
    background-color: #ffe9e2;
  }
`;

const ModalListContainer = styled.div`
  margin-top: 24px;
  margin-right: -18px;
  max-height: 250px;
  flex: 1;
  overflow-y: auto;
`;

const ModalListTitle = styled.div`
  font-size: 14px;
  color: #0095f6;
  font-weight: 600;
  margin-bottom: -6px;
`;

const ModalListItem = styled.div`
  padding: 12px 0;
  font-size: 16px;
  line-height: 135%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);;
  color: #333;
  line-height: 1.6;
`;

export default function Header({ isLoggedIn }) {
  const [showCategory, setShowCategory] = useState(false);

  //지역설정 모달 상태 관리
  const [showModal, setShowModal] = useState(false);
  const mouseDownTarget = useRef(null);
  const modalRef = useRef(null);
  
  // 1. 검색 키워드 상태관리
  const [searchQuery, setSearchQuery] = useState('');
  const recommendedLocations = [
    '인천광역시, 연수구, 송도동',
    '서울특별시, 강남구, 역삼동',
    '경상남도, 양산시, 물금읍',
    '경기도, 화성시, 봉담읍',
    '충청남도, 아산시, 배방읍',
    '서울특별시, 서초구, 서초동',
    '경기도, 양주시, 옥정동',
    '서울특별시, 관악구, 신림동',
    '충청남도, 천안시 서북구, 불당동',
    '경기도, 화성시, 향남읍',
    '서울특별시, 강남구, 청담동',
    '경기도, 남양주시, 다산동',
    '경기도, 남양주시, 별내동',
  ];

  // 마우스 누를 때 위치 저장
  const handleMouseDown = (e) => {
    mouseDownTarget.current = e.target;
  };

  // 마우스 뗄 때 위치 확인 후 바깥에서 시작된 경우만 닫기
  const handleMouseUp = (e) => {
    if (mouseDownTarget.current && !modalRef.current.contains(mouseDownTarget.current)) {
      setShowModal(false); // 모달 외부 클릭 시에만 닫음
    }
    mouseDownTarget.current = null;
  };

  // ✅ 필터링
  const filteredLocations = recommendedLocations.filter((loc) =>
    loc.includes(searchQuery)
  );

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

          <LocationSetting onClick={() => setShowModal(true)}>
            <LocationIcon src={ping} />
            <span style={{ cursor: 'pointer', fontWeight: 600 , color: '333333'}}>지역설정</span>
          </LocationSetting>
          
          {showModal && (
            <ModalBackground
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            >
              <ModalContent ref={modalRef}>
                <ModalInner>
                  <ModalHeader>
                    <ModalTitle>지역 변경</ModalTitle>
                    <CloseButton onClick={() => setShowModal(false)}>
                      <img src={closeXIcon} alt="닫기" />
                    </CloseButton>
                  </ModalHeader>

                  <ModalDivider />

                  <ModalSearchArea>
                    <ModalSearchInput
                      placeholder="지역이나 동네로 검색하기"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          // 엔터 검색 처리 가능
                        }
                      }}
                    />
                    <ModalSearchIcon
                      src={search}
                      alt="검색"
                      onClick={() => {}}
                    />
                  </ModalSearchArea>

                  <ModalLocationButton>
                    <img src={ping} alt="위치 아이콘" />
                    현재 내 위치 사용하기
                  </ModalLocationButton>

                  {searchQuery === '' ? (
                    <ModalListContainer>
                      <ModalListTitle>추천</ModalListTitle>
                      {recommendedLocations.map((item, i) => (
                        <ModalListItem key={i}>{item}</ModalListItem>
                      ))}
                    </ModalListContainer>
                  ) : (
                    <ModalListContainer>
                      {filteredLocations.length > 0 ? (
                        filteredLocations.map((item, i) => (
                          <ModalListItem key={i}>{item}</ModalListItem>
                        ))
                      ) : (
                        <ModalListItem>검색 결과가 없습니다.</ModalListItem>
                      )}
                    </ModalListContainer>
                  )}
                </ModalInner>
              </ModalContent>
            </ModalBackground>
          )}

          <NavLink to="/branches">직픽지점 조회</NavLink>
        </BottomBar>
      </HeadContainer>
    </HeaderWrapper>
  );
}
