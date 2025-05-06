import styled from 'styled-components';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import box from '../assets/icon/Logo.svg';
import search from '../assets/icon/SearchIcon.svg';
import ping from '../assets/icon/LocationPing.svg';
import menu from '../assets/icon/Menu.svg';
import closeXIcon from '../assets/icon/CloseXIcon.svg';
import settingIcon from '../assets/icon/SettiingIcon.png';
import menuDrop from '../assets/icon/menudrop.svg';
import iPhone from '../assets/images/iphone.png';
import ReviewModal from '../components/ReviewModal';
import CategoryDropdown from './CategoryDropdown';
import axios from '../api/axios'; 



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
  padding: 8px 0 8px;
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
  margin-top: 10px;
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
  font-size: 18px;
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
    color: #000000;
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
    color: #000000;
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
  margin-left: 0px;
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
  font-size: 16px;
  color: #0095f6;
  font-weight: 600;
  margin-bottom: -6px;
`;


// 알림 모달 내의 스타일들
const AlertModalWrapper = styled.div`
  position: absolute;
  top: 35px;
  right: 0;
  width: 380px;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  z-index: 100;
  padding: 16px;
  max-height: 500px;                    
  overflow-y: auto;
`;

const AlertModalBox = styled.div`
  font-size: 15px;
  color: #333;
  line-height: 1.4;
`;

const AlertGroupTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const AlertItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  background-color: #f9f9f9;
  margin-bottom: 16px;

  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
    border: 1px solid #FB4A67;
  }

`;

const AlertText = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #555;
  cursor: pointer;
  position: relative;
`;

const AlertIcon = styled.img`
  width: 22px;
  height: 22px;
  margin-top: 4px;
  flex-shrink: 0;
`;

const AlertContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const AlertHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AlertNickname = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
`;

const AlertDate = styled.span`
  font-size: 14px;
  margin-bottom: 5px;
  color: #aaa;
`;

const AlertMessage = styled.div`
  margin-top: 8px;
  font-size: 16px;
  color: #444;
  line-height: 1.4;
`;

const AlertTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding-top: 5px;
`

// 톱니바퀴 아이콘 추가
const SettingsIcon = styled.img`
  width: 26px;
  height: 26px;
  cursor: pointer;
  padding-top: 5px;
`;

const SettingsMenu = styled.div`
  position: absolute;
  top: 36px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  width: 100px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 6px 0;
`;

const SettingsItem = styled.div`
  padding: 8px 0;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  color: ${({ color }) => color || '#333'};

  &:hover {
    background-color: #f5f5f5;
  }
`;

const HideModalContent = styled.div`
  width: 380px;
  background: white;
  border-radius: 10px;
  padding: 0 24px 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
`;

const HideModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HideModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #333;
`;

const HideModalDivider = styled.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.06);
  margin: 4px 0;
`;

const HideModalBody = styled.div`
  font-size: 18px;
  color: #666;
  padding-top: 8px;
  text-align: center;
`;

const AlertModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  color: #333;
`;

const FullWidthDivider = styled.div`
  margin: 0 -14px 12px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.06);
`;

const AlertMenuWrapper = styled.div`
  position: relative;
  margin-left: auto;
  padding: 4px; /* 클릭 범위 확장 */
  cursor: pointer;
`;

const MenuDropDownButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const MenuDropDownIcon = styled.img`
  width: 18px;
  height: 18px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 22px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  width: 60px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 6px 0;
`;

const DropdownItem = styled.div`
  padding: 8px 0;
  font-size: 16px;
  cursor: pointer;
  color: ${({ color }) => color || '#333'};

  &:hover {
    background-color: #f5f5f5;
  }
`;

const StatusModalContent = styled.div`
  width: 500px;
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
`;

const StatusSteps = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  gap:8px;
`;

const Step = styled(({ active, ...props }) => <div {...props} />)`
  flex: 1;
  text-align: center;
  padding: 9px;
  border-radius: 8px;
  font-weight: 600;
  color: ${({ active }) => (active ? 'white' : '#ccc')};
  background-color: ${({ active }) => (active ? '#FB4A67' : '#eee')};
  font-size: 18px;
`;

const StatusLabel = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #FB4A67;
  margin-bottom: 20px;
`;

const ProductInfoBox = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
`;

const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductTextArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ProductName = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const ProductPrice = styled.div`
  margin-top: 6px;
  font-size: 18px;
  font-weight: 700;
  color: #777;
`;

const RequestBox = styled.div`
  border-top: 1px solid #eee;
  padding-top: 16px;
`;

const RequestRow = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const RequestLabel = styled.div`
  width: 120px;
  font-size: 18px;
  color: #666;
  font-weight: 600;
  margin-right: 5px;
`;

const RequestText = styled.div`
  font-size: 18px;
  color: #333;
  margin-right: 5px;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

// const CancelButton = styled.button`
//   padding: 8px 16px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   background: #fff;
//   cursor: pointer;
// `;

const ReviewButton = styled.button`
  padding: 8px 16px;
  background-color: #fff;
  border: 1px solid #717171;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
`;
const ModalListItem = styled.div`
padding: 12px 0;
font-size: 16px;
line-height: 135%;
border-bottom: 1px solid rgba(0, 0, 0, 0.06);
color: #333;
line-height: 1.6;
cursor: pointer;

&:hover {
  background-color: #f9f9f9;
}
`;
export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const [showCategory, setShowCategory] = useState(false);

  //알림 모달 상태 관리
  const alertRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false); // 기존 showStatusModal 사용
  const [selectedAlert, setSelectedAlert] = useState(null); // 클릭된 알림 정보 상태

  //지역설정 모달 상태 관리
  const [showModal, setShowModal] = useState(false);
  const mouseDownTarget = useRef(null);
  const modalRef = useRef(null);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showHideModal, setShowHideModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  
  // 검색 키워드 상태관리
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
    const startedOutside = modalRef.current && !modalRef.current.contains(mouseDownTarget.current);
    const endedOutside = modalRef.current && !modalRef.current.contains(e.target);
  
    if (startedOutside && endedOutside) {
      setShowModal(false);
    }
  
    mouseDownTarget.current = null;
  };
const [userNo, setUserNo] = useState(null); // 로그인된 사용자의 ID 상태
const [notifications, setNotifications] = useState([]);

useEffect(() => {
  if (!userNo) return; // userNo가 없으면 API 호출을 하지 않음

  // 사용자 알림 데이터 가져오기
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`/api/notifications/user/${userNo}`);
      setNotifications(response.data); // 받아온 알림 데이터로 상태 업데이트
    } catch (error) {
      console.error("알림을 가져오는 데 실패했습니다:", error);
    }
  };

  fetchNotifications(); // useEffect가 실행될 때 알림 데이터를 가져옵니다.
}, [userNo]); // userNo가 변경될 때마다 알림을 다시 불러옵니다.

  

  // 👇 useEffect 안에서 알림 모달 외부 클릭 감지
  useEffect(() => {
    const handleDocumentMouseDown = (e) => {
      mouseDownTarget.current = e.target;
    };

    const handleDocumentMouseUp = (e) => {
      const startedOutside =
        alertRef.current && !alertRef.current.contains(mouseDownTarget.current);
      const endedOutside =
        alertRef.current && !alertRef.current.contains(e.target);

      if (startedOutside && endedOutside) {
        setShowAlert(false); // 알림 모달 닫기
      }

      mouseDownTarget.current = null;
    };

    document.addEventListener('mousedown', handleDocumentMouseDown);
    document.addEventListener('mouseup', handleDocumentMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleDocumentMouseDown);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    };
  }, []);

  // ✅ 1. 지역 상태 추가
  const [location, setLocation] = useState({ latitude: null, longitude: null })
  const [selectedLocation, setSelectedLocation] = useState(localStorage.getItem('selectedLocation') || '지역설정');

  // ✅ 2. 리스트 클릭했을 때 지역 선택
  const handleLocationClick = (location) => {
    
    const splitLocation = location.split(', ');
    const shortLocation = splitLocation[splitLocation.length - 1]; 
  
    setSelectedLocation(shortLocation);
    localStorage.setItem('selectedLocation', shortLocation); 
    setShowModal(false);
  };
  useEffect(() => {
    if (!userNo) return;
  // 알림 데이터
  setNotifications([
    {
      notificationNo: 1,
      nickname: '오로라',
      message: '거래가 완료되었습니다.',
      date: '1시간 전',
      type: 'today',
    },
    {
      notificationNo: 2,
      nickname: '아기사자',
      message: '지점에 물건을 전달하였습니다.',
      date: '3시간 전',
      type: 'today',
    },
    // ...더 많은 알림
  ]);
}, []); // 초기 실행 시 알림 데이터를 세팅
  
  // 오늘 받은 알림과 이전 알림 나누기
  const todayAlerts = notifications.filter(alert => alert.type === 'today');
  const previousAlerts = notifications.filter(alert => alert.type === 'previous');

  // ✅ 필터링
  const filteredLocations = recommendedLocations.filter((loc) =>
    loc.includes(searchQuery)
  );
    // 알림 클릭 시 모달 열기
    const handleAlertClick = (alert) => {
      setSelectedAlert(alert); // 클릭한 알림 정보 저장
      setShowStatusModal(true); // 모달 열기
    };
  
    const handleCloseModal = () => {
      setShowStatusModal(false); // 모달 닫기
      setSelectedAlert(null); // 알림 정보 초기화
    };
  

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.alert-menu')) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleReviewSubmit = (review) => {
    console.log('제출된 리뷰:', review);
    setModalOpen(false);
  };

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

  // 위치 정보를 받아오고 상태를 업데이트하는 함수
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude }); // latitude, longitude를 상태로 저장
      }, (error) => {
        alert('위치를 가져오는데 실패했습니다.');
        console.error('위치 정보 오류:', error);
      });
    } else {
      alert('브라우저가 위치 정보를 지원하지 않습니다.');
    }
  };

  // location 상태가 업데이트되면 실행되는 useEffect
  useEffect(() => {
    // location.latitude와 location.longitude가 null이 아니면
    if (location.latitude !== null && location.longitude !== null) {
      const saveLocation = async () => {
        try {
          const memberId = JSON.parse(localStorage.getItem('user')).id; // localStorage에서 memberId 불러오기
  
          // 1. 백엔드에 위치 정보 저장
          await axios.post('/api/location/save', null, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            params: {
              memberId,
              latitude: location.latitude,
              longitude: location.longitude,
            },
          });
  
          // 2. 백엔드에서 위도, 경도 -> 주소 변환 요청
          const response = await axios.get('/api/location/getaddress', {
            params: { 
              latitude: location.latitude,
              longitude: location.longitude
            },
          });
  
          const address = response.data.split(' ');
          const dong = address.slice(2, 3)[0]; // 주소에서 동만 추출
          
          setSelectedLocation(dong); // 주소 정보만 설정
          localStorage.setItem('selectedLocation', dong);
  
          alert('현재 위치가 저장되었습니다!');
        } catch (error) {
          console.error('위치 저장 실패:', error);
        }
      };
  
      saveLocation(); // 위치 저장 처리 실행
    }
  }, [location]);


  return (
    <HeaderWrapper>
    <HeadContainer>
    <><TopBar>
      {isLoggedIn ? (
        <>
          <NavLink to="#" onClick={handleLogout}>로그아웃</NavLink>
          <div style={{ position: 'relative' }} ref={alertRef}>
            <AlertText onClick={() => setShowAlert(!showAlert)}>알림</AlertText>
            {showAlert && (
              <AlertModalWrapper>
                <AlertModalBox>
                  <AlertModalHeader>
                    <AlertTitle>알림</AlertTitle>
                    <div style={{ position: 'relative' }}>
                      <SettingsIcon
                        src={settingIcon}
                        alt="알림 설정"
                        onClick={() => setShowSettingsMenu((prev) => !prev)} />
                      {showSettingsMenu && (
                        <SettingsMenu>
                          <SettingsItem onClick={() => setShowHideModal(true)}>숨김관리</SettingsItem>
                          <SettingsItem color="#FB4A67">전체삭제</SettingsItem>
                        </SettingsMenu>
                      )}
                    </div>

                    {showHideModal && (
                      <ModalBackground onClick={() => setShowHideModal(false)}>
                        <HideModalContent onClick={(e) => e.stopPropagation()}>
                          <HideModalHeader>
                            <HideModalTitle>숨김관리</HideModalTitle>
                            <CloseButton onClick={() => setShowHideModal(false)}>
                              <img src={closeXIcon} alt="닫기" />
                            </CloseButton>
                          </HideModalHeader>
                          <HideModalDivider />
                          <HideModalBody>숨김 처리된 알림이 없습니다.</HideModalBody>
                        </HideModalContent>
                      </ModalBackground>
                    )}
                  </AlertModalHeader>
                  <FullWidthDivider />

                  <AlertGroupTitle>오늘 받은 알림</AlertGroupTitle>
                  {notifications.filter(alert => alert.type === 'today').map((alert) => (
                    <AlertItem key={alert.notificationNo} onClick={() => handleAlertClick(alert)}>
                      <AlertIcon src={alert.icon} alt="알림 아이콘" />
                      <AlertContent>
                        <AlertHeader>
                          <AlertNickname>{alert.nickname}</AlertNickname>
                          <AlertDate>{alert.date}</AlertDate>
                        </AlertHeader>
                        <AlertMessage>{alert.message}</AlertMessage>
                      </AlertContent>
                    </AlertItem>
                  ))}

                  <AlertGroupTitle>이전 알림</AlertGroupTitle>
                  {notifications.filter(alert => alert.type === 'previous').map((alert) => (
                    <AlertItem key={alert.notificationNo} onClick={() => handleAlertClick(alert)}>
                      <AlertIcon src={alert.icon} alt="알림 아이콘" />
                      <AlertContent>
                        <AlertHeader>
                          <AlertNickname>{alert.nickname}</AlertNickname>
                          <AlertDate>{alert.date}</AlertDate>
                        </AlertHeader>
                        <AlertMessage>{alert.message}</AlertMessage>
                      </AlertContent>
                    </AlertItem>
                  ))}
                </AlertModalBox>
              </AlertModalWrapper>
            )}
          </div>

          {/* 상태 모달 */}
          {showStatusModal && (
            <ModalBackground onClick={() => setShowStatusModal(false)}>
              <StatusModalContent onClick={(e) => e.stopPropagation()}>
                <StatusSteps>
                  <Step active>결제 완료</Step>
                  <Step active>거래중</Step>
                  <Step>지점 전달완료</Step>
                  <Step>거래 완료</Step>
                </StatusSteps>

                <StatusLabel>거래중</StatusLabel>

                <ProductInfoBox>
                  <ProductImage src={selectedAlert?.image || iPhone} alt="상품" />
                  <ProductTextArea>
                    <ProductName>{selectedAlert?.productName || "상품명"}</ProductName>
                    <ProductPrice>{selectedAlert?.price || "가격"}</ProductPrice>
                  </ProductTextArea>
                </ProductInfoBox>

                <RequestBox>
                  <RequestRow>
                    <RequestLabel>요청사항</RequestLabel>
                    <RequestText>{selectedAlert?.request || "요청사항 없음"}</RequestText>
                  </RequestRow>
                  <RequestRow>
                    <RequestLabel>직픽 지점 장소</RequestLabel>
                    <RequestText>{selectedAlert?.branch || "지점 미지정"}</RequestText>
                  </RequestRow>
                </RequestBox>

                <ButtonArea>
                  <ReviewButton onClick={() => setModalOpen(true)}>리뷰쓰기</ReviewButton>
                </ButtonArea>
              </StatusModalContent>
            </ModalBackground>
          )}
        </>
      ) : (
        <>
          <NavLink to="/login">로그인</NavLink>
          <NavLink to="/signup">회원가입</NavLink>
        </>
      )}
    </TopBar><MiddleBar>
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
      </MiddleBar><BottomBar>
        <MenuWrapper
          onMouseEnter={() => setShowCategory(true)}
          onMouseLeave={() => setShowCategory(false)}
        >
          <MenuIcon src={menu} />
          {showCategory && <CategoryDropdown />}
        </MenuWrapper>

          <LocationSetting onClick={() => setShowModal(true)}>
            <LocationIcon src={ping} />
            <span style={{ cursor: 'pointer', fontWeight: 600 , color: '333333'}}>
              {selectedLocation}
            </span>
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
                    } } />
                  <ModalSearchIcon
                    src={search}
                    alt="검색"
                    onClick={() => { } } />
                </ModalSearchArea>

                  <ModalLocationButton onClick={handleUseCurrentLocation}>
                    <img src={ping} alt="위치 아이콘" />
                    현재 내 위치 사용하기
                  </ModalLocationButton>

                {searchQuery === '' ? (
                  <ModalListContainer>
                    <ModalListTitle>추천</ModalListTitle>
                    {recommendedLocations.map((item, i) => (
                      <ModalListItem key={i} onClick={() => handleLocationClick(item)}>
                        {item}
                      </ModalListItem>
                    ))}
                  </ModalListContainer>
                ) : (
                  <ModalListContainer>
                    {filteredLocations.length > 0 ? (
                      filteredLocations.map((item, i) => (
                        <ModalListItem key={i} onClick={() => handleLocationClick(item)}>
                          {item}
                        </ModalListItem>
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

        <NavLink to="/findBranch">직픽지점 조회</NavLink>
      </BottomBar></>
      </HeadContainer>
    </HeaderWrapper>
  );
}
