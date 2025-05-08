import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../api/axios';
import ProductCardGrid from "../components/ProductDetail/ProductCardGrid";
import Footer from '../components/Footer';

const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 16px;
  font-family: 'Pretendard', sans-serif;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
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

const SearchResult = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = new URLSearchParams(location.search).get('query');

  const pageFromUrl = parseInt(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [items, setItems] = useState([]);

  const itemsPerPage = 16;

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      try {
        const response = await axios.get('/api/items/search', {
          params: { keyword: query }
        });
        setItems(response.data);
      } catch (err) {
        console.error('검색 실패:', err);
      }
    };

    fetchSearchResults();
  }, [query]);

  // 거래완료 제외
  const filteredItems = items.filter(item => item.pickStatus !== '거래완료');

  // 페이징 적용
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ page });
  };

  return (
    <Container>
      <Title>🔍 ‘{query}’에 대한 검색 결과</Title>
      <ProductCardGrid items={paginatedItems} />

      {totalPages > 1 && (
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
      )}

      <Footer />
    </Container>
  );
};

export default SearchResult;
