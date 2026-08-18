import { Routes , Route } from 'react-router-dom' 
import NavBar from './components/navbar.jsx'
import HomePage from './pages/homePage.jsx'
import SignupPage from './pages/signupPage.jsx'
import LoginPage from './pages/loginPage.jsx'
import SettingsPage from './pages/settingsPage.jsx'
import ProfilePage from './pages/profilePage.jsx'
import { useAuthStore } from './store/useAuthStore.jsx'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
const App = () => {
const authUser = useAuthStore((state) => state.authUser);
const checkAuth = useAuthStore((state) => state.checkAuth);
const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log(authUser);
  if (isCheckingAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
    
  }
  return (

    <div className="min-h-screen">
      <NavBar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        

      </Routes>
    </div>
    )
}

export default App;
