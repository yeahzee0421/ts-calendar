/* eslint-disable import/no-extraneous-dependencies */
import { format } from 'date-fns';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { useCalendarStore } from '../../actions/calendarStore';
import s from './Calendar.module.css';

function CalHeader() {
  const { currentDate, updateMonth } = useCalendarStore();

  return (
    <div className={s.calHeaderBar}>
      <AiFillCaretLeft className={s.buttonControl} type="button" onClick={() => updateMonth('prev')} />
      <div className={s.dateText}>
        <h4>
          {format(currentDate, 'yyyy-')}
          {format(currentDate, 'MM')}
        </h4>
      </div>
      <AiFillCaretRight className={s.buttonControl} type="button" onClick={() => updateMonth('next')} />
    </div>
  );
}

export default CalHeader;
