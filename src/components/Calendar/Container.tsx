import { useEffect } from 'react';
import CalHeader from './Header';
import CalBody from './Body';
import { useCalendarStore } from '../../actions/calendarStore';
import s from './Calendar.module.css';

function CalendarApp() {
  const { setCurrentDate } = useCalendarStore();
  useEffect(() => {
    setCurrentDate(new Date());
  }, [setCurrentDate]);

  return (
    <div className={s.calWrapper}>
      <div className={s.headerWrapper}>
        <CalHeader />
      </div>
      <div className={s.bodyWrapper}>
        <CalBody />
      </div>
    </div>
  );
}

export default CalendarApp;
