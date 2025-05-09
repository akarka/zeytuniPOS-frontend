import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UrunEkle from './pages/UrunEkle'; // 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UrunEkle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
