import { Home, NotFound } from './pages/index.js'
import { Cart } from './pages/index.js';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout.jsx';


function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
