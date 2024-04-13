import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Space } from 'antd'
import AppHeader from './Components/AppHeader'
import Sidebar from './Components/Sidebar'
import AppContent from './Components/AppContent'
import AppFooter from './Components/AppFooter'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
      <BrowserRouter>
          <div className='App'>
              <AppHeader />
              <Space className='sidebarandpage'>
                  <Sidebar />
                  <AppContent />
              </Space>
              <AppFooter />
          </div>
      </BrowserRouter>
  );
}
export default App
