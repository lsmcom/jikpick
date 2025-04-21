import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
<<<<<<< HEAD
import ProductUpload from './pages/ProductUpload'
import MyPage from './pages/MyPage';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import ProductRegistration from './pages/ProductRegistration';
import ProductDetail from './pages/ProductDetail'
import SellerStore from './pages/SellerStore';
>>>>>>> 416cdf6 (Merge: 충돌해결)
=======
import SellerStore from './pages/SellerStore';
import ProductDetail from './pages/ProductDetail';
>>>>>>> 2a3051a (상품디테일, 상점페이지, 컴포넌트)
=======
import SellerStore from './pages/SellerStore';
import ProductDetail from './pages/ProductDetail';
>>>>>>> 1a5bb78b8648addd700d0a1b8dcf38bc2612d7bb

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
<<<<<<< HEAD
        <Route path="/productUpload" element={<ProductUpload />} />
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/myPage" element={<MyPage />} />
<<<<<<< HEAD
<<<<<<< HEAD
=======
        <Route path="/register" element={<ProductRegistration />} />
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/profile" element={<SellerStore/>}/>
>>>>>>> 416cdf6 (Merge: 충돌해결)
=======
        <Route path="/myShop" element={<SellerStore/>}/>
>>>>>>> 2a3051a (상품디테일, 상점페이지, 컴포넌트)
=======
        <Route path="/myShop" element={<SellerStore/>}/>
>>>>>>> 1a5bb78b8648addd700d0a1b8dcf38bc2612d7bb
      </Routes>
    </BrowserRouter>
  );
}


export default App
