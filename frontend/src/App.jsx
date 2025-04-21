import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// 페이지 컴포넌트
import Main from './pages/Main';
import ProductUpload from './pages/ProductUpload';
import ProductOrder from './pages/ProductOrder';
import OrderSuccess from './pages/OrderSuccess';

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        {/* 기본 루트 접속 시 주문 페이지로 리디렉션 */}
        <Route path="/" element={<Navigate to="/order" replace />} />

        {/* 각 페이지 라우팅 */}
        <Route path="/upload" element={<ProductUpload />} />
        <Route path="/order" element={<ProductOrder />} />
        <Route path="/order/success" element={<OrderSuccess />} />

=======
        <Route path="/" element={<Main />} />
        <Route path="/productUpload" element={<ProductUpload />} />
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/myShop" element={<SellerStore/>}/>
        {/* 오류해결을 위한 주석 */}
>>>>>>> c6d37066a45a9f205146b92e1dcd8609a8b65583
      </Routes>
    </BrowserRouter>
  );
}

export default App;