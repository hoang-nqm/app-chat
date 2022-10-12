import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import ChatRoom from './components/ChatRoom/chatRoom';
import Login from './components/Login/login';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModal from './components/Modals/InviteMemberMadal';
import AppProvider from './Context/AppProvider';
import AuthProvider from './Context/AuthProvider';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<ChatRoom />} path="/" />
          </Routes>
          <AddRoomModal />
          <InviteMemberModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
