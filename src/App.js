import React from 'react'

import { Header } from './components/allComponents.js';
import { Home, NotFound, Cart } from './pages/index.js'
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';

function App() {
  const [searchValue, setSearchValue] = React.useState('');
 return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <div className="container">
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
