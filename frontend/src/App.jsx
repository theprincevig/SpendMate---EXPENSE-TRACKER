import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

import { useExchangeRateStore } from './store/useExchangeRateStore';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { useAuthStore } from './store/useAuthStore';
import { Root } from './routes/Root';

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
  const { fetchRates } = useExchangeRateStore();

  useEffect(() => {
    checkAuth();
    fetchRates();
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
