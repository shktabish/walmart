import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ChatPage from './pages/ChatPage'
import CartPage from './pages/CartPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/chat/*" element={<ChatPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  )
}

export default App