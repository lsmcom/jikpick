import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import ProductRegistration from './pages/ProductRegistration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<ProductRegistration />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App
