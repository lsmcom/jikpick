import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import ProductUpload from './pages/ProductUpload'
import MyPage from './pages/MyPage';
import SellerStore from './pages/SellerStore';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/productUpload" element={<ProductUpload />} />
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/myShop" element={<SellerStore/>}/>
        {/* 오류해결을 위한 주석 */}
      </Routes>
    </BrowserRouter>
  );
}


export default App
