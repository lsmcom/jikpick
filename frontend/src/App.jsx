import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import ProductRegistration from './pages/ProductRegistration';
import ProductDetail from './pages/ProductDetail'
import SellerStore from './pages/SellerStore';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<ProductRegistration />} />
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/profile" element={<SellerStore/>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App
