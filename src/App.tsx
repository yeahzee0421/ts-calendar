import './App.css';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import axios from 'axios';
import MainPage from './pages/MainPage/MainPage';
import UserPage from './pages/UserPage/UserPage';
import UserLog from './pages/UserLog/UserLog';
import PostDetail from './components/PostDetail/MyPostDetail';
import LikedPostDetail from './components/PostDetail/LikedPostDetail';
import TodayPostDetail from './components/PostDetail/TodayPostDetail';
import LoginView from './pages/LoginView/LoginView';
import { useAccessToken } from './utils/getToken';
import { useTodayPostStore } from './actions/todayPost';
import { LuLoader } from 'react-icons/lu';
import './styles/Common.css';
import { useEffect, useState } from 'react';
import TodayPostView from './pages/TodayPostView/TodayPostView';
import StartView from './pages/StartView/StartView';
import StickerView from './pages/StickerView/StickerView';

axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.withCredentials = true;
axios.defaults.headers.common.Authorization = `Bearer ${useAccessToken()}`;

function App() {
  const [type, setType] = useState<number>(1);
  const { todayPost, fetchTodayPost } = useTodayPostStore();
  useEffect(() => {
    if (!useAccessToken())  {
      window.location.href = axios.defaults.baseURL + "login";
      return;
    }
    fetchTodayPost().then(() => {});
  }, []);

  return (
    <Router>
      {!todayPost && (
        <div>
          <LuLoader
            style={{ color: "#FFFBF2", width: "30px", height: "30px" }}
          />
        </div>
      )}
      <Routes>
        <Route path="/" element={ <LoginView /> } />
        <Route path="/main" element={todayPost && <div><MainPage/></div>} />
        <Route path="/newpost" element={<TodayPostView setType={setType} />} />
        <Route path="/start" element={<StartView type={type}/>} />
        <Route path="/post/:postId" element={todayPost && <StickerView  />} />
        <Route path="/mypage" element={<UserPage />} />
        <Route path="/mylog/:emotionType" element={<UserLog />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/myLikedPost/:postId" element={<LikedPostDetail />} />
        <Route path="/post/today" element={<TodayPostDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

