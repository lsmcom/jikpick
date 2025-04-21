import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import ProductUpload from './pages/ProductUpload'
import MyPage from './pages/MyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/productUpload" element={<ProductUpload />} />
        <Route path="/myPage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App
