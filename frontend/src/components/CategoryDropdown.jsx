import styled from 'styled-components';
import { useState } from 'react';
import rightArrow from '../assets/icon/RightArrow.svg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 


// 예시 데이터
const categories = [
  {
    name: '남성의류',
    children: [
      {
        name: '상의',
        children: ['후드티/후드집업', '맨투맨', '니트/스웨터', '셔츠', '반팔 티셔츠', '긴팔 티셔츠', '민소매 티셔츠']
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

const DropdownWrapper = styled.div`
 display: flex;
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 1px;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  border-right: 1px solid #eee;
  height: 500px;
  overflow-y: auto; //고정 높이 초과 시 스크롤 생성
`;

const ColumnTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  color: #111;
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: space-between;
`;

const RightArrow = styled.img`
    width: 15px;
    height: 15px;
`

const Item = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#FB4A67' : 'white')};
  color: ${({ active }) => (active ? 'white' : '#333')};

  &:hover {
    background-color: #FB4A67;
    color: white;
  }
`;

export default function CategoryDropdown() {
  const [selectedMain, setSelectedMain] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const navigate = useNavigate();


  const sub =
  selectedMain &&
  categories.find((cat) => cat.name === selectedMain)?.children || [];

  const subSub = selectedSub?.children || [];

  const hasSub = (categoryName) => {
    const target = categories.find((cat) => cat.name === categoryName);
    return target && target.children && target.children.length > 0;
  };

  const hasSubSub = (subCategory) => {
    return subCategory && subCategory.children && subCategory.children.length > 0;
  };

  return (
    <DropdownWrapper>
      {/* 1단 */}
      <Column>
        <ColumnTitle>
          전체 카테고리
          {hasSub(selectedMain) && <RightArrow src={rightArrow} />}
        </ColumnTitle>
        {categories.map((cat) => (
          <Item
            key={cat.name}
            active={cat.name === selectedMain}
            onMouseEnter={() => {
              setSelectedMain(cat.name);
              setSelectedSub(null);
            }}
          >
            {cat.name}
          </Item>
        ))}
      </Column>

      {/* 2단 */}
      {sub.length > 0 && (
        <Column>
          <ColumnTitle>
            {selectedMain}
            {hasSubSub(selectedSub) && <RightArrow src={rightArrow} />}
          </ColumnTitle>
          {sub.map((child) => (
            <Item
              key={child.name}
              active={child.name === selectedSub?.name}
              onMouseEnter={() => setSelectedSub(child)}
            >
              {child.name}
            </Item>
          ))}
        </Column>
      )}

     {/* 3단 */}
      {subSub.length > 0 && (
        <Column>
        <ColumnTitle>{selectedSub.name}</ColumnTitle>
        {subSub.map((leaf) => (
          <Item
            key={leaf}
            onClick={() => navigate(`/category/${encodeURIComponent(leaf)}`)}
          >
            {leaf}
          </Item>
        ))}
      </Column>
      )}
    </DropdownWrapper>
  );
}
