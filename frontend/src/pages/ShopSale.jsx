import { useState } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import leftArrow from '../assets/icon/LeftArrow.svg'; // 뒤로가기 아이콘 임포트
import heartIcon from '../assets/icon/HeartIcon.svg'; // 하트 아이콘 임포트
import menuIcon from '../assets/icon/menudrop.svg'; // 하트 아이콘 임포트
import { useEffect, useRef } from 'react';
import CancelModal from '../pages/Cancel';
import axios from '../api/axios';
import { useNavigate, useLocation } from 'react-router-dom';




// 📦 상품을 감싸는 wrapper
const ProductWrapper = styled.div`
  position: relative;
  width: 270px;
  height: 270px;
  background: #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px; /* 상품 간격 띄우기 */
`;
const MenuButton = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 8px;
  cursor: pointer;
`;

// ── 드롭다운 컨테이너
const DropdownWrapper = styled.div`
  position: absolute;
  top: 55px;  // 메뉴 아이콘 아래 점 기준
  right: -5px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 0;
  z-index: 20;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  font-size: 16px;
  color: ${({ $danger }) => ($danger ? '#FB4A67' : '#333')};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f5f5f5;
  }

  .menu-text {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
  }
`;



// 📦 판매완료 오버레이
const SoldOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* 흐리게 처리 */
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;

// 📦 상품 이미지 스타일
const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 📦 상품 정보
const ProductInfo = styled.div`
  padding: 10px;
`;

// 📦 상품 이름 스타일
const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

// 📦 상품 위치, 판매자명, 금액 스타일
const ProductDetails = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
`;

// 📦 하트 아이콘 및 하트 수
const HeartSection = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

// 📦 필터링 버튼 스타일 (텍스트 + 밑줄)
const FilterButton = styled.button`
  background: none;
  color: ${({ $active }) => ($active ? '#000' : '#888')};
  font-size: 24px;
  border: none;
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  border-bottom: ${({ $active }) => ($active ? '2px solid #000' : '2px solid transparent')};
  margin-top: 20px;
  width: auto;
  min-width: 160px;
  text-align: center;

  &:hover {
    color: #000;
    border-bottom: 2px solid #000;
  }
`;


// 📦 숨김 버튼 스타일
const HideButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #FB4A67;
  color: white;
  border: none;
  padding: 5px 12px;
  border-radius: 16px;
  cursor: pointer;

  &:hover {
    background-color: #e0405f;
  }
`;

// 📦 뒤로가기 아이콘 스타일
const LeftArrowIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  margin-left: -5px; 
  cursor: pointer;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 0;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 600;
  margin: 0;
  padding-left: 10px;
`;

const Outer = styled.div`
  width: 100%;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 0 80px; /* ⬅️ 아래쪽 패딩으로 푸터 여백 확보 */
  min-height: 70vh; /* ⬅️ 기본 높이 확보 (스크롤 유도용) */
`;

const ProductListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const FilterButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;  // 왼쪽, 중앙, 오른쪽 정렬
  width: 100%;
`;

// 스타일 정의부
const FilterLine = styled.div`
  border-bottom: 1px solid #e5e5e5;
  margin-top: 0;
  width: 100%;
  margin-bottom: ${({ $isHidden }) => ($isHidden ? '400px' : '20px')};

`;


const HiddenStateWrapper = styled.div`
  margin-bottom: 40px; /* 숨김 상태일 때 푸터와 상품 간 여백 추가 */
`;

const FooterWithMargin = styled(Footer)`
  margin-top: 40px; /* 푸터 위에 추가 여백 */
`;

// 📦 카드 그리드 스타일
const ItemList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemCard = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  padding: 28px 0;
  position: relative;
`;

const ItemImage = styled.img`
  width: 190px;
  height: 190px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 25px;
`;

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoTop = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-top: 5px;
  margin: 0;
`;

const Region = styled.span`
  font-size: 18px;
  color: #555;
  margin-top: 6px;
`;

const Seller = styled.span`
  font-size: 18px;
  color: #777;
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-top: 20px;
`;

const StatusTag = styled.div`
  display: inline-block;
  background-color: #fb4a67;
  color: white;
  font-size: 18px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 8px;
  margin-top: 8px;
  width: 80px;
  height: 20px;
  text-align: center;
`;
const LikeSection = styled.div`
  position: absolute;
  top: 24px;
  right: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  .like-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .like-row img {
    width: 20px;
    height: 20px;
  }

  .like-row span {
    font-size: 18px;
    color: #333;
    margin: 0;
  }
`;
  
  export default function ShopLike() {
    const [selectedFilter, setSelectedFilter] = useState(() => {
      return localStorage.getItem('selectedFilter') || '판매중';
    });
    const [openMenuFor, setOpenMenuFor] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [items, setItems] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);


    const toggleHideItem = async (saleNo) => {
      try {
        await axios.patch(`http://localhost:9090/api/sales/${saleNo}/toggle-hide`);
        // UI 갱신: 다시 불러오거나 상태만 변경
        setItems(prev =>
        prev.map(i =>
          i.saleNo === saleNo 
          ? { ...i, status: i.status === '숨김' ? null : '숨김' } 
          : i
        )
      );
      } catch (err) {
        console.error('숨김 실패:', err);
      }
    };
    
    const deleteItem = async (saleNo) => {
      if (!window.confirm('정말 삭제하시겠습니까?')) return;
      try {
        await axios.delete(`http://localhost:9090/api/sales/${saleNo}`);
        setItems(prev => prev.filter(i => i.saleNo !== saleNo));
        console.log("삭제완료")
      } catch (err) {
        console.error('삭제 실패:', err);
      }
    };
    
      
    const reportItem = (id) => console.log('신고:', id);
    const menuRef = useRef(null);


    //탭 클릭 시 로컬스토리지에도 저장
    const handleFilterClick = (filter) => {
      setSelectedFilter(filter);
      navigate(`?tab=${filter}`);
    };

    useEffect(() => {
      const tab = new URLSearchParams(location.search).get('tab');
      if (tab) setSelectedFilter(tab);
    }, [location.search]);

    
    
    
    

    // ❷ 유저 정보 기반 판매내역 불러오기
    useEffect(() => {
      const user = JSON.parse(sessionStorage.getItem('user'));
      console.log('user 정보:', user);

      console.log('user 정보:', user);
      if (user?.userNo) {
        axios.get(`http://localhost:9090/api/sales/by-user?userNo=${user.userNo}`)
          .then(res => setItems(res.data))
          .catch(err => console.error('판매내역 불러오기 실패:', err));
      } else {
        console.warn('❗ user 정보 없음 - API 호출 안함');
      }
    }, []);
    
    
    
      useEffect(() => {
        const handleClickOutside = (e) => {
          if (menuRef.current && !menuRef.current.contains(e.target)) {
            setOpenMenuFor(null);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);
    
    

    return (
      <Wrapper>
        {showCancelModal && (
      <CancelModal
        onCancel={() => setShowCancelModal(false)}
        onConfirm={() => {
          console.log('거래 취소 확정');
          setShowCancelModal(false);
        }}
      />
    )}
        <Outer>
          <Inner>
            <TitleBox>
              <LeftArrowIcon src={leftArrow} alt="뒤로" onClick={() => navigate(-1)} />
              <Title>나의 판매목록</Title>
            </TitleBox>
  
            <FilterButtonContainer>
            <FilterButton $active={selectedFilter==='판매중'}   onClick={() => handleFilterClick('판매중')}>판매중</FilterButton>
            <FilterButton $active={selectedFilter==='거래완료'} onClick={() => handleFilterClick('거래완료')}>거래완료</FilterButton>
            <FilterButton $active={selectedFilter==='숨김'}     onClick={() => handleFilterClick('숨김')}>숨김</FilterButton>
            </FilterButtonContainer>
  
            <FilterLine $isHidden={selectedFilter === '숨김' && items.filter(item => item.pickStatus === '숨김').length === 0} />
  
            <ItemList>
              {items
                .filter(item =>
                  selectedFilter === '판매중'
                    ? item.status === '판매중'
                    : selectedFilter === '거래완료'
                    ? item.status === '거래완료'
                    : item.status === '숨김'
                )
                
                
                .map(item => (
                <ItemCard key={item.saleNo}>
                  <ItemImage src={item.itemImage} alt={item.itemName} />
                  <ItemInfo>
                    <InfoTop>
                    <ItemName>{item.itemName}</ItemName>
                    <Region>{item.regionName}</Region>
                    <Seller>{item.nick}</Seller>
                    <Price>{item.itemCost.toLocaleString()}원</Price>
                    </InfoTop>
                    {item.pickStatus && <StatusTag>{item.pickStatus}</StatusTag>}

                  </ItemInfo>
  
                  <LikeSection>
          <div className="like-row">
            <img src={heartIcon} alt="하트" />
            <span>{item.itemWishCount}</span>
          </div>

          <MenuButton
            src={menuIcon}
            alt="메뉴"
            onClick={() => setOpenMenuFor(openMenuFor === item.saleNo ? null : item.saleNo)}
          />

          {openMenuFor === item.saleNo && (
            <DropdownWrapper ref={menuRef}>
              {selectedFilter === '숨김' ? (
                <>
                <DropdownItem onClick={() => toggleHideItem(item.saleNo)}>
                  <div className="menu-text">
                    {item.pickStatus === '숨김' ? '숨김 해제' : '숨김'}
                  </div>
                </DropdownItem>


                <DropdownItem $danger onClick={() => deleteItem(item.saleNo)}>
                  <div className="menu-text">삭제</div>
                </DropdownItem>

                </>
              ) : (
                <>
                  <DropdownItem onClick={() => toggleHideItem(item.saleNo)}>
                    <div className="menu-text">{item.pickStatus === '숨김' ? '숨김 해제' : '숨김'}</div>
                  </DropdownItem>
                  <DropdownItem $danger onClick={() => deleteItem(item.saleNo)}>
                    <div className="menu-text">삭제</div>
                  </DropdownItem>
                  <DropdownItem onClick={() => reportItem(item.saleNo)}>
                    <div className="menu-text">신고</div>
                  </DropdownItem>
                  {item.pickStatus === '거래완료' && (
                    <DropdownItem onClick={() => setShowCancelModal(true)}>
                      <div className="menu-text">거래취소</div>
                    </DropdownItem>
                  )}
                </>

              )}
            </DropdownWrapper>
          )}
        </LikeSection>
         </ItemCard>
              ))}
            </ItemList>
          </Inner>
        </Outer>
        <FooterWithMargin />
      </Wrapper>
    );
  }