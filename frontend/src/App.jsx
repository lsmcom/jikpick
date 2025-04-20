import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import ProductUpload from './pages/ProductUpload'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<ProductUpload />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App
