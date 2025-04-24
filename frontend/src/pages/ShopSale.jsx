import { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import leftArrow from '../assets/icon/LeftArrow.svg'; // 뒤로가기 아이콘 임포트
import iphone from '../assets/images/iphone.png'; // 아이폰 이미지 임포트
import marketkurly from '../assets/images/marketkurly.png'; // 마켓컬리 이미지 임포트
import profile1 from '../assets/images/stan.png'; // 프로필 이미지 임포트
import heartIcon from '../assets/icon/HeartIcon.svg'; // 하트 아이콘 임포트
import menuIcon from '../assets/icon/menudrop.svg'; // 하트 아이콘 임포트
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import CancelModal from '../pages/Cancel';



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
  color: ${({ danger }) => (danger ? '#FB4A67' : '#333')};
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
  color: ${({ active }) => (active ? '#000' : '#888')};
  font-size: 24px;
  border: none;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  border-bottom: ${({ active }) => (active ? '2px solid #000' : '2px solid transparent')};
  margin-top: 20px;
  width: auto;
  min-width: 160px; // 버튼 크기를 최소화해서 길이를 통일
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

const FilterLine = styled.div`
  border-bottom: 1px solid #e5e5e5;
  margin-top: 0;
  width: 100%;
   margin-bottom: ${({ smallList }) => (smallList ? '400px' : '20px')};
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
    font-size: 20px;
    color: #333;
    margin: 0;
  }
`;



// const dummyData = [
//   {
//     id: 1,
//     name: '스타벅스 퀜처 텀블러',
//     region: '인천광역시 연수구',
//     seller: '오로라마켓',
//     price: '63,000원',
//     status: '거래완료',
//     likes: 60,
//     image: iphone,
//   },
//   {
//     id: 2,
//     name: '마켓컬리 카카오 선물하기',
//     region: '서울특별시 종로구',
//     seller: '마켓왕',
//     price: '45,000원',
//     status: '',
//     likes: 25,
//     image: marketkurly,
//   },
//   {
//     id: 3,
//     name: '아이폰16 프로',
//     region: '경기도 성남시 분당구',
//     seller: 'IT홀릭',
//     price: '1,650,000원',
//     status: '',
//     likes: 21,
//     image: profile1,
//   },
//   {
//     id: 4,
//     name: '미니골드 귀걸이',
//     region: '서울특별시 서대문구',
//     seller: '스포샵',
//     price: '95,000원',
//     status: '거래완료',
//     likes: 30,
//     image: iphone,
//   },
//   {
//     id: 5,
//     name: '이솝 룸스프레이',
//     region: '경기도 고양시 일산동구',
//     seller: '향기로운생활',
//     price: '85,000원',
//     status: '거래완료',
//     likes: 10,
//     image: marketkurly,
//   },
//   {
//     id: 6,
//     name: '고야드 쇼퍼백',
//     region: '부산광역시 해운대구',
//     seller: '게임마켓',
//     price: '75,000원',
//     status: '',
//     likes: 8,
//     image: profile1,
//   },
// ];
const dummyData = [
    { id:1, name:'스타벅스 퀜처 텀블러', region:'연수구', seller:'오로라마켓', price:'63,000원', status:'거래완료', likes:60, image:iphone },
    { id:2, name:'카카오 선물하기',     region:'종로구', seller:'마켓왕',     price:'45,000원', status:'',         likes:25, image:marketkurly },
    { id:3, name:'아이폰16 프로',       region:'분당구', seller:'IT홀릭',     price:'1,650,000원',status:'',    likes:21, image:profile1 },
    // … 나머지 데이터
  ];
  
  export default function ShopLike() {
    const [selectedFilter, setSelectedFilter] = useState('판매중');
    const [openMenuFor, setOpenMenuFor] = useState(null);
    const navigate = useNavigate();
    const [items, setItems] = useState(dummyData);
  
    const hideItem = (id) => {
        setItems(items.map(i =>
          i.id === id
            ? { ...i, status: i.status === '숨김' ? '' : '숨김' }
            : i
        ));
        setOpenMenuFor(null);
      };
    const deleteItem = (id) => console.log('삭제:', id);
    const reportItem = (id) => console.log('신고:', id);
    const menuRef = useRef(null);
    
      useEffect(() => {
        const handleClickOutside = (e) => {
          if (menuRef.current && !menuRef.current.contains(e.target)) {
            setOpenMenuFor(null);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);
    
    const [showCancelModal, setShowCancelModal] = useState(false);

    return (
      <Wrapper>
        <Header />
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
              <FilterButton active={selectedFilter==='판매중'}   onClick={()=>setSelectedFilter('판매중')}>판매중</FilterButton>
              <FilterButton active={selectedFilter==='거래완료'} onClick={()=>setSelectedFilter('거래완료')}>거래완료</FilterButton>
              <FilterButton active={selectedFilter==='숨김'}     onClick={()=>setSelectedFilter('숨김')}>숨김</FilterButton>
            </FilterButtonContainer>
  
            <FilterLine isHidden={selectedFilter==='숨김'} />
  
            <ItemList>
              {dummyData
                .filter(item => selectedFilter==='판매중' ? !item.status : item.status===selectedFilter)
                .map(item => (
                <ItemCard key={item.id}>
                  <ItemImage src={item.image} alt={item.name} />
                  <ItemInfo>
                    <InfoTop>
                      <ItemName>{item.name}</ItemName>
                      <Region>{item.region}</Region>
                      <Seller>{item.seller}</Seller>
                      <Price>{item.price}</Price>
                    </InfoTop>
                    {item.status && <StatusTag>{item.status}</StatusTag>}
                  </ItemInfo>
  
                  <LikeSection>
                    <div className="like-row">
                      <img src={heartIcon} alt="하트" />
                      <span>{item.likes}</span>
                    </div>

                    <MenuButton
                      src={menuIcon}
                      alt="메뉴"
                      onClick={() => setOpenMenuFor(openMenuFor === item.id ? null : item.id)}
                    />

                    {openMenuFor === item.id && (
                      <DropdownWrapper ref={menuRef}>
                        {selectedFilter === '숨김' ? (
                          <>
                            <DropdownItem>
                              <div className="menu-text">숨김 해제</div>
                            </DropdownItem>
                            <DropdownItem danger>
                              <div className="menu-text">삭제</div>
                            </DropdownItem>
                          </>
                        ) : (
                          <>
                            <DropdownItem>
                              <div className="menu-text">{item.status === '숨김' ? '숨김 해제' : '숨김'}</div>
                            </DropdownItem>
                            <DropdownItem danger>
                              <div className="menu-text">삭제</div>
                            </DropdownItem>
                            <DropdownItem>
                              <div className="menu-text">신고</div>
                            </DropdownItem>
                            {item.status === '거래완료' && (
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