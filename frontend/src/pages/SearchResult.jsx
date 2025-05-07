import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../api/axios';
import ProductCardGrid from "../components/ProductDetail/ProductCardGrid";

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

const SearchResult = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [items, setItems] = useState([]);

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

  return (
    <Container>
      <Title>🔍 ‘{query}’에 대한 검색 결과</Title>
      <ProductCardGrid items={items || []} />

    </Container>
  );
};

export default SearchResult;
