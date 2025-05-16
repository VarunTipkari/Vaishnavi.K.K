import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/Authentication/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import FertilizersStock from './pages/Stock/FertilizersStock';
import StockManagementLanding from './pages/Stock/StockLanding';
import FertStockReport from './pages/Stock/FertStockReport';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage />}></Route>
      <Route path='/Home' element={<Dashboard/>}></Route>
      <Route path='/Fertilizers' element={<FertilizersStock/>}></Route>
      <Route path='/Stock' element={<StockManagementLanding/>}></Route>
      <Route path='/FertReport' element={<FertStockReport/>}></Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App
