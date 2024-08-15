import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ChatPage from './pages/ChatPage'
import CartPage from './pages/CartPage'
import { UserProvider } from './context/UserContext'
import { ChatProvider } from './context/ChatContext'


const App = () => {
  return (
    <UserProvider>
      <ChatProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chat/*" element={<ChatPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>   
      </ChatProvider>  
    </UserProvider>
    
  )
}

export default App

