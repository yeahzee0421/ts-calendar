/* eslint-disable import/prefer-default-export */
import {
  subMonths, addMonths, getDaysInMonth,
} from 'date-fns';
import create from 'zustand';
import instance from '../interface/instance';
import { PostSimpleDTO, PostsDTO } from '../interface/postInterface.ts';
//calendar store
type CalendarStore = {
  currentDate: Date;
  weekCalendarList: number[][];
  postings: PostSimpleDTO[];
  setCurrentDate: (date: Date) => void;
  updateMonth: (action: 'prev' | 'next') => void;
};

export const useCalendarStore = create<CalendarStore>((set) => {
  const today = new Date();

  const fetchPostsForMonth = async (date: Date): Promise<PostSimpleDTO[]> => {
    try {
      const api = `/post/mypage?year=${date.getFullYear()}&month=${date.getMonth() + 1}`;
      const res: { data: PostsDTO } = await instance.get(api);
      return res.data.posts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  };

  const initializeCalendar = async (date: Date) => {
    const posts = await fetchPostsForMonth(date);
    const totalMonthDays = getDaysInMonth(date);
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // 수정
    const prevDayList = Array(firstDayOfMonth.getDay()).fill(0);
    const currentDayList = Array.from({ length: totalMonthDays }).map((_, i) => i + 1);
    const nextDayList = Array(6 - lastDayOfMonth.getDay()).fill(0);

    const weekCalendarList = [...prevDayList, ...currentDayList, ...nextDayList].reduce(
      (acc: number[][], cur, idx) => {
        const chunkIndex = Math.floor(idx / 7);
        if (!acc[chunkIndex]) {
          acc[chunkIndex] = [];
        }
        acc[chunkIndex].push(cur);
        return acc;
      },
      [],
    );

    set({
      currentDate: date,
      weekCalendarList,
      postings: posts,
    });
  };

  initializeCalendar(today);

  return {
    currentDate: today,
    weekCalendarList: [],
    postings: [],
    setCurrentDate: (date) => initializeCalendar(date),
    updateMonth: (action) => {
      set((state) => {
        const newDate = action === 'prev' ? subMonths(state.currentDate, 1) : addMonths(state.currentDate, 1);
        initializeCalendar(newDate);
        return { currentDate: newDate };
      });
    },
  };
});
