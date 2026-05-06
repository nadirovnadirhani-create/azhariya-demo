import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { WalletProvider } from './context/WalletContext';
import { ThemeProvider } from './context/ThemeContext';

import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';

import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import CourseDetail from './pages/CourseDetail';
import LessonVideo from './pages/LessonVideo';
import LessonInteractive from './pages/LessonInteractive';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function ProtectedRoute({ children, allowPublic = false }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Special handling for public courses/lessons
  const isAlphabet = location.pathname.includes('/course/alphabet') || 
                     location.pathname.includes('/lesson/video/alpha-') ||
                     location.pathname.includes('/lesson/interactive');

  if (!isAuthenticated && !allowPublic && !isAlphabet) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

function AppLayout() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const hideNav = ['/', '/auth', '/admin'].includes(location.pathname);

  return (
    <>
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        
        {/* Course Detail - Public for Alphabet */}
        <Route path="/course/:courseId" element={
          <ProtectedRoute allowPublic={true}><CourseDetail /></ProtectedRoute>
        } />
        
        {/* Lessons - Public for Alphabet */}
        <Route path="/lesson/video/:lessonId" element={
          <ProtectedRoute allowPublic={true}><LessonVideo /></ProtectedRoute>
        } />
        <Route path="/lesson/interactive" element={
          <ProtectedRoute allowPublic={true}><LessonInteractive /></ProtectedRoute>
        } />
        
        <Route path="/wallet" element={
          <ProtectedRoute><Wallet /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />
      </Routes>
      {isAuthenticated && !hideNav && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ProgressProvider>
            <WalletProvider>
              <AppLayout />
            </WalletProvider>
          </ProgressProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
