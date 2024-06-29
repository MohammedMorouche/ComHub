// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { Space } from 'antd'
// import AppHeader from './Components/AppHeader'
// import Sidebar from './Components/Sidebar'
// import AppContent from './Components/AppContent'
// import AppFooter from './Components/AppFooter'
// import { BrowserRouter } from 'react-router-dom'

// function App() {
//   return (
//       <BrowserRouter>
//           <div className='App'>
//               <AppHeader />
//               <Space className='sidebarandpage'>
//                   <Sidebar />
//                   <AppContent />
//               </Space>
//               <AppFooter />
//           </div>
//       </BrowserRouter>
//   );
// }
// export default App
import { useState } from 'react'
import './App.css'
import { Space } from 'antd'
import AppHeader from './Components/AppHeader'
import Sidebar from './Components/Sidebar'
import AppContent from './Components/AppContent'
import AppFooter from './Components/AppFooter'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import Login from './Components/Login' // You'll need to create this component
function App() {
  const [user, setUser] = useState(null);
    // const navi = useNavigate();
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    
    setUser(null);

  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <AppHeader user={user} onLogout={handleLogout} />
        <Space className='sidebarandpage'>
          <Sidebar user={user} />
          <AppContent user={user} />
        </Space>
        <AppFooter />
      </div>
    </BrowserRouter>
  );
}

export default App