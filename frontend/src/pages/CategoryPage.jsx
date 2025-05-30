import styled from 'styled-components';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import heartIcon from '../assets/icon/HeartIcon.svg';
import { use, useEffect, useState } from 'react';
import axios from '../api/axios';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 1200px;
  padding: 0 20px;
`;

const Breadcrumb = styled.div`
  font-size: 16px;
  color: #888;
  margin: 20px 0;
`;

const Location = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-bottom: 40px;
`;

const CategoryBox = styled.div`
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  background: white;

  &:hover {
    border-color: #FB4A67;
    color: #FB4A67;
  }
`;

const SectionTitle = styled.h2`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 24px;

  span {
    color: #FB4A67;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  font-size: 20px;
  font-family: 'Pretendard', sans-serif;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 250px;
  background-color: #f0f0f0;
  border-radius: 6px;
  margin-bottom: 8px;
  background-size: 'cover';
  background-position: 'center';
`;

const ProductName = styled.div`
  font-weight: 500;
  margin: 6px 0;
  text-align: left;
`;

const PriceAndLike = styled.div`
  display: flex;
  justify-content: left;
  gap: 20px;
  align-items: center;
`;

const Price = styled.div`
  font-weight: bold;
  text-align: left;
`;

const Like = styled.div`
  color: #FB4A67;
  font-size: 17px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const PaginationWrapper = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  background-color: ${({ active }) => (active ? '#FB4A67' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
`;

export default function CategoryPage() {
  const { categoryNo } = useParams();
  const navigate = useNavigate();

  // 상태 정의
  const [categoryName, setCategoryName] = useState('');
  const [siblingCategories, setSiblingCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [parentNo, setParentNo] = useState(null); // 형제 카테고리를 위한 부모 번호

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const itemsPerPage = 16;

  const filteredItems = items
  .filter(item => item.pickStatus !== '거래완료');

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ page: page });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // 카테고리 클릭 시 이동
  const handleCategoryClick = (no) => {
    navigate(`/category/${no}`);
  };

  useEffect(() => {
    if (!categoryNo) return;
  
    // 1. 선택된 카테고리 상세 조회
    axios.get(`/api/categories/detail/${categoryNo}`)
      .then(res => {
        const { cateName, cateParentNo, cateLevel } = res.data;
        setCategoryName(cateName);
        setParentNo(cateParentNo);
  
        // 2. 상품 목록 요청 URL 분기 (대분류는 하위 포함)
        const itemUrl =
          cateLevel === 1
            ? '/api/items/in-category-tree'
            : '/api/items';
  
        axios
          .get(itemUrl, {
            params: { categoryNo },
          })
          .then(res => setItems(res.data))
          .catch(err => {
            console.error('❌ 상품 리스트 조회 실패', err);
          });
  
        // 3. 형제 카테고리 조회
        return axios.get('/api/categories/children', {
          params: { parentNo: cateParentNo },
        });
      })
      .then(res => {
        setSiblingCategories(res.data);
      })
      .catch(err => {
        console.error('❌ 카테고리 조회 실패', err);
      });
  }, [categoryNo]);
  
  const handleCardClick = (itemNo) => {
    navigate(`/items/${itemNo}`);
  };

  return (
    <>
      <Wrapper>
        <Container>
          <Breadcrumb>홈 &gt; {categoryName}</Breadcrumb>
          <Location>경기도 고양시 일산동구</Location>

          <CategoryGrid>
            {/* 전체보기 (대분류 제외) */}
            {parentNo !== null && (
              <CategoryBox onClick={() => handleCategoryClick(parentNo)}>
                전체보기
              </CategoryBox>
            )}

            {/* 형제 카테고리 목록 */}
            {siblingCategories.map(cat => (
              <CategoryBox
                key={cat.cateNo}
                onClick={() => handleCategoryClick(cat.cateNo)}
                style={{
                  borderColor: cat.cateNo == categoryNo ? '#FB4A67' : '#ddd',
                  color: cat.cateNo == categoryNo ? '#FB4A67' : '#000',
                  fontWeight: cat.cateNo == categoryNo ? '700' : '500',
                }}
              >
                {cat.cateName}
              </CategoryBox>
            ))}
          </CategoryGrid>
          <SectionTitle>
            <span>{categoryName}</span>의 추천 상품
          </SectionTitle>

          <Grid>
            {paginatedItems.map(item => (
              <Card key={item.itemNo} onClick={() => handleCardClick(item.itemNo)}>
                <Thumbnail src={`/images/${item.imagePaths[0]}`}/>
                <ProductName>{item.itemName}</ProductName>
                <PriceAndLike>
                  <Price>{item.itemCost.toLocaleString()}원</Price>
                  <Like>
                    <img src={heartIcon} alt="좋아요" width={18} height={18} />
                    {item.itemWish}
                  </Like>
                </PriceAndLike>
              </Card>
            ))}
          </Grid>

          <PaginationWrapper>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PageButton
                key={page}
                onClick={() => handlePageChange(page)}
                active={page === currentPage}
              >
                {page}
              </PageButton>
            ))}
          </PaginationWrapper>
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
}
