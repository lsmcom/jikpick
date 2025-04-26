import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import cameraIcon from '../assets/icon/Camera.svg';
import { useNavigate } from 'react-router-dom'; // 🔥 이미 되어 있을 수도 있음

// dnd-kit import
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

// 📦 콘텐츠 최대 너비 제한 및 중앙 정렬을 위한 wrapper
const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto; // 수평 중앙 정렬
  padding: 18px 0; // 위아래 여백
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

// 🔽 각 섹션 구분을 위한 밑줄 구분선
const SectionDivider = styled.div`
  border-bottom: 1px solid #e5e5e5;
  margin-top: 34px;
`;

// 🖼️ 이미지 업로드 섹션 wrapper
const ImageSection = styled.div`
  display: flex;
  flex-wrap: wrap; // 여러 줄 정렬 가능
  gap: 16px;
  margin-top: 34px;
`;

// 📷 이미지 업로드 박스 스타일 (카메라 아이콘 + 텍스트)
const ImageUploadBox = styled.label`
  width: 180px;
  height: 180px;
  border: 1px dashed #ccc; // 점선 테두리
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #999;
  font-size: 16px;
  position: relative;
`;

// 🧾 실제 파일 input은 숨겨두고 label로 대체 (클릭 시 파일 선택 가능)
const HiddenInput = styled.input`
  display: none;
`;

// 📸 업로드 박스 내 카메라 아이콘 이미지
const CameraIcon = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 4px;
`;

// 🔢 업로드한 이미지 개수를 표시하는 텍스트 (박스 내부 오른쪽 아래)
const UploadCount = styled.span`
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 12px;
  color: #666;
`;

// 🖼️ 업로드된 이미지 프리뷰 전체를 감싸는 컨테이너 (삭제 버튼 hover용)
const PreviewContainer = styled.div`
  position: relative;
  &:hover button {
    opacity: 1; // 이미지에 마우스를 올렸을 때 삭제 버튼 보이게
  }
`;

// 🖼️ 업로드된 실제 이미지 스타일
const PreviewImage = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover; // 비율 유지하면서 채움
  border-radius: 8px;
  border: 1px solid #eee;
`;

// ❌ 이미지 삭제 버튼 (hover 시 나타남)
const DeleteButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(0, 0, 0, 0.6); // 반투명 배경
  color: white;
  border: none;
  border-radius: 50%; // 원형 버튼
  width: 24px;
  height: 24px;
  cursor: pointer;
  opacity: 0; // 기본 상태에서는 숨김
  transition: none;
  font-size: 16px;
  pointer-events: auto; // 다른 요소보다 우선 클릭
  z-index: 10; // 위에 떠 있게
`;

// Sortable Image 컴포넌트
function SortableImage({ id, src, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <PreviewContainer ref={setNodeRef} style={style} {...attributes}>
      <PreviewImage src={src} alt="preview" {...listeners}/>
      <DeleteButton
        onClick={(e) => {
          e.stopPropagation(); // 드래그 이벤트 버블링 차단
          onDelete(id);
        }}
      >
        ×
      </DeleteButton>
    </PreviewContainer>
  );
}

// 🧾 각 입력 항목 섹션을 감싸는 wrapper (ex. 상품명, 카테고리 등)
const FieldBox = styled.div`
  // 항목별 레이아웃 정리 용도
`;

// 🧷 제목과 (선택) 텍스트를 나란히 정렬하는 wrapper
const SectionTitleRow = styled.div`
  display: flex;
  align-items: baseline; // 글자 밑줄 맞춤
  gap: 8px; // 제목과 보조 텍스트 사이 간격
  margin-bottom: 10px;
`;

// 📝 각 항목의 제목 텍스트 (ex. 상품명, 카테고리 등)
const SectionTitle = styled.h3`
  font-size: 26px;
  font-weight: 600;
  margin: 40px 0 16px 0;
  text-align: left;
`;

// 🟤 (선택) 같이 제목 옆에 붙는 회색 안내 텍스트
const OptionalText = styled.span`
  font-size: 16px;
  color: #999;
`;

// ✏️ 입력창과 오른쪽에 들어가는 카운터(글자 수)를 감싸는 wrapper
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 700px;
`;

// 🖊️ 기본 입력창 (상품명, 태그 입력 등에서 사용됨)
const Input = styled.input`
  width: 670px;
  height: 50px;
  padding: 12px 16px;
  font-family: 'pretendard';
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #FB4A67; // 포커스 시 강조 색
  }
`;

// 🔢 글자 수 또는 태그 개수 등을 표시하는 작은 회색 텍스트
const CharCount = styled.span`
  font-size: 16px;
  color: #999;
  width: 50px;
  text-align: right;
  flex-shrink: 0;
`;

// 📂 3단 카테고리 구조를 표현한 계층형 데이터
const categories = [
  {
    name: '남성의류', // 대분류
    children: [
      {
        name: '상의', // 중분류
        children: ['후드티/후드집업', '맨투맨', '니트/스웨터', '셔츠', '반팔 티셔츠', '긴팔 티셔츠', '민소매 티셔츠'] // 소분류
      },
      {
        name: '아우터',
        children: ['자켓', '코트', '패딩']
      }
    ]
  },
  {
    name: '여성의류',
    children: [
      {
        name: '스커트',
        children: ['미니', '미디', '롱']
      },
      {
        name: '블라우스',
        children: ['셔츠형', '레이스형']
      }
    ]
  }
];

// 🧩 카테고리 드롭다운들이 나란히 들어가는 행(Row) 스타일
const DropdownRow = styled.div`
  display: flex;
  gap: 35px; // 드롭다운 간격 조절
`;

// 🔽 공통 드롭다운 Select 스타일 (1~3단 카테고리)
const Select = styled.select`
  appearance: none; // 브라우저 기본 스타일 제거
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 300px;
  height: 50px;
  padding: 12px 40px 12px 16px; // 오른쪽 공간은 아이콘 자리
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 15px;

  background-image: url('/assets/icon/DropDown.svg'); // 드롭다운 아이콘
  background-repeat: no-repeat;
  background-position: right 18px center;
  background-size: 18px;

  &:focus {
    outline: none;
    border-color: #FB4A67; // 포커스 시 강조
  }
`;

// 🏷️ 입력된 태그들을 보여주는 박스 전체
const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; // 태그 간의 간격
  align-items: center;
  width: 700px;
`;

// 🟣 개별 태그 박스 스타일
const Tag = styled.div`
  background-color: #FB4A67;
  color: white;
  padding: 6px 12px;
  border-radius: 20px; // 둥근 모양
  font-size: 16px;
  font-family: 'pretendard';
  display: flex;
  align-items: center;
  gap: 8px; // 텍스트와 X 버튼 사이 간격
`;

// ❌ 태그의 삭제 버튼 (X)
const RemoveButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
`;

// 🔤 태그 입력창과 태그 개수 카운트가 들어가는 wrapper
const TagInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 700px;
  margin-top: 12px;
`;

// 📝 태그 입력 input 필드
const TagInput = styled.input`
  width: 670px;
  font-family: 'pretendard';
  height: 50px;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #FB4A67;
  }
`;

// 🔢 태그 개수 카운터
const TagCount = styled.span`
  font-size: 16px;
  color: #999;
  width: 50px;
  text-align: right;
  flex-shrink: 0;
`;

// 📝 태그 입력 관련 안내 문구 박스
const GuideBox = styled.ul`
  margin-top: 14px;
  background: #f9f9f9;
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid #eee;
  width: 700px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  line-height: 1.6;
`;

// ✔️ 개별 안내 문구 (리스트 항목)
const GuideText = styled.li`
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0; // 마지막 항목은 여백 제거
  }
`;

// 🧾 상품 상태 전체 선택지를 감싸는 컨테이너
const ConditionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px; // 옵션 간 간격
`;

// 🧾 상품 상태 옵션 전체 컨테이너 (라디오 버튼 역할을 하는 카드)
const ConditionOption = styled.label`
  border: 1px solid ${({ checked }) => (checked ? '#FB4A67' : '#ddd')}; // 선택되었을 때 테두리 강조
  background-color: ${({ checked }) => (checked ? '#FFF0F3' : 'white')}; // 선택 시 배경색 변경
  padding: 14px 18px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 15px;
  display: flex;
  flex-direction: column;

  input {
    display: none; // 내부 input 요소 숨김 (커스텀 UI로 대체)
  }
`;

// 🏷️ 상품 상태의 제목 (예: "사용감 적음")
const ConditionTitle = styled.span`
  font-weight: 600;
  font-family: 'pretendard';
  margin-bottom: 4px;
  color: ${({ checked }) => (checked ? '#FB4A67' : '#333')}; // 선택 시 핑크색 강조
`;

// 💬 상품 상태의 설명 텍스트 (예: "눈에 띄는 흔적이나 얼룩이 약간 있음")
const ConditionDesc = styled.span`
 font-family: 'pretendard';
  font-size: 16px;
  color: #777;
  line-height: 1.4;
`;

// 🖊️ 상품 설명 입력 영역을 감싸는 래퍼 (카운터 위치용)
const TextAreaWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1020px;
`;

// 📝 상품 설명 입력 필드
const TextArea = styled.textarea`
 font-family: 'pretendard';
  width: 100%;
  height: 200px;
  padding: 16px;
  padding-bottom: 36px; // 글자 수 카운터 공간 확보
  font-size: 15px;
  border: 1px solid #ddd;
  border-radius: 15px;
  resize: none;
  box-sizing: border-box;
  line-height: 1.6;
  text-align: left;

  &::placeholder {
    color: #aaa;
    font-size: 14px;
    white-space: pre-line; // 줄바꿈 있는 플레이스홀더
  }

  &:focus {
    outline: none;
    border-color: #FB4A67; // 포커스 시 강조색
  }
`;

// 🔢 상품 설명 글자 수 카운트 (오른쪽 하단에 고정)
const TextCount = styled.span`
  position: absolute;
  bottom: 10px;
  right: 16px;
  font-size: 16px;
  color: #999;
`;

// 💰 가격 입력창 전체 감싸는 래퍼 (placeholder, 원 텍스트 포함)
const PriceInputWrapper = styled.div`
  position: relative;
  font-family: 'pretendard';
  width: 300px;
  height: 50px;
  margin-bottom: 12px;
`;

// 💸 실제 가격 입력 input
const PriceInput = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== 'isFocused',
})`
  width: 100%;
  height: 100%;
  padding: 12px 36px 12px 16px; // 오른쪽 padding은 "원" 텍스트 공간 확보
  font-size: 16px;
  font-family: 'pretendard';
  border: 1px solid #ddd;
  border-radius: 20px;
  box-sizing: border-box;
  text-align: ${({ isFocused }) => (isFocused ? 'right' : 'left')}; // 포커스 상태일 때 오른쪽 정렬

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #FB4A67;
  }
`;

// 🅿️ placeholder 텍스트를 커스텀으로 표시할 때 사용
const PlaceholderText = styled.span`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
  color: #aaa;
  pointer-events: none;
  user-select: none;
`;

// 💰 가격 입력란 안쪽의 '원' 텍스트 스타일
const Won = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
  color: #666;
`;

// 🔘 라디오 버튼을 실제로는 숨기고, 커스텀 UI로 대체하기 위해 사용됨
const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  display: none;
`;

// ✅ 둥근 체크박스 스타일 (가격제안 / 직픽거래 '가능/불가'용)
const RoundCheckbox = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: ${({ checked }) => (checked ? '#FB4A67' : '#fff')};
  border: 1.5px solid #ccc;
  margin-right: 8px;
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
  text-align: center;
  flex-shrink: 0;

  &::before {
    content: "✔"; // 체크 상태일 때만 보이게 설정
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
    color: white;
    display: block;
    width: 1em;
    text-align: center;
  }
`;

// ☑️ 체크/라디오 항목들이 가로로 나란히 배치되는 영역
const OneLineOptions = styled.div`
  display: flex;
  gap: 24px;
`;

// 🔘 각 체크/라디오 버튼 + 라벨을 감싸는 요소 (한 줄 구성)
const OneLineOption = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  width: fit-content; // 텍스트 길이만큼만 너비를 가짐
`;

// ✅ 실제 체크박스를 숨기고 커스텀 RoundCheckbox와 함께 사용
const HiddenCheckbox = styled.input`
  display: none;
`;

// 📦 '직픽거래'에서 가능일 때 보이는 전체 영역 박스
const TradeAreaBox = styled.div`
  border: 1px solid #999;
  border-radius: 16px;
  padding: 28px;
  margin-top: 18px;
`;

// 🏷️ '거래 유효시간' 같은 항목명 텍스트
const LabelText = styled.span`
  font-size: 18px;
  font-weight: 600;
  min-width: 120px;
`;

// 🧭 희망지점 선택 항목 전체 줄을 감싸는 박스
const BranchRow = styled.div`
  display: flex;
  align-items: center; // 수직 중앙 정렬
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 22px;
`;

// 🏷️ 희망지점 선택 제목 텍스트 (예: '희망지점 선택')
const BranchLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
`;

// 💬 희망지점 선택 서브 설명 텍스트 (예: (최대 3개))
const BranchSubText = styled.span`
  font-size: 14px;
  color: #999;
  margin-left: 6px;
`;

// 📍 지점 선택 버튼들이 나열되는 영역 (버튼 그룹)
const BranchButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

// 📌 각 지점을 나타내는 버튼 스타일 (선택 여부에 따라 스타일 변경됨)
const BranchButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active', // ✅ active를 DOM에 넘기지 않음
})`
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 20px;
  border: 1px solid ${({ active }) => (active ? '#FB4A67' : '#ccc')};
  background-color: ${({ active }) => (active ? '#FB4A67' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  cursor: pointer;

  &:hover {
    border-color: #FB4A67;
    color: ${({ active }) => (active ? '#fff' : '#FB4A67')};
    background-color: ${({ active }) => (active ? '#FB4A67' : '#fff')};
  }
`;

// 🔹 지역 선택 드롭다운 (예: 강남, 홍대, 잠실)
const RegionSelect = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 200px;
  height: 42px;
  padding: 12px 40px 12px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;

  background-image: url('/assets/icon/DropDown.svg');
  background-repeat: no-repeat;
  background-position: right 18px center;
  background-size: 18px;

  &:focus {
    outline: none;
    border-color: #FB4A67;
  }
`;

// 🔹 선택된 지점 개수 표시 텍스트 (ex. 선택된 지점: 2 / 3)
const BranchCountText = styled.div`
  font-size: 14px;
  color: #999;
  white-space: nowrap;
  margin-left: auto;
`;

// 🔹 거래 유효시간 영역의 한 줄 레이아웃 박스
const TradeRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 22px;
  justify-content: flex-start;
  gap: 58px;
`;

// 🔹 거래 유효시간 드롭다운 (예: 3일, 5일 등)
const TradeDurationSelect = styled.select`
  width: 300px; 
  height: 44px;
  padding: 0 14px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: url('/assets/icon/DropDown.svg') no-repeat right 14px center;
  background-size: 16px;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:focus {
    outline: none;
    border-color: #FB4A67;
  }
`;

// 🔹 거래 안내사항 리스트 (직픽 관련 안내)
const TradeInfo = styled.ul`
  margin-top: 20px;
  padding-left: 20px;
  font-size: 14px;
  color: #777;

  li {
    margin-bottom: 4px;
    list-style-type: disc;
  }
`;

// 🔹 하단 버튼 그룹 컨테이너 (임시저장 & 등록하기)
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 80px;
`;

// 🔹 임시저장 버튼
const SaveButton = styled.button`
  width: 300px;
  height: 50px;
  border: none;
  background-color: #f1f1f1;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #e4e4e4;
  }
`;

// 🔹 등록하기 버튼 (메인 액션 버튼, 빨간색 강조)
const SubmitButton = styled.button`
  width: 300px;
  height: 50px;
  border: none;
  background-color: #FB4A67; // 브랜드 핑크색
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #e63c5b; // 호버 시 조금 더 진한 핑크
  }
`;

export default function ProductRegistration() {

  // 이미지 업로드 관련 상태
  const [images, setImages] = useState([]); // 업로드된 이미지 파일 목록 (미리보기 포함)
  const [uploadKey, setUploadKey] = useState(Date.now()); // 파일 input 리렌더링용 키 (같은 파일 재선택 허용)
  const inputRef = useRef(); // 파일 input 엘리먼트를 직접 제어할 때 사용 (예: ref.current.click())

  // 상품명
  const [productName, setProductName] = useState(''); // 상품명 입력값 저장

  // 카테고리 드롭다운 (3단)
  const [mainCategory, setMainCategory] = useState(''); // 대분류
  const [subCategory, setSubCategory] = useState(''); // 중분류
  const [thirdCategory, setThirdCategory] = useState(''); // 소분류

  // 태그 입력 관련
  const [tags, setTags] = useState([]); // 추가된 태그 목록
  const [tagInput, setTagInput] = useState(''); // 입력 중인 태그 값
  const maxTags = 5; // 태그 최대 개수 제한

  // 상품 상태
  const [condition, setCondition] = useState(''); // 상품 상태 선택값 (새 상품, 사용감 없음 등)

  // 상품 설명
  const [description, setDescription] = useState(''); // 상품 설명 textarea 값

  // 가격 관련
  const [price, setPrice] = useState(''); // 가격 입력값 (쉼표 포함 문자열)
  const [isFocused, setIsFocused] = useState(false); // 가격 입력창 포커스 상태 (placeholder, 정렬 등 조건용)

  // 가격 제안 여부
  const [priceOfferEnabled, setPriceOfferEnabled] = useState(false); // 가격 제안 받기 체크 여부

  // 직픽 거래 가능 여부
  const [locationAvailable, setLocationAvailable] = useState(''); // 'yes' 또는 'no'

  // 거래 유효시간
  const [tradeDuration, setTradeDuration] = useState('7일'); // 거래 유효 시간 선택값

  // 희망 지점 선택
  const [selectedRegion, setSelectedRegion] = useState('강남'); // 선택된 지역 (강남, 홍대, 잠실 등)
  const [selectedBranches, setSelectedBranches] = useState([]); // 선택된 지점 이름들 (최대 3개)

  // 희망지점 선택 항목 시작
  const branchData = {
    강남: {
      center: { lat: 37.498, lng: 127.027 },
      branches: [
        { name: '강남역점', lat: 37.499, lng: 127.026 },
        { name: '역삼점', lat: 37.500, lng: 127.036 },
        { name: '논현점', lat: 37.511, lng: 127.021 },
        { name: '신논현점', lat: 37.504, lng: 127.012 },
        { name: '삼성점', lat: 37.514, lng: 127.057 },
        { name: '선릉점', lat: 37.505, lng: 127.048 },
        { name: '도곡점', lat: 37.481, lng: 127.045 },
      ],
    },
    홍대: {
      center: { lat: 37.556, lng: 126.923 },
      branches: [
        { name: '홍대입구점', lat: 37.557, lng: 126.924 },
        { name: '연남점', lat: 37.561, lng: 126.925 },
        { name: '합정점', lat: 37.550, lng: 126.913 },
        { name: '망원점', lat: 37.556, lng: 126.904 },
        { name: '상수점', lat: 37.547, lng: 126.923 },
        { name: '신촌점', lat: 37.556, lng: 126.937 },
      ],
    },
    잠실: {
      center: { lat: 37.513, lng: 127.102 },
      branches: [
        { name: '잠실역점', lat: 37.513, lng: 127.100 },
        { name: '석촌점', lat: 37.505, lng: 127.106 },
        { name: '송파점', lat: 37.499, lng: 127.112 },
        { name: '문정점', lat: 37.487, lng: 127.122 },
        { name: '가락시장점', lat: 37.493, lng: 127.118 },
        { name: '방이점', lat: 37.513, lng: 127.121 },
      ],
    },
  };
  // 희망지점 선택 항목 끝

  //거래 유효기간 배열
  const durationOptions = ['3일', '5일', '7일', '10일'];

  //사용자의 입력 방식 지정
  const sensors = useSensors(useSensor(PointerSensor));

  //const plainPrice = price.replace(/,/g, ''); //서버 전송시 숫자만 추출하는 코드

  useEffect(() => {
    // ✅ 컴포넌트가 언마운트 될 때 실행 (cleanup)
    return () => {
      images.forEach((img) => {
        URL.revokeObjectURL(img.id); // 브라우저 메모리에서 등록된 이미지 URL 정리
      });
    };
  }, [images]);

  //이미지 최대 10개 제한
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (images.length + selectedFiles.length > 10) {
      alert('이미지는 최대 10장까지 업로드할 수 있습니다.');
      return;
    }

    const newImages = selectedFiles.map((file) => {
      const id = URL.createObjectURL(file);
      return { id, file };
    });
    setImages((prev) => [...prev, ...newImages]);
    setUploadKey(Date.now());
  };

  // 🔄 이미지 삭제 함수 (삭제할 이미지의 브라우저 메모리도 해제함)
  const handleDelete = (id) => {
    // 삭제 대상 이미지 찾기 (브라우저 URL 해제를 위해)
    const deletedImage = images.find((img) => img.id === id);

    if (deletedImage) {
      URL.revokeObjectURL(deletedImage.id); // ✅ 브라우저 메모리에서 이미지 URL 제거
    }

    // 해당 이미지 제거
    setImages((prev) => prev.filter((img) => img.id !== id));

    // ✅ 아주 짧은 시간 후에 강제로 리렌더링 유도
    setTimeout(() => {
      setUploadKey(Date.now());
    }, 0);
  };

  //이미지 드래그로 위치 변경 가능
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over?.id);
      setImages((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };
  
  //상품명 글자수 40개 제한
  const handleProductNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 40) {
      setProductName(value);
    }
  };

  //태그 생성
  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const newTag = tagInput.trim();
  
      if (
        newTag &&
        newTag.length <= 9 &&
        !tags.includes(newTag) &&
        tags.length < maxTags
      ) {
        setTags([...tags, newTag]);
      }
  
      setTagInput('');
    }
  };

  //각 태그별 글자수 9개 제한
  const handleTagInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= 9) {
      setTagInput(value);
    }
  };

  //태그 삭제
  const handleRemoveTag = (removeTag) => {
    setTags(tags.filter((tag) => tag !== removeTag));
  };

  //실제 지도상의 거리 계산 함수
  function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  //선택된 지역과 브랜치 각각 변수로 꺼내기(구조분해할당)
  const { center, branches } = branchData[selectedRegion];

  //3km이하 지점만 필터링해서 저장
  const filteredBranches = branches.filter((branch) => {
    const distance = getDistance(center.lat, center.lng, branch.lat, branch.lng);
    return distance <= 3;
  });

  const navigate = useNavigate(); // 🔥 메인으로 이동할 때 쓰는 navigate 추가

  return (
    <Wrapper>
      <Header />
      <Outer>
        <Inner>
          <TitleBox>
            <Title>상품등록</Title>
          </TitleBox>
          {/* 이미지 추가 구현 */}
          <ImageSection>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={images.map((img) => img.id)} strategy={verticalListSortingStrategy}>
                {images.map((img) => (
                  <SortableImage key={img.id} id={img.id} src={img.id} onDelete={handleDelete} />
                ))}
              </SortableContext>
            </DndContext>

            {images.length < 10 && (
              <ImageUploadBox htmlFor="imageUpload">
                <CameraIcon src={cameraIcon} alt="camera" />
                <span>+</span>
                <span>이미지 업로드 (선택)</span>
                <UploadCount>{images.length} / 10</UploadCount>
              </ImageUploadBox>
            )}
          </ImageSection>
          {/* 화면에는 안보이지만 이미제 세션 클릭시 파일 선택 창 열림 */}
          <HiddenInput
            key={uploadKey}
            type="file"
            id="imageUpload"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            ref={inputRef}
          />

          <SectionDivider />

          <FieldBox>
            {/* 상품명 항목 끝 */}
            <SectionTitle>상품명</SectionTitle>
            {/* 상품명 입력 칸 */}
            <InputWrapper>
                <Input
                    type="text"
                    value={productName}
                    onChange={handleProductNameChange}
                    placeholder="상품명을 입력해주세요"
                />
                {/* 입력된 글자수 와 입력가능 수 카운팅 */}
                <CharCount>{productName.length} / 40</CharCount>
            </InputWrapper>
            {/* 상품명 항목 끝 */}

            {/* 카테고리 항목 시작 */}
            <SectionTitle>카테고리</SectionTitle>
            <DropdownRow>
                {/* 1차: 대분류 */}
                <Select value={mainCategory} onChange={(e) => {
                    setMainCategory(e.target.value);
                    setSubCategory('');
                    setThirdCategory('');
                    }}>
                    <option value="">대분류 선택</option>
                    {categories.map((cat) => (
                        <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                </Select>
                {/* 2차: 중분류 */}
                {/* 대분류 선택시 중분류 선택 가능 */}
                {/* 대분류 항목과 연결되는 중분류 항목만 보여준다. */}
                <Select value={subCategory} onChange={(e) => {
                    setSubCategory(e.target.value);
                    setThirdCategory('');
                    }} disabled={!mainCategory}>
                    <option value="">중분류 선택</option>
                    {mainCategory &&
                        categories.find((cat) => cat.name === mainCategory)?.children.map((sub) => (
                        <option key={sub.name} value={sub.name}>{sub.name}</option>
                    ))}
                </Select>
                {/* 3차: 소분류 */}
                {/* 중분류 선택시 소분류 선택 가능 */}
                {/* 중분류 항목과 연결되는 소분류 항목만 보여준다. */}
                <Select value={thirdCategory} onChange={(e) => setThirdCategory(e.target.value)} disabled={!subCategory}>
                    <option value="">소분류 선택</option>
                    {mainCategory && subCategory &&
                    categories.find((cat) => cat.name === mainCategory)
                    ?.children.find((sub) => sub.name === subCategory)
                    ?.children.map((item) => (<option key={item} value={item}>{item}</option>))}
                </Select>
            </DropdownRow>
            {/* 카테고리 항목 끝 */}

            {/* 태그 항목 시작 */}
            <SectionTitleRow>
                <SectionTitle>태그</SectionTitle>
                <OptionalText>(선택)</OptionalText>
            </SectionTitleRow>
            {/* 입력된 태그를 보여주고 태그 삭제도 가능 */}
            <TagBox>
                {tags.map((tag) => (
                    <Tag key={tag}>
                        #{tag}
                        <RemoveButton onClick={() => handleRemoveTag(tag)}>×</RemoveButton>
                    </Tag>
                ))}
            </TagBox>

            <TagInputWrapper>
                {/* 태그 입력창(최대갯수 초과시 입력 불가) */}
                <TagInput
                    type="text"
                    placeholder="태그 입력 후 Enter 또는 Space"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onKeyDown={handleAddTag}
                    disabled={tags.length >= maxTags}
                />
                {/* 입력된 태그와 최대 입력갯수 카운팅 */}
                <TagCount>{tags.length} / {maxTags}</TagCount>
            </TagInputWrapper>

            <GuideBox>
                <GuideText>태그는 띄어쓰기로 구분되며 최대 9자까지 입력할 수 있어요.</GuideText>
                <GuideText>내 상품을 다양한 태그로 표현해 보세요.</GuideText>
                <GuideText>사람들이 내 상품을 더 잘 찾을 수 있어요.</GuideText>
                <GuideText>상품과 관련 없는 태그를 입력할 경우, 판매에 제재를 받을 수 있어요.</GuideText>
            </GuideBox>
            {/* 태그 항목 끝 */}

            {/* 상품 상태 항목 시작 */}
            <SectionTitle>상품 상태</SectionTitle>
            <ConditionBox>
                {
                    [
                        { title: '새 상품', desc: '사용하지 않은 새 상품' },
                        { title: '사용감 없음', desc: '사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음' },
                        { title: '사용감 적음', desc: '눈에 띄는 흔적이나 얼룩이 약간 있음' },
                        { title: '사용감 많음', desc: '눈에 띄는 흔적이나 얼룩이 많이 있음' },
                        { title: '고장/파손 상품', desc: '기능 이상이나 외관 손상 등으로 수리/수선 필요' },
                    ].map((opt) => (
                      // 각 항목을 map으로 돌려서 항목별 라디오 버튼 생성하고 선택된 항목 강조
                        <ConditionOption key={opt.title} checked={condition === opt.title}>
                            <input
                                type="radio"
                                name="condition"
                                value={opt.title}
                                checked={condition === opt.title}
                                onChange={() => setCondition(opt.title)}
                            />
                            <ConditionTitle checked={condition === opt.title}>{opt.title}</ConditionTitle>
                            <ConditionDesc>{opt.desc}</ConditionDesc>
                        </ConditionOption>
                    ))
                }
            </ConditionBox>
            {/* 상품 상태 항목 끝 */}

            {/* 상품 설명 학목 시작 */}
            <SectionTitle>상품 설명</SectionTitle>
            <TextAreaWrapper>
                <TextArea
                    placeholder={`브랜드, 모델명, 구매 시기, 하자 유무 등 상품 설명을 최대한 자세히 적어주세요.
                    전화번호, SNS 계정 등 개인정보 입력은 제한될 수 있어요.
                    안전하고 건전한 거래 환경을 위해 과학기술정보통신부, 한국인터넷진흥원과 직픽(주)이 함께합니다.`}
                    value={description}
                    // 글자 수 2000개 제한
                    onChange={(e) => {
                        if (e.target.value.length <= 2000) {
                        setDescription(e.target.value);
                        }
                    }}
                />
                {/* 글자 수 카운팅 */}
                <TextCount>{description.length} / 2000</TextCount>
            </TextAreaWrapper>

            <SectionDivider />
            {/* 상품 설명 항목 끝 */}

            {/* 가격 항목 시작 */}
            <SectionTitle>가격</SectionTitle>
            <PriceInputWrapper>
                {/* 입력창에 focus가 없고 값도 없다면 표시문구 보여줌 */}
                {!isFocused && price === '' && (
                    <PlaceholderText>가격을 입력하세요</PlaceholderText>
                )}
                <PriceInput
                    type="text"
                    value={price}
                    isFocused={isFocused}
                    placeholder="" // 실제 placeholder는 비워둠
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, ''); //숫자 이외의 문제 제거
                    const formatted = raw.replace(/\B(?=(\d{3})+(?!\d))/g, ','); //쉼표 자동 생성
                    setPrice(formatted);
                    }}
                />
                <Won>원</Won>
            </PriceInputWrapper>
            {/* 가격 항목 끝 */}

             {/* 가격제안 체크박스 시작 */}
             <OneLineOption htmlFor="priceOffer">
                <HiddenCheckbox
                type="checkbox"
                id="priceOffer"
                checked={priceOfferEnabled}
                onChange={(e) => setPriceOfferEnabled(e.target.checked)}
                />
                <RoundCheckbox checked={priceOfferEnabled} />
                가격 제안 받기
            </OneLineOption>
            {/* 가격제안 체크박스 끝 */}

            {/* 직픽거래 항목 시작 */}
            <SectionTitleRow>
                <SectionTitle>직픽거래</SectionTitle>
                <OptionalText>(직접픽업)</OptionalText>
            </SectionTitleRow>
            <OneLineOptions>
              {/* 가능 라디오 버튼 생성 */}
              <OneLineOption htmlFor="locationYes">
                  <HiddenRadio
                      type="radio"
                      id="locationYes"
                      name="location"
                      value="yes"
                      checked={locationAvailable === 'yes'}
                      onChange={(e) => setLocationAvailable(e.target.value)}
                  />
                  <RoundCheckbox checked={locationAvailable === 'yes'} />
                  가능
              </OneLineOption>
              {/* 불가 라디오 버튼 생성 */}
              <OneLineOption htmlFor="locationNo">
                  <HiddenRadio
                      type="radio"
                      id="locationNo"
                      name="location"
                      value="no"
                      checked={locationAvailable === 'no'}
                      onChange={(e) => setLocationAvailable(e.target.value)}
                  />
                  <RoundCheckbox checked={locationAvailable === 'no'} />
                  불가
              </OneLineOption>
            </OneLineOptions>

            {/* 직픽거래 가능일 경우 */}
            {locationAvailable === 'yes' && (
              <>
                <TradeAreaBox>
                  {/* 희망지점 선택 항목 시작 */}
                    <BranchRow>
                      <BranchLabel>
                        희망지점 선택 <BranchSubText>(최대 3개)</BranchSubText>
                      </BranchLabel>
                      {/* 지역 선택 드롭다운 */}
                      <RegionSelect
                        value={selectedRegion}
                        onChange={(e) => {
                          setSelectedRegion(e.target.value); //지역 상태 변경
                          setSelectedBranches([]); //지역 변경 시 지점 선택 초기화
                        }}
                      > 
                      {/* 지역 옵션 생성 */}
                        {Object.keys(branchData).map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </RegionSelect>
                      {/* 지점 버튼 */}
                      <BranchButtonGroup>
                        {/* 선택된 지역으로부터 3km반경 내 지점만 버튼 생성 */}
                        {filteredBranches.map((branch) => {
                          // 선택한 지점이 이미 선택된 지점에 포함되었는지 체크
                          const isSelected = selectedBranches.includes(branch.name);
                          return (
                            <BranchButton
                              key={branch.name}
                              active={isSelected}
                              onClick={() => {
                                // 이미 선택됬다면 제거
                                if (isSelected) {
                                  setSelectedBranches(prev =>
                                    prev.filter(name => name !== branch.name)
                                  );
                                } else { // 미선택이라면 추가(단 최대 3개)
                                  if (selectedBranches.length < 3) {
                                    setSelectedBranches(prev => [...prev, branch.name]);
                                  } else {
                                    alert('최대 3개까지 선택할 수 있습니다.');
                                  }
                                }
                              }}
                            >
                              {/* 버튼별 지점 이름 */}
                              {branch.name} 
                            </BranchButton>
                          );
                        })}
                      </BranchButtonGroup>
                      {/* 현재 선택된 지점과 선택 가능한 갯수 카운트 */}
                      <BranchCountText>선택된 지점: {selectedBranches.length} / 3</BranchCountText>
                    </BranchRow>
                  {/* 희망지점 선택 항목 끝 */}

                  {/* 거래 유효시간 항목 시작 */}
                    <TradeRow>
                      <LabelText>거래 유효시간</LabelText>
                      {/* 거래 유효시간 드롭다운 */}
                      <TradeDurationSelect
                              value={tradeDuration}
                              onChange={(e) => setTradeDuration(e.target.value)}
                          >
                          {durationOptions.map((d) => (
                              <option key={d} value={d}>{d}</option>
                          ))}
                      </TradeDurationSelect>
                    </TradeRow>
                  {/* 거래 유효시간 항목 끝 */}
                </TradeAreaBox>
                {/* 직픽거래 안내사항 */}
                <TradeInfo>
                <li>판매자가 선택한 지점에서 직픽 거래를 진행합니다.</li>
                <li>거래 유효시간 이내 구매자가 거래 요청을 할 수 있습니다.</li>
                </TradeInfo>
              </>
            )}
            {/* 직픽거래 항목 끝 */}

            {/* 최종 마무리 버튼 시작 */}
            <ButtonContainer>
            <SaveButton onClick={() => {
              if (window.confirm('현재 내용을 임시 저장 하시겠습니까?')) {
                alert('저장되었습니다.');
                // 여기서 원하면 나중에 저장 로직 추가 가능
              }
            }}>
              임시저장
            </SaveButton>

            <SubmitButton onClick={() => {
                const isConfirmed = window.confirm('등록을 완료하시겠습니까?');
                if (isConfirmed) {
                  alert('등록이 완료되었습니다.');
                  navigate('/');
                }
              }}>
                등록하기
              </SubmitButton>

                        </ButtonContainer>
            {/* 최종 마무리 버튼 끝 */}
          </FieldBox>
        </Inner>
      </Outer>
      <Footer />
    </Wrapper>
  );
}
