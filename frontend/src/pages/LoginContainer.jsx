// src/components/common/AuthWrapper.jsx
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 90px;
  padding-bottom: 120px;
  font-family: 'Pretendard', sans-serif;
`;

export const Logo = styled(NavLink)`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 64px;
  color: #FB4A67 !important;
  margin-bottom: 40px;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  &.active {
    color: #FB4A67 !important;
  }
`;
