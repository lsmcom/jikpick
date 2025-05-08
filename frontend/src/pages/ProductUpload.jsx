import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import cameraIcon from "../assets/icon/Camera.svg";
import { useNavigate } from "react-router-dom"; // 🔥 이미 되어 있을 수도 있음
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import Modal from "react-modal";

// dnd-kit import
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
const ImageSectionWrapper = styled.div`
  position: relative;
  margin-top: 34px;
`;

const ImageSection = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 180px);
  gap: 16px;
  margin-top: 30px;
`;

const UploadIconBox = styled.label`
  position: absolute;
  top: 0;
  left: 0;
`;

// 모달 이미지 스타일
const ModalImage = styled.img`
  width: 80%;
  max-width: 700px;
  object-fit: contain;
`;

// 모달 닫기 버튼
const ModalClose = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
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
  font-family: "pretendard";
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #fb4a67; // 포커스 시 강조 색
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
    name: "남성의류", // 대분류
    children: [
      {
        name: "상의", // 중분류
        children: [
          "후드티/후드집업",
          "맨투맨",
          "니트/스웨터",
          "셔츠",
          "반팔 티셔츠",
          "긴팔 티셔츠",
          "민소매 티셔츠",
        ], // 소분류
      },
      {
        name: "아우터",
        children: ["자켓", "코트", "패딩"],
      },
    ],
  },
  {
    name: "여성의류",
    children: [
      {
        name: "스커트",
        children: ["미니", "미디", "롱"],
      },
      {
        name: "블라우스",
        children: ["셔츠형", "레이스형"],
      },
    ],
  },
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

  background-image: url("/assets/icon/DropDown.svg"); // 드롭다운 아이콘
  background-repeat: no-repeat;
  background-position: right 18px center;
  background-size: 18px;

  &:focus {
    outline: none;
    border-color: #fb4a67; // 포커스 시 강조
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
  background-color: #fb4a67;
  color: white;
  padding: 6px 12px;
  border-radius: 20px; // 둥근 모양
  font-size: 16px;
  font-family: "pretendard";
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
  font-family: "pretendard";
  height: 50px;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #fb4a67;
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
  width: 680px;
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
  border: 1px solid ${({ checked }) => (checked ? "#FB4A67" : "#ddd")}; // 선택되었을 때 테두리 강조
  background-color: ${({ checked }) =>
    checked ? "#FFF0F3" : "white"}; // 선택 시 배경색 변경
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
  font-family: "pretendard";
  margin-bottom: 4px;
  color: ${({ checked }) =>
    checked ? "#FB4A67" : "#333"}; // 선택 시 핑크색 강조
`;

// 💬 상품 상태의 설명 텍스트 (예: "눈에 띄는 흔적이나 얼룩이 약간 있음")
const ConditionDesc = styled.span`
  font-family: "pretendard";
  font-size: 16px;
  color: #777;
  line-height: 1.4;
`;

// 🖊️ 상품 설명 입력 영역을 감싸는 래퍼 (카운터 위치용)
const TextAreaWrapper = styled.div`
  position: relative;
  width: 1200px;
`;

// 📝 상품 설명 입력 필드
const TextArea = styled.textarea`
  font-family: "pretendard";
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
    border-color: #fb4a67; // 포커스 시 강조색
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
  font-family: "pretendard";
  width: 300px;
  height: 50px;
  margin-bottom: 12px;
`;

// 💸 실제 가격 입력 input
const PriceInput = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== "isFocused",
})`
  width: 100%;
  height: 100%;
  padding: 12px 36px 12px 16px; // 오른쪽 padding은 "원" 텍스트 공간 확보
  font-size: 16px;
  font-family: "pretendard";
  border: 1px solid #ddd;
  border-radius: 20px;
  box-sizing: border-box;
  text-align: ${({ isFocused }) =>
    isFocused ? "right" : "left"}; // 포커스 상태일 때 오른쪽 정렬

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #fb4a67;
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
const HiddenRadio = styled.input.attrs({ type: "radio" })`
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
  background-color: ${({ checked }) => (checked ? "#FB4A67" : "#fff")};
  border: 1.5px solid #ccc;
  margin-right: 8px;
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
  text-align: center;
  flex-shrink: 0;

  &::before {
    content: "✔"; // 체크 상태일 때만 보이게 설정
    visibility: ${({ checked }) => (checked ? "visible" : "hidden")};
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
  shouldForwardProp: (prop) => prop !== "active", // ✅ active를 DOM에 넘기지 않음
})`
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 20px;
  border: 1px solid ${({ active }) => (active ? "#FB4A67" : "#ccc")};
  background-color: ${({ active }) => (active ? "#FB4A67" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  cursor: pointer;

  &:hover {
    border-color: #fb4a67;
    color: ${({ active }) => (active ? "#fff" : "#FB4A67")};
    background-color: ${({ active }) => (active ? "#FB4A67" : "#fff")};
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

  background-image: url("/assets/icon/DropDown.svg");
  background-repeat: no-repeat;
  background-position: right 18px center;
  background-size: 18px;

  &:focus {
    outline: none;
    border-color: #fb4a67;
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
  background: url("/assets/icon/DropDown.svg") no-repeat right 14px center;
  background-size: 16px;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:focus {
    outline: none;
    border-color: #fb4a67;
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
  background-color: #fb4a67; // 브랜드 핑크색
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
  // 1. 대표 이미지 설정용 state 추가
  const [thumbnailId, setThumbnailId] = useState(null);

  // 상품명
  const [productName, setProductName] = useState(""); // 상품명 입력값 저장

  // 태그 입력 관련
  const [tags, setTags] = useState([]); // 추가된 태그 목록
  const [tagInput, setTagInput] = useState(""); // 입력 중인 태그 값
  const maxTags = 5; // 태그 최대 개수 제한

  // 상품 상태
  const [condition, setCondition] = useState(""); // 상품 상태 선택값 (새 상품, 사용감 없음 등)

  // 상품 설명
  const [description, setDescription] = useState(""); // 상품 설명 textarea 값

  // 가격 관련
  const [price, setPrice] = useState(""); // 가격 입력값 (쉼표 포함 문자열)
  const [isFocused, setIsFocused] = useState(false); // 가격 입력창 포커스 상태 (placeholder, 정렬 등 조건용)

  // 가격 제안 여부
  const [priceOfferEnabled, setPriceOfferEnabled] = useState(false); // 가격 제안 받기 체크 여부

  // 직픽 거래 가능 여부
  const [locationAvailable, setLocationAvailable] = useState(""); // 'yes' 또는 'no'




   // 예시 데이터 - 지점 정보
const storeExampleData = [
  { storeNo: 73, storeName: '동교동지점', regNo: 13, phone: '02-913-1001' },
  { storeNo: 74, storeName: '상수동지점', regNo: 13, phone: '02-913-1002' },
  { storeNo: 75, storeName: '성산동지점', regNo: 13, phone: '02-913-1003' },
  { storeNo: 76, storeName: '창천동지점', regNo: 13, phone: '02-913-1004' },
  { storeNo: 77, storeName: '합정동지점', regNo: 13, phone: '02-913-1005' },
  { storeNo: 78, storeName: '도화동점', regNo: 13, phone: '02-913-1006' },
  { storeNo: 79, storeName: '창천동지점', regNo: 14, phone: '02-914-1001' },
  { storeNo: 80, storeName: '홍제동지점', regNo: 14, phone: '02-914-1002' },
  { storeNo: 81, storeName: '창천동2호지점', regNo: 14, phone: '02-914-1003' },
  { storeNo: 82, storeName: '홍은동지점', regNo: 14, phone: '02-914-1004' },
  { storeNo: 83, storeName: '홍제동2호지점', regNo: 14, phone: '02-914-1005' },
  { storeNo: 84, storeName: '북아현동지점', regNo: 14, phone: '02-914-1006' },
  { storeNo: 85, storeName: '서초동지점', regNo: 15, phone: '02-915-1001' },
  { storeNo: 86, storeName: '잠원동지점', regNo: 15, phone: '02-915-1002' },
  { storeNo: 87, storeName: '서초동2호지점', regNo: 15, phone: '02-915-1003' },
  { storeNo: 88, storeName: '방배동지점', regNo: 15, phone: '02-915-1004' },
  { storeNo: 89, storeName: '서초동3호지점', regNo: 15, phone: '02-915-1005' },
  { storeNo: 90, storeName: '잠원동2호지점', regNo: 15, phone: '02-915-1006' }
];
  //거래 유효기간 배열
  const durationOptions = ["3일", "5일", "7일", "10일"];

  //사용자의 입력 방식 지정
  const sensors = useSensors(useSensor(PointerSensor));

  //const plainPrice = price.replace(/,/g, ''); //서버 전송시 숫자만 추출하는 코드

  useEffect(() => {
    console.log("업데이트된 이미지 리스트:", images);
    // ✅ 컴포넌트가 언마운트 될 때 실행 (cleanup)
    return () => {
      images.forEach((img) => {
        URL.revokeObjectURL(img.id); // 브라우저 메모리에서 등록된 이미지 URL 정리
      });
    };
  }, [images]);

  // 2. 이미지 업로드할 때 첫 번째 이미지를 자동으로 대표 설정
const handleImageChange = async (e) => {
  const selectedFiles = Array.from(e.target.files);
  const newImages = [];

  if (images.length + selectedFiles.length > 10) {
    alert("이미지는 최대 10장까지 업로드할 수 있습니다.");
    return;
  }

  for (const file of selectedFiles) {
    try {
      const formData = new FormData();
      formData.append('imageFiles', file);

      const res = await axios.post(
        "/api/items/upload-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const uploadedUrl = `${res.data}`;
      const previewUrl = URL.createObjectURL(file);

      newImages.push({
        id: uploadedUrl,
        preview: previewUrl,
        file,
      });
    } catch (err) {
      console.error("업로드 실패:", err);
    }
  }

  const updatedImages = [...images, ...newImages];
  setImages(updatedImages);
  if (!thumbnailId && updatedImages.length > 0) {
    setThumbnailId(updatedImages[0].id);
  }
  setUploadKey(Date.now());
};

  // 3. 대표 이미지 수동 설정 함수 추가
  const setAsThumbnail = (id) => {
    setThumbnailId(id);
  };
  // Sortable Image 컴포넌트

  // 4. 이미지 프리뷰에 대표이미지 표시 및 설정 버튼 추가
  function SortableImage({
    id,
    src,
    onDelete,
    onClick,
    index, // 🔥 index 추가
  }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition };
  
    return (
      <PreviewContainer
        ref={setNodeRef}
        style={style}
        {...attributes}
        onClick={() => onClick(src)}
      >
        <PreviewImage src={src} alt="preview" {...listeners} />
        <DeleteButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          ×
        </DeleteButton>
  
        {/* ✅ index가 0일 때만 “대표 이미지” 표시 */}
        {index === 0 && (
          <div
            style={{
              position: "absolute",
              bottom: 4,
              left: 1,
              fontSize: "12px",
              padding: "4px 8px",
              background: "#FB4A67",
              color: "#fff",
              borderRadius: "7px",
            }}
          >
            대표 이미지 ✔
          </div>
        )}
      </PreviewContainer>
    );
  }
  
  // 🔄 이미지 삭제 함수 (삭제할 이미지의 브라우저 메모리도 해제함)
  const handleDelete = async (id) => {
    const deletedImage = images.find((img) => img.id === id);
    if (deletedImage) {
      URL.revokeObjectURL(deletedImage.preview); // ← preview URL 해제
    }

    try {
      // ✅ 서버에 이미지 삭제 요청 (id는 실제 파일명 또는 서버 경로여야 함)
      await axios.delete("/api/items/delete-image", {
        params: { path: id.split("/").pop() }, // uuid_파일명.jpg 형태
      });
    } catch (error) {
      console.warn("서버에서 이미지 삭제 실패:", error);
    }

    setImages((prev) => prev.filter((img) => img.id !== id));
    setTimeout(() => setUploadKey(Date.now()), 0);
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

  // ProductRegistration 함수 내 state 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // 모달 열고 닫는 함수
  const openImageModal = (src) => {
    setModalImage(src);
    setIsModalOpen(true);
  };
  const closeImageModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
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
    if (e.key === "Enter" || e.key === " ") {
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

      setTagInput("");
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

  const plainPrice = price.replace(/,/g, "");

  // 카테고리 관련 상태
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);

  const [selectedMain, setSelectedMain] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [selectedThird, setSelectedThird] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/categories/children", { params: { parentNo: null } })
      .then((res) => setMainCategories(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedMain) return setSubCategories([]);
    axios
      .get("/api/categories/children", {
        params: { parentNo: selectedMain.cateNo },
      })
      .then((res) => setSubCategories(res.data))
      .catch(console.error);
  }, [selectedMain]);

  useEffect(() => {
    if (!selectedSub) return setSubSubCategories([]);
    axios
      .get("/api/categories/children", {
        params: { parentNo: selectedSub.cateNo },
      })
      .then((res) => setSubSubCategories(res.data))
      .catch(console.error);
  }, [selectedSub]);

  const handleCategoryClick = (cateNo) => {
    navigate(`/category/${cateNo}`);
  };

  const handleMainCategoryChange = (e) => {
    const selectedCateNo = e.target.value;

    if (selectedCateNo === "") {
      setSelectedMain(null);
      setSelectedSub(null);
      setSelectedThird(null);
      return;
    }

    const selectedCategory = mainCategories.find(
      (cat) => cat.cateNo === parseInt(selectedCateNo, 10)
    );
    if (selectedCategory) {
      setSelectedMain(selectedCategory);
      setSelectedSub(null); // 중분류 초기화
      setSelectedThird(null); // 소분류 초기화
    } else {
      console.error("Category not found!");
    }
  };

  const handleSubCategoryChange = (e) => {
    const selectedCateNo = e.target.value;
    const selectedCategory = subCategories.find(
      (cat) => cat.cateNo === parseInt(selectedCateNo, 10)
    );
    setSelectedSub(selectedCategory); // selectedSub를 객체로 설정
    setSelectedThird(null); // 소분류 초기화
  };

  const handleThirdCategoryChange = (e) => {
    const selectedCateNo = e.target.value;
    const selectedCategory = subSubCategories.find(
      (cat) => cat.cateNo === parseInt(selectedCateNo, 10)
    );
    setSelectedThird(selectedCategory); // selectedThird를 객체로 설정
  };
  const userInfo = JSON.parse(localStorage.getItem("user")); // 또는 sessionStorage
  const userNo = userInfo?.userNo;
  //지점
  const [allStores, setAllStores] = useState([]);

  
  useEffect(() => {
    axios.get('/api/stores')
      .then((res) => {
        const cleanedData = res.data.map(store => ({
          ...store,
          regNo: Number(store.regNo), // 여기서 미리 숫자로 변환
        }));
        setAllStores(cleanedData);
      })
      .catch((err) => console.error("지점 목록 불러오기 실패", err));
  }, []);
  

      // 추가: 지역명 → 지역번호 매핑 객체
      const regionMap = {
        마포구:13,
        서대문구:14,
        서초구:15,
        // 필요시 다른 지역도 추가
      };

  

// 상태 관리
const [selectedRegion, setSelectedRegion] = useState(""); // 선택된 지역
const [selectedBranches, setSelectedBranches] = useState([]); // 선택된 지점들

// 지역에 해당하는 지점만 필터링
const filteredStores = selectedRegion
  ? storeExampleData.filter(store => store.regNo === regionMap[selectedRegion])
  : [];

// 지역 선택 핸들러
const handleRegionChange = (e) => {
  setSelectedRegion(e.target.value);
  setSelectedBranches([]); // 지역 변경 시 선택된 지점 초기화
};

// 지점 선택 핸들러
const handleBranchSelection = (storeName) => {
  console.log("selectedBranches before:", selectedBranches); // 선택된 지점들이 제대로 추가되는지 확인
  
  if (selectedBranches.includes(storeName)) {
    setSelectedBranches(prev => prev.filter(name => name !== storeName));
  } else if (selectedBranches.length < 3) {
    setSelectedBranches(prev => [...prev, storeName]);
  } else {
    alert("최대 3개 지점만 선택할 수 있습니다.");
  }

  console.log("selectedBranches after:", selectedBranches); // 상태가 제대로 업데이트 되었는지 확인
};



allStores.slice(0, 5).forEach((s, i) => {
});  
//유효기간
const [tradeDuration, setTradeDuration] = useState('');
// 🔧 함수 최상단에 위치시키기
const normalize = (str) =>
  str.replace(/\s/g, '')
     .replace(/지점$/, '')
     .replace(/[^가-힣a-zA-Z0-9]/g, '')
     .toLowerCase();



     const handleSubmit = async () => {
      const userInfo = JSON.parse(sessionStorage.getItem("user"));
      const userNo = userInfo?.userNo;
      if (!userNo) {
        alert("로그인이 필요합니다.");
        return;
      }
    
      if (selectedBranches.length === 0) {
        alert("최소 1개의 지점을 선택해야 합니다.");
        return;
      }
    
      if (!tradeDuration) {
        alert("거래 유효시간을 선택해주세요.");
        return;
      }
    
      const parsedCost = parseInt(price.replace(/,/g, ""));
      if (!parsedCost || parsedCost <= 0) {
        alert("유효한 가격을 입력해주세요.");
        return;
      }
    
      const categoryNo = selectedThird?.cateNo || selectedSub?.cateNo || selectedMain?.cateNo;
      if (!categoryNo) {
        alert("카테고리를 선택해 주세요.");
        return;
      }
    
      if (images.length === 0) {
        alert("이미지를 최소 1장 업로드해 주세요.");
        return;
      }
    
      // ✅ storeExampleData에서 storeNo 추출
      const selectedStoreNos = storeExampleData
        .filter(store => selectedBranches.includes(store.storeName))
        .map(store => store.storeNo);
    
      const formData = new FormData();
    
      images.forEach(img => {
        if (img.file instanceof File) {
          formData.append("imageFiles", img.file);
        }
      });
    
      const itemDto = {
        userNo,
        categoryNo,
        itemName: productName,
        itemCost: parsedCost,
        itemInfo: description,
        itemStatus: mapConditionToCode(condition),
        pickOption: locationAvailable === "yes" ? 1 : 0,
        storeNos: selectedStoreNos,
        pickPeriod: tradeDuration,
      };
    
      formData.append(
        "itemRequestDto",
        new Blob([JSON.stringify(itemDto)], { type: "application/json" })
      );
    
      try {
        const res = await axios.post("/api/items", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
    
        alert("상품이 등록되었습니다!");
        navigate("/");
      } catch (err) {
        console.error("등록 실패:", err.response?.data || err);
        alert("등록 중 오류가 발생했습니다.");
      }
    };
    

const mapConditionToCode = (label) => {
  switch (label) {
    case "새 상품":
      return "A";
    case "사용감 없음":
      return "B";
    case "사용감 적음":
      return "C";
    case "사용감 많음":
      return "D";
    case "고장/파손 상품":
      return "E";
    default:
      return "Z";
  }
};

return (
  <Wrapper>
    <Outer>
      <Inner>
        <TitleBox>
          <Title>상품등록</Title>
        </TitleBox>
        {/* 이미지 추가 구현 */}
        <ImageSection>
          {images.length < 10 && (
            <ImageUploadBox htmlFor="imageUpload">
              <CameraIcon src={cameraIcon} alt="camera" />
              <span>+</span>
              <span>이미지 업로드 (선택)</span>
              <UploadCount>{images.length} / 10</UploadCount>
            </ImageUploadBox>
          )}
          <DndContext
            sensors={useSensors(useSensor(PointerSensor))}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >

            <SortableContext
              items={images.map((img) => img.id)}
              strategy={verticalListSortingStrategy}
            >
              {images.map((img, index) => (
                <SortableImage
                  key={img.id}
                  id={img.id}
                  src={img.preview}
                  onDelete={handleDelete}
                  onClick={openImageModal}
                  index={index}
                />
              ))}
            </SortableContext>

          </DndContext>
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

        {/* 이미지 모달 */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeImageModal}
          style={{
            content: {
              background: "rgba(0,0,0,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              border: "none",
              overflow: "hidden",
            },
            overlay: {
              backgroundColor: "rgba(0,0,0,0.8)",
            },
          }}
          ariaHideApp={false}
        >
          <ModalImage
            src={
              modalImage?.startsWith("blob")
                ? modalImage
                : `${modalImage}`
            }
            alt="modal-view"
          />
          <ModalClose onClick={closeImageModal}>×</ModalClose>
        </Modal>

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
          <SectionTitle>카테고리</SectionTitle>
          <DropdownRow>
            {/* 1차: 대분류 */}
            <Select
              value={selectedMain?.cateNo || ""}
              onChange={(e) => {
                const selected = mainCategories.find(
                  (cat) => cat.cateNo === Number(e.target.value)
                );
                setSelectedMain(selected || null);
                setSelectedSub(null);
                setSelectedThird(null);
              }}
            >
              <option value="">대분류 선택</option>
              {mainCategories.map((cat) => (
                <option key={cat.cateNo} value={cat.cateNo}>
                  {cat.cateName}
                </option>
              ))}
            </Select>

            {/* 2차: 중분류 (항상 표시되지만 선택 전까지 비활성화) */}
            <Select
              value={selectedSub?.cateNo || ""}
              onChange={(e) => {
                const selected = subCategories.find(
                  (sub) => sub.cateNo === Number(e.target.value)
                );
                setSelectedSub(selected || null);
                setSelectedThird(null);
              }}
              disabled={!selectedMain}
            >
              <option value="">중분류 선택</option>
              {subCategories.map((sub) => (
                <option key={sub.cateNo} value={sub.cateNo}>
                  {sub.cateName}
                </option>
              ))}
            </Select>

            {/* 3차: 소분류 (항상 표시되지만 선택 전까지 비활성화) */}
            <Select
              value={selectedThird?.cateNo || ""}
              onChange={(e) => {
                const selected = subSubCategories.find(
                  (third) => third.cateNo === Number(e.target.value)
                );
                setSelectedThird(selected || null);
              }}
              disabled={!selectedSub}
            >
              <option value="">소분류 선택</option>
              {subSubCategories.map((subSub) => (
                <option key={subSub.cateNo} value={subSub.cateNo}>
                  {subSub.cateName}
                </option>
              ))}
            </Select>
          </DropdownRow>

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
                <RemoveButton onClick={() => handleRemoveTag(tag)}>
                  ×
                </RemoveButton>
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
            <TagCount>
              {tags.length} / {maxTags}
            </TagCount>
          </TagInputWrapper>

          <GuideBox>
            <GuideText>
              태그는 띄어쓰기로 구분되며 최대 9자까지 입력할 수 있어요.
            </GuideText>
            <GuideText>내 상품을 다양한 태그로 표현해 보세요.</GuideText>
            <GuideText>사람들이 내 상품을 더 잘 찾을 수 있어요.</GuideText>
            <GuideText>
              상품과 관련 없는 태그를 입력할 경우, 판매에 제재를 받을 수 있어요.
            </GuideText>
          </GuideBox>
          {/* 태그 항목 끝 */}

          {/* 상품 상태 항목 시작 */}
          <SectionTitle>상품 상태</SectionTitle>
          <ConditionBox>
            {[
              { title: "새 상품", desc: "사용하지 않은 새 상품" },
              {
                title: "사용감 없음",
                desc: "사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음",
              },
              {
                title: "사용감 적음",
                desc: "눈에 띄는 흔적이나 얼룩이 약간 있음",
              },
              {
                title: "사용감 많음",
                desc: "눈에 띄는 흔적이나 얼룩이 많이 있음",
              },
              {
                title: "고장/파손 상품",
                desc: "기능 이상이나 외관 손상 등으로 수리/수선 필요",
              },
            ].map((opt) => (
              // 각 항목을 map으로 돌려서 항목별 라디오 버튼 생성하고 선택된 항목 강조
              <ConditionOption
                key={opt.title}
                checked={condition === opt.title}
              >
                <input
                  type="radio"
                  name="condition"
                  value={opt.title}
                  checked={condition === opt.title}
                  onChange={() => setCondition(opt.title)}
                />
                <ConditionTitle checked={condition === opt.title}>
                  {opt.title}
                </ConditionTitle>
                <ConditionDesc>{opt.desc}</ConditionDesc>
              </ConditionOption>
            ))}
          </ConditionBox>
          {/* 상품 상태 항목 끝 */}

          {/* 상품 설명 항목 시작 */}
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
            {!isFocused && price === "" && (
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
                const raw = e.target.value.replace(/[^0-9]/g, ""); //숫자 이외의 문제 제거
                const formatted = raw.replace(/\B(?=(\d{3})+(?!\d))/g, ","); //쉼표 자동 생성
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
                checked={locationAvailable === "yes"}
                onChange={(e) => setLocationAvailable(e.target.value)}
              />
              <RoundCheckbox checked={locationAvailable === "yes"} />
              가능
            </OneLineOption>
            {/* 불가 라디오 버튼 생성 */}
            <OneLineOption htmlFor="locationNo">
              <HiddenRadio
                type="radio"
                id="locationNo"
                name="location"
                value="no"
                checked={locationAvailable === "no"}
                onChange={(e) => setLocationAvailable(e.target.value)}
              />
              <RoundCheckbox checked={locationAvailable === "no"} />
              불가
            </OneLineOption>
          </OneLineOptions>

          {/* 직픽거래 가능일 경우 */}
          {locationAvailable === "yes" && (
  <>
    <TradeAreaBox>
      <BranchRow>
        <BranchLabel>
          희망지점 선택 <BranchSubText>(최대 3개)</BranchSubText>
        </BranchLabel>

        <RegionSelect
          value={selectedRegion}
          onChange={(e) => {
            setSelectedRegion(e.target.value);
            setSelectedBranches([]); // 지역 변경 시 선택된 지점 초기화
          }}
        >
          <option value="">지역을 선택하세요</option>
          {Object.keys(regionMap).map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </RegionSelect>

        {/* 필터링된 지점들만 렌더링 */}
        {selectedRegion && filteredStores.length > 0 && (
          <>
            <BranchButtonGroup>
              {filteredStores.map((store) => {
                const isSelected = selectedBranches.includes(store.storeName);
                return (
                  <BranchButton
                    key={store.storeNo}
                    active={isSelected}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedBranches(prev =>
                          prev.filter(name => name !== store.storeName)
                        );
                      } else {
                        if (selectedBranches.length < 3) {
                          setSelectedBranches(prev => [...prev, store.storeName]);
                        } else {
                          alert('최대 3개까지 선택할 수 있습니다.');
                        }
                      }
                    }}
                  >
                    {store.storeName}
                  </BranchButton>
                );
              })}
            </BranchButtonGroup>

            <BranchCountText>
              선택된 지점: {selectedBranches.length} / 3
            </BranchCountText>
                    </>
                  )}
                </BranchRow>

                {/* 희망지점 선택 항목 끝 */}

                {/* 거래 유효시간 항목 시작 */}
               {/* 거래 유효시간 항목 시작 */}
                <TradeRow>
                  <LabelText>거래 유효시간</LabelText>
                  {/* 거래 유효시간 드롭다운 */}
                  <TradeDurationSelect
                  value={tradeDuration}
                  onChange={(e) => setTradeDuration(Number(e.target.value))} // 문자열 → 숫자
                >
                  <option value="">선택하세요</option>
                  <option value={3}>3일</option>
                  <option value={5}>5일</option>
                  <option value={7}>7일</option>
                </TradeDurationSelect>

                </TradeRow>
                {/* 거래 유효시간 항목 끝 */}

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
            <SaveButton
              onClick={() => {
                if (window.confirm("현재 내용을 임시 저장 하시겠습니까?")) {
                  alert("저장되었습니다.");
                  // 여기서 원하면 나중에 저장 로직 추가 가능
                }
              }}
            >
              임시저장
            </SaveButton>

            <SubmitButton onClick={handleSubmit}>등록하기</SubmitButton>
          </ButtonContainer>
          {/* 최종 마무리 버튼 끝 */}
        </FieldBox>
      </Inner>
    </Outer>
    <Footer />
  </Wrapper>
);
}