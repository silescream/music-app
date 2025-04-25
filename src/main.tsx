import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TracksPage from './components/TracksPage';

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/tracks' />} />
        <Route path='/tracks' element={<TracksPage />} />
      </Routes>
      <ToastContainer
        position='bottom-right'
        theme='dark'
        data-testid='toast-container'
      />
    </BrowserRouter>
  </StrictMode>,
)
