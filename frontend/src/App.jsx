import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

// 페이지 컴포넌트
import Main from './pages/Main';
import ShopSale from './pages/ShopSale';
import LoginForm from './pages/LoginForm';
import JoinAgree from './pages/JoinAgree';
import JoinForm from './pages/JoinForm';
import FindID from './pages/FindID';
import FindPW from './pages/FindPW';
import Found from './pages/Found';
import ResetPW from './pages/ResetPW';
import ProductUpload from './pages/ProductUpload';
import ProductOrder from './pages/ProductOrder';
import OrderSuccess from './pages/OrderSuccess';
import MyPage from './pages/MyPage';
import SellerStore from './pages/SellerStore';
import ProductDetail from './pages/ProductDetail';
import ShopLike from './pages/ShopLike';
import ShopOrder from './pages/ShopOrder';
import CategoryPage from './pages/CategoryPage';
import WithdrawReason from './pages/WithdrawReason';
import WithdrawConfirm from './pages/WithdrawConfirm';
import PopularProduct from './pages/PopularProduct';
import ModifyInfo from './pages/ModifyInfo';
import FindBranch from './pages/FindBranch';
import Chat from './pages/Chat';
import SearchResult from './pages/SearchResult';

// 📦 전역 스타일
const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Pretendard', sans-serif;
    background-color: #fff;
  }

  #root {
    min-height: 101vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1; /* 💡 핵심: main이 빈 공간 채우도록 */
    display: flex;
    flex-direction: column;
  }
`;

function AppContent({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();

  const hideHeaderPaths = [
    '/login', '/signup', '/join',
    '/findID', '/findPW', '/foundID', '/resetPW'
  ];

  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <>
      <GlobalStyle />
      <ScrollToTop />
      {!shouldHideHeader && <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<JoinAgree />} />
        <Route path="/join" element={<JoinForm />} />
        <Route path="/findID" element={<FindID />} />
        <Route path="/findPW" element={<FindPW />} />
        <Route path="/foundID" element={<Found />} />
        <Route path="/resetPW" element={<ResetPW />} />
        <Route path="/upload" element={<ProductUpload />} />
        <Route path="/order/:itemNo" element={<ProductOrder />} />
        <Route path="/order/success" element={<OrderSuccess />} />
        <Route path="/shopSale" element={<ShopSale />} />
        <Route path="/items/:itemNo" element={<ProductDetail />} />
        <Route path="/myPage" element={<MyPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/myShop" element={<SellerStore />} />
        <Route path="/modifyInfo" element={<ModifyInfo />} />
        <Route path="/shopLike" element={<ShopLike />} />
        <Route path="/shopOrder" element={<ShopOrder />} />
        <Route path="/findBranch" element={<FindBranch />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/category/:categoryNo" element={<CategoryPage />} />
        <Route path="/withdrawReason" element={<WithdrawReason />} />
        <Route path="/withdrawConfirm" element={<WithdrawConfirm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/popular/:categoryName" element={<PopularProduct />} />
      </Routes>

    </>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <AppContent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </BrowserRouter>
  );
}
