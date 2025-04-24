// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// 페이지 컴포넌트
import Main from './pages/Main';
import ShopSale from './pages/ShopSale';  // ShopSale 페이지 임포트

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 경로를 /shop-sale로 설정 */}
        <Route path="/" element={<Main/>} /> {/* 새로 추가된 ShopSale 컴포넌트 */}

        {/* 각 페이지 라우팅 */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<JoinAgree />} />
        <Route path="/join" element={<JoinForm />} />
        <Route path="/findID" element={<FindID />} />
        <Route path="/findPW" element={<FindPW />} />
        <Route path="/foundID" element={<Found />} />
        <Route path="/resetPW" element={<ResetPW />} />
        <Route path="/upload" element={<ProductUpload />} />
        <Route path="/order" element={<ProductOrder />} />
        <Route path="/order/success" element={<OrderSuccess />} />
        <Route path="/shopSale" element={<ShopSale />} /> {/* 기본 경로를 ShopSale로 리디렉션 */}
        <Route path="/productUpload" element={<ProductUpload />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/myShop" element={<SellerStore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
