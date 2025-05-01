import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
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

function AppContent({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();

  const hideHeaderPaths = [
    '/login',
    '/signup',
    '/join',
    '/findID',
    '/findPW',
    '/foundID',
    '/resetPW'
  ];

  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <>
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
        <Route path="/order" element={<ProductOrder />} />
        <Route path="/order/success" element={<OrderSuccess />} />
        <Route path="/shopSale" element={<ShopSale />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/myPage" element={<MyPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/myShop" element={<SellerStore />} />
        <Route path="/modifyInfo" element={<ModifyInfo/>}/>
        <Route path="/shopLike" element={<ShopLike />}/>
        <Route path="/shopOrder" element={<ShopOrder />}/>
        <Route path="/category/:main/:sub?" element={<CategoryPage />} />
        <Route path="/findBranch" element={<FindBranch />}/>
        <Route path="/chat" element={<Chat />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/withdrawReason" element={<WithdrawReason />} />
        <Route
          path="/withdrawConfirm"
          element={<WithdrawConfirm setIsLoggedIn={setIsLoggedIn} />}
        />
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
