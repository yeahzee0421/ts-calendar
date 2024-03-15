import React, { useState, useEffect } from 'react';
import { LuLoader } from 'react-icons/lu';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import MenuBar from '../../components/Menu/Menu';
import styles from '../../styles/Layout.module.css';
import Calendar from '../../components/Calendar/Container';
import { useTodayPostStore } from '../../actions/todayPost';
import { useCalendarStore } from '../../actions/calendarStore';
import EmotionList from '../../components/EmotionList/EmotionList';
import s from './UserPage.module.css';
import theme from '../../styles/ThemeColor.module.css';
import getThemeColor from '../../utils/GetThemeColor.tsx';
import { fetchUserNickname, updateNickname } from '../../utils/handleNickname';

function Mypage() {
  const { currentDate } = useCalendarStore();
  const { todayPost, fetchTodayPost } = useTodayPostStore();
  const [todayDate, setTodayDate] = useState(new Date());
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setTodayDate(new Date());
    fetchTodayPost();
    fetchUserNickname().then((nickname) => setUserName(nickname ?? ""));
  }, [currentDate, fetchTodayPost]);

  if (!todayPost) {
    return (
      <div className={styles.wrapper}>
        <LuLoader style={{ color: 'lightgrey', width: '30px', height: '30px' }} />
      </div>
    );
  }

  const changeTodayMood = (emotionType: number): string => {
    const moods = ['오예', '뿌앵', '부글부글', '까칠', '심심', '너덜너덜'];
    return moods[emotionType - 1] || '';
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleSaveName = () => {
    setUserName(newName);
    setIsEditingName(false);
    updateNickname(newName);
  };

  const getEmotionIcon = (emotion: number): string => {
    switch (emotion) {
      case 1:
        return 'happy';
      case 2:
        return 'sad';
      case 3:
        return 'angry';
      case 4:
        return 'upset';
      case 5:
        return 'simsim';
      case 6:
        return 'tired';
      default:
        return '';
    }
  };

  return (
    <div className={`${styles.wrapper} ${theme[getThemeColor(todayPost.emotionType)]}`}>
      <div className={styles.header}>
        <MenuBar />
      </div>
      <div className={styles.container}>
        <div className={s.profileContainer}>
          <div className={s.profileContent}>
            <div className={s.wr}>
              {isEditingName ? (
                <>
                  <input
                    type="text"
                    value={newName}
                    onChange={handleNameChange}
                    className={s.inputBox}
                  />
                  <button
                    type="button"
                    onClick={handleSaveName}
                    className={s.setButton}
                  >
                    save
                  </button>
                </>
              ) : (
                <>
                  <h2 className={s.userName}>{userName}</h2>
                  <button
                    type="button"
                    className={s.setButton}
                    onClick={handleNameEdit}
                  >
                    edit
                  </button>
                </>
              )}
            </div>
            <h4 className={s.userMood}>
              오늘의 쿠키:
              {' '}
              <span style={{ fontWeight: 'bold' }}>
                {changeTodayMood(todayPost.emotionType)}
                {' '}
              </span>
            </h4>
          </div>
          <div className={s.userIcon}>
            <img
              src={`/src/assets/moodIcons/${getEmotionIcon(todayPost.emotionType)}.svg`}
              alt={`${getEmotionIcon(todayPost.emotionType)}`}
              style={{ width: '75px', height: '75px', marginBottom: '13px' }}
            />
          </div>
        </div>
        <div className={styles.contentWrapper}>
          <div className={s.calContainer}>
            <Calendar />
          </div>
          <div className={s.todayCardContainer}>
            <h4 className={s.todayDate}>
              {format(todayDate, 'yyyy년 MM월 dd일')}
            </h4>
            <div className={s.cardContent}>
              <h5 className={s.content}>
                {todayPost.content}
              </h5>
            </div>
            <Link
              type="button"
              className={s.moveButton}
              to="/post/today"
            >
              <h5>보러가기</h5>
            </Link>
          </div>
          <div className={s.userLogContainer}>
            <EmotionList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
