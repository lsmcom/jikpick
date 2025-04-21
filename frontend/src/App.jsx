import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
<<<<<<< HEAD
import ProductUpload from './pages/ProductUpload'
import MyPage from './pages/MyPage';
=======
import ProductRegistration from './pages/ProductRegistration';
import ProductDetail from './pages/ProductDetail'
import SellerStore from './pages/SellerStore';
>>>>>>> 416cdf6 (Merge: 충돌해결)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
<<<<<<< HEAD
        <Route path="/productUpload" element={<ProductUpload />} />
        <Route path="/myPage" element={<MyPage />} />
=======
        <Route path="/register" element={<ProductRegistration />} />
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/profile" element={<SellerStore/>}/>
>>>>>>> 416cdf6 (Merge: 충돌해결)
      </Routes>
    </BrowserRouter>
  );
}


export default App
