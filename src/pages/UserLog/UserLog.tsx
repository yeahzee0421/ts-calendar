import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import PostList from '../../components/LikedPostsList/PostList';
import s from './UserLog.module.css';
import theme from '../../styles/ThemeColor.module.css';
import MenuBar from '../../components/Menu/Menu';
import { useTodayPostStore } from '../../actions/todayPost';
import getThemeColor from '../../utils/GetThemeColor.tsx';

function UserLog() {
  const { emotionType } = useParams<{ emotionType?: string }>();
  const { todayPost, fetchTodayPost } = useTodayPostStore();
  const [, setScrollPosition] = useState<number>(0);
  const headerHeight = 55;

  useEffect(() => {
    fetchTodayPost();
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchTodayPost]);

  const selectedEmotion = emotionType ? parseInt(emotionType, 10) : 0;
  const emotionTypeFromTodayPost = todayPost ? todayPost.emotionType : 0;

  console.log('today:', emotionTypeFromTodayPost);

  return (
    <div>
      <div className={s.header}>
        <MenuBar />
      </div>
      <div className={`${s.wrapper} ${theme[getThemeColor(emotionTypeFromTodayPost)]}`}>
        <div className={s.container} style={{ paddingTop: `${headerHeight}px` }}>
          <div className={s.buttons}>
            <Link to="/mypage" className={s.buttons}>
              <AiOutlineClose className={s.button} />
            </Link>
          </div>
          <h2>그땐 머랭 ?</h2>
          <div className={s.postContainer}>
            <PostList emotionType={selectedEmotion} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLog;
