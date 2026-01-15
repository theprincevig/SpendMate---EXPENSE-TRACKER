import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import ViewProfile from './pages/Profile/ViewProfile';
import UpdateProfile from './pages/Profile/UpdateProfile';
import ChangePassword from './pages/Auth/ChangePassword';
import AiChatbox from './pages/Dashboard/AiChatbox';


function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            <Route path='/dashboard' element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
              } 
            />
            <Route path='/income' element={
                <ProtectedRoute>
                  <Income />
                </ProtectedRoute>
              }
            />
            <Route path='/expense' element={
                <ProtectedRoute>
                  <Expense />
                </ProtectedRoute>
              }
            />
            <Route path='/ai/chat' element={
                <ProtectedRoute>
                  <AiChatbox />
                </ProtectedRoute>
              }
            />
            <Route path='/profile' element={
                <ProtectedRoute>
                  <ViewProfile />
                </ProtectedRoute>
              }
            />
            <Route path='/profile/edit' element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route path='/change-password' element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>

        <Toaster position='top-left' />
      </div>
  )
}

export default App

const ProtectedRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <LoaderCircle size={30} className='animate-spin' />
      </div>
    );
  }

  return authUser ? children : <Navigate to="/login" />
}

const Root = () => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <LoaderCircle size={30} className='animate-spin' />
      </div>
    );
  }

  // Redirect to dashboard if authenticated, otherwise to login
  return authUser ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}
