// import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import s from './EmotionList.module.css';
import GetEmotionIcon from '../../utils/GetEmotionIcon.tsx';
import instance from '../../interface/instance.ts';

const queryClient = new QueryClient();

type LikedPostCounts = number[];

function EmotionList() {
  const [countList, setCountList] = useState<LikedPostCounts | null>(null);
  const emotions = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res: { data: LikedPostCounts } = await instance.get('/post/myLikeCountList');
        setCountList(res.data);
      } catch (error) {
        console.error('Error fetching: ', error);
      }
    };
    fetchList();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={s.wrapper}>
        {emotions.map((emotionType) => (
          <Link to={`/myLog/${emotionType}`} key={emotionType} className={s.button}>
            <GetEmotionIcon type={emotionType} />
            {countList && <span className={s.count} style={{ fontSize: '12px', color: '#51372B', marginTop: '3px' }}>{countList[emotionType - 1]}</span>}
          </Link>
        ))}

      </div>
    </QueryClientProvider>
  );
}

export default EmotionList;
