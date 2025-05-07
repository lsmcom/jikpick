import styled from 'styled-components';
import { useState, useEffect } from 'react';
import rightArrow from '../assets/icon/RightArrow.svg';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

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
  overflow-y: auto;
`;

const ColumnTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightArrow = styled.img`
  width: 15px; height: 15px;
`;

const Item = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? '#FB4A67' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#333')};
  &:hover {
    background-color: #FB4A67;
    color: white;
  }
`;

export default function CategoryDropdown() {
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);

  const [selectedMain, setSelectedMain] = useState(null);       // { cateNo, cateName }
  const [selectedSub, setSelectedSub] = useState(null);         // { cateNo, cateName }

  const navigate = useNavigate();

  // 1) 최초에 대분류만 불러오기
  useEffect(() => {
    axios.get('/api/categories/children', { params: { parentNo: null } })
      .then(res => setMainCategories(res.data))
      .catch(console.error);
  }, []);

  // 2) main 선택 시 중분류 불러오기
  useEffect(() => {
    if (!selectedMain) return setSubCategories([]);
    axios.get('/api/categories/children', { params: { parentNo: selectedMain.cateNo } })
      .then(res => setSubCategories(res.data))
      .catch(console.error);
  }, [selectedMain]);

  // 3) sub 선택 시 소분류 불러오기
  useEffect(() => {
    if (!selectedSub) return setSubSubCategories([]);
    axios.get('/api/categories/children', { params: { parentNo: selectedSub.cateNo } })
      .then(res => setSubSubCategories(res.data))
      .catch(console.error);
  }, [selectedSub]);

  const handleCategoryClick = (cateNo) => {
    const userData = JSON.parse(sessionStorage.getItem('user'));
  
    if (!userData) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
      return;
    }
  
    navigate(`/category/${cateNo}`);
  };

  return (
    <DropdownWrapper>
      {/* 대분류 */}
      <Column>
        <ColumnTitle>
          전체 카테고리
          {selectedMain && !!subCategories.length && <RightArrow src={rightArrow} />}
        </ColumnTitle>
        {mainCategories.map(cat => (
          <Item
            key={cat.cateNo}
            $active={selectedMain?.cateNo === cat.cateNo}
            onMouseEnter={() => {
              setSelectedMain(cat);
              setSelectedSub(null);
            }}
            onClick={() => handleCategoryClick(cat.cateNo)} // ✅ 클릭 시 이동 추가
          >
            {cat.cateName}
          </Item>
        ))}
      </Column>

      {/* 중분류 */}
      {subCategories.length > 0 && (
        <Column>
          <ColumnTitle>
            {selectedMain.cateName}
            {selectedSub && !!subSubCategories.length && <RightArrow src={rightArrow} />}
          </ColumnTitle>
          {subCategories.map(cat => (
            <Item
              key={cat.cateNo}
              $active={selectedSub?.cateNo === cat.cateNo}
              onMouseEnter={() => setSelectedSub(cat)}
              onClick={() => handleCategoryClick(cat.cateNo)} // ✅ 클릭 시 이동 추가
            >
              {cat.cateName}
            </Item>
          ))}
        </Column>
      )}

      {/* 소분류 */}
      {subSubCategories.length > 0 && selectedSub &&(
        <Column>
          <ColumnTitle>{selectedSub?.cateName}</ColumnTitle>
          {subSubCategories.map(cat => (
            <Item
              key={cat.cateNo}
              onClick={() => handleCategoryClick(cat.cateNo)}
            >
              {cat.cateName}
            </Item>
          ))}
        </Column>
      )}
    </DropdownWrapper>
  );
}
