import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import Auth from "./pages/Auth";
import UserPage from "./pages/UserPage";
import MyPage from "./pages/MyPage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import PrivateChat from "./pages/PrivateChat";


function App() {
  const { currentUser } = useContext(AuthContext)
  const RouteUser = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={'/auth'} />
    }
    return children;
  }
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<RouteUser><HomePage /></RouteUser>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/:id" element={<ChatPage />} />
        <Route path="/page" element={<UserPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/private" element={<PrivateChat />} />
      </Routes>

    </div>
  );
}

export default App;
