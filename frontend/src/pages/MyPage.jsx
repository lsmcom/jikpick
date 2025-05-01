import styled from 'styled-components'; 
import Footer from '../components/Footer'; // 공통 푸터
import { Navigate, NavLink, useNavigate } from 'react-router-dom'; 
import rightIcon from '../assets/icon/RightIcon.svg';
import exampleProfile from '../assets/images/ExampleProfile.svg';
import shoppingBag from '../assets/icon/ShoppingBag.svg';
import starIcon from '../assets/icon/StarIcon.svg';
import heartIcon from '../assets/icon/HeartIcon.svg';
import walletIcon from '../assets/icon/WalletIcon.svg'
import receiptIcon from '../assets/icon/ReceiptIcon.svg'

// 📦 전체 페이지 레이아웃 컨테이너
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column; // 위아래 방향 정렬
  align-items: center; // 중앙 정렬
`;

// 📦 내부 콘텐츠를 감싸는 외부 wrapper (좌우 여백 포함)
const Outer = styled.div`
  width: 100%;
`;


const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 0 80px; /* ⬅️ 아래쪽 패딩으로 푸터 여백 확보 */
  min-height: 70vh; /* ⬅️ 기본 높이 확보 (스크롤 유도용) */
`;
// 📌 페이지 최상단의 제목과 구분선을 감싸는 영역
const TitleBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e5e5; // 아래 구분선
`;

// 📝 페이지 제목 (ex. 상품등록)
const Title = styled.h2`
  font-size: 26px;
  font-weight: 600;
  margin: 0;
  padding-bottom: 34px; // 구분선과 간격
`;

// 🧱 내 상점 섹션 전체 링크 박스
const StoreBox = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 25px 0;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
`;

// 📸 상점 대표 이미지 박스
const StoreImageBox = styled.div`
  width: 110px;
  height: 110px;
  background-color: #f0f0f0;
  border-radius: 8px;
  flex-shrink: 0;
  overflow: hidden; // 이미지를 박스 안에 꽉 맞게
`;

// 실제 이미지 스타일
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

// 📦 이미지 옆 전체를 감싸는 박스
const StoreContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1; // StoreBox 내부에서 남은 공간 모두 사용
  margin-left: 26px;
`;

// 📝 상점 이름 + 판매 횟수 텍스트를 감싸는 박스
const StoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 26px;
  gap: 16px;
`;

// 🏷️ 상점 이름 텍스트
const StoreName = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 6px;
`;

// 아이콘 박스
const SaleIcon = styled.img`
  width: 18px;
  height: 18px;
`;

// 🔢 판매 횟수 텍스트 + 아이콘 박스
const SalesCount = styled.div`
  display: flex; // 아이콘 + 텍스트 나란히
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  gap: 6px; // 아이콘과 텍스트 사이 간격
`;

// 오른쪽: ⭐ + 점수 + (리뷰) 가 한 줄로 나란히
const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 24px;
  font-weight: 600;
  color: #666;
  margin-left: 10px;
  align-self: flex-start;
`;

// 별점
const StarScore = styled.span`
  color: #666;
  font-weight: 600;
  font-size: 24px;
`;

// ⭐ 아이콘
const StarIcon = styled.img`
  width: 16px;
  height: 16px;
`;

// 리뷰 개수
const ReviewCount = styled.span``;

// ➡️ 오른쪽 화살표 아이콘
const RightIcon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  margin-right: 20px;
`;

// 🔽 각 섹션 구분을 위한 밑줄 구분선
const SectionDivider = styled.div`
  border-bottom: 1px solid #e5e5e5;
  margin-top: 3px;
`;

// 📦 각 메뉴 항목 전체 박스
const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  text-decoration: none;
  color: #333;
  font-size: 20px;
  font-weight: 500;
  border-bottom: 1px solid #eee;

  &:hover {
    color: #FB4A67;
  }
`;

// 📎 왼쪽 아이콘 + 텍스트 박스
const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; // 아이콘과 텍스트 간격
`;

// 🖼️ 메뉴 아이콘 스타일
const MenuIcon = styled.img`
  width: 22px;
  height: 22px;
`;

export default function MyPage({ isLoggedIn, setIsLoggedIn }) {

  const navigate = useNavigate();

  // 로그아웃 처리 함수
  const handleLogout = (e) => {
    e.preventDefault(); // 링크의 기본 동작인 페이지 이동을 막음
    
    // localStorage 또는 sessionStorage에서 사용자 정보 삭제
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    
    // 로그인 상태 변경
    setIsLoggedIn(false);
    
    // 메인 화면으로 리다이렉트
    navigate('/');
  };

  return (
    <Wrapper>
      <Outer>
        <Inner>
          <TitleBox>
            <Title>나의 정보</Title>
          </TitleBox>

          <StoreBox to="/myShop">
            {/* 프로필 이미지 */}
            <StoreImageBox>
                <ProfileImage src={exampleProfile} alt="프로필 이미지" />
            </StoreImageBox>

            {/* 텍스트 전체 감싸는 부분 */}
            <StoreContent>
                {/* 왼쪽: 상점명 + 판매 횟수 */}
                <StoreInfo>
                <StoreName>오로라마켓</StoreName>
                <SalesCount>
                    <SaleIcon src={shoppingBag} alt="쇼핑백" />
                    상품판매 5회
                </SalesCount>
                </StoreInfo>

                {/* 오른쪽: 별점 + 리뷰 (한 줄) */}
                <RatingRow>
                    <StarScore>3.5</StarScore>
                    <StarIcon src={starIcon} alt="별" />
                    <ReviewCount>(4)</ReviewCount>
                </RatingRow>
            </StoreContent>

            {/* 오른쪽 화살표 */}
            <RightIcon src={rightIcon} alt="화살표" />
            </StoreBox>

            {/* 세션 구분 밑줄 */}
            <SectionDivider />

           
            <MenuItem to="/shopLike">
            <ItemLeft>
                <MenuIcon src={heartIcon} alt="관심목록" />
                관심목록
            </ItemLeft>
            <RightIcon src={rightIcon} alt="화살표" />
            </MenuItem>

            <MenuItem to="/shopOrder">
            <ItemLeft>
                <MenuIcon src={walletIcon} alt="구매내역" />
                구매내역
            </ItemLeft>
            <RightIcon src={rightIcon} alt="화살표" />
            </MenuItem>

            <MenuItem to="/shopSale">
            <ItemLeft>
                <MenuIcon src={receiptIcon} alt="판매내역" />
                판매내역
            </ItemLeft>
            <RightIcon src={rightIcon} alt="화살표" />
            </MenuItem>

            <MenuItem to="#" onClick={handleLogout}>로그아웃<RightIcon src={rightIcon} alt="화살표" /></MenuItem>
            <MenuItem to="/modifyInfo">회원정보 관리<RightIcon src={rightIcon} alt="화살표" /></MenuItem>
            <MenuItem to="/withdrawReason">회원탈퇴<RightIcon src={rightIcon} alt="화살표" /></MenuItem>
        </Inner>
      </Outer>
      <Footer />
    </Wrapper>
  );
}