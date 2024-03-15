/* eslint-disable react/no-array-index-key */
// eslint-disable-next-line import/no-extraneous-dependencies
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useCalendarStore } from '../../actions/calendarStore';
import s from './Calendar.module.css';
import happy from '../../assets/moodIcons/happy.svg';
import angry from '../../assets/moodIcons/angry.svg';
import sad from '../../assets/moodIcons/sad.svg';
import simsim from '../../assets/moodIcons/simsim.svg';
import tired from '../../assets/moodIcons/tired.svg';
import upset from '../../assets/moodIcons/upset.svg';

function CalBody() {
  const navigate = useNavigate();
  const {
    currentDate, weekCalendarList, postings,
  } = useCalendarStore();

  const handleDateClick = (postId?: number) => {
    if (postId) {
      navigate(`/post/${postId}`);
    }
  };

  const getEmotionIcon = (emotionType: number): React.ReactNode => {
    switch (emotionType) {
      case 1:
        return <img src={happy} alt="happyIcon" className={s.emotionIcons} />;
      case 2:
        return <img src={sad} alt="sadIcon" className={s.emotionIcons} />;
      case 3:
        return <img src={angry} alt="angryIcon" className={s.emotionIcons} />;
      case 4:
        return <img src={upset} alt="upsetIcon" className={s.emotionIcons} />;
      case 5:
        return <img src={simsim} alt="simsimIcon" className={s.emotionIcons} />;
      case 6:
        return <img src={tired} alt="tiredIcon" className={s.emotionIcons} />;

      default:
        return null;
    }
  };

  return (
    <div className={s.bodyWrapper}>
      {weekCalendarList.map((item, weekIndex) => (
        <div className={s.weeks} key={weekIndex}>
          {item.map((day, dayIndex) => {
            const clickedDate = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day,
            );

            const formattedDate = format(clickedDate, 'yyyy-MM-dd');
            const post = postings.find((p) => format(p.createdDate, 'yyyy-MM-dd') === formattedDate);

            return (
              <button
                type="button"
                className={`${s.days}`}
                style={day === 0 ? { visibility: 'hidden' } : {}}
                onClick={() => handleDateClick(post?.postId)}
                key={dayIndex}
              >
                <div className="days">
                  {post && (
                    <div className={s.emotionIcons}>
                      {getEmotionIcon(post.emotionType)}
                    </div>
                  )}
                  {!post && day}
                </div>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default CalBody;
