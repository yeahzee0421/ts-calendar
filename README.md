# 📅ts-calendar
Typescript와 zustand, date-fns를 사용한 캘린더 컴포넌트 구현
![image](https://github.com/yeahzee0421/ts-calendar/assets/107865510/b8d46c09-8db2-4c87-9e09-7962a6825512)

## ⚒️기능
- 캘린더(달력 기능)
- 게시글을 작성한 날짜에는 date 대신 emoji를 반환.<br />
  이때, 게시글의 감정 카테고리에 매치되는 emoji 불러옴
- 날짜를 클릭하면 해당 날짜에 작성한 게시글 상세페이지로 이동

## 파일 구조
``` bash
📦src
 ┣ 📂actions
 ┃ ┣ 📜calendarStore.ts
...
 ┣ 📂components
 ┃ ┣ 📂Calendar
 ┃ ┃ ┣ 📜Body.tsx
 ┃ ┃ ┣ 📜Calendar.module.css
 ┃ ┃ ┣ 📜Container.tsx
 ┃ ┃ ┗ 📜Header.tsx
...
 ┣ 📂interface
 ┃ ┗ 📜postInterface.ts
...
 ┣ 📂utils
 ┃ ┣ 📜GetEmotionIcon.ts
```

## 1. 캘린더

### ✅Zustand을 사용한 calendar store 구현
- fetchPostsForMonth: 오늘 날짜에 해당하는 달의 캘린더를 패치
- Array 형태로 prevDayList, currentDayList, nextDayList 받아온 후에 
  일주일은 7일이므로 인덱스를 이에 맞게 chunck 해준다. 

- 반환 값
  - currentDate: 오늘 날짜
  - weekCalendarList: 캘린더 리스트(1 week 기준)
  - postings: 매달 작성한 게시글

### ✅type interface의 사용
``` javascript
export interface PostSimpleDTO {
  postId: number;
  createdDate: Date;
  userId: number;
  username: string;
  emotionType: number;
  content: string;
}

export interface PostsDTO{
  posts: PostSimpleDTO[];
}


export interface PostSDTO {
  postId: number;
  userId: number;
  createdDate: string;
  username: string;
  emotionType: number;
  content: string;
  emojiCount: number;
}
```
받아올 데이터의 타입을 interface 폴더의 postInterface.ts 폴더에 인터페이스로 정의해 주었다. <br />
전체 프로젝트에서 api를 불러오는 곳이 매우 많았기 때문에 interface를 선언해두고 api 호출할 때마다 꺼내쓰도록 했다.<br />
인터페이스를 사용하면 api 데이터 타입이 불일치 하게 될 가능성을 확연히 줄일 수 있다. 관련 오류가 뜨더라도 수정이 쉽다.

<br />아래는 calendarStore에서 postInterface를 사용한 부분이다.

``` javascript
import { PostSimpleDTO, PostsDTO } from '../interface/postInterface.ts';
...
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
```

### ✅캘린더 날짜를 버튼으로 구현해주자.

``` javascript
...
return(
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
...
)
```
day가 0인 경우에는 visibility: 'hidden'으로 설정하여 화면에 보이지 않게 해주었다.<br />

### ✅클릭한 날짜에 작성한 게시글을 불러오자 
``` javascirpt
const post = postings.find((p) => format(p.createdDate, 'yyyy-MM-dd') === formattedDate);
```
calendarStore에서 posting을 가져온 후, find 함수로 해당 날짜와 작성일이 일치하는 게시글을 post에 담아준다. <br />

## 2. emoji를 불러오자

### ✅자주 사용되는 함수는 util 폴더에 따로 구현해두자.
이 레포에서는 캘린더만 설명하고 있지만, 프로젝트 전체에서 다른 페이지에서도 이모티콘(emoji)를 불러와야 하는 경우가 매우 많았다.<br />
emotion type을 parameter로 전달하여 로컬에 저장된 이모지 이미지 파일을 불러오는 GetEmotionIcon.tsx를 구현했다.

``` javascript
import s from '../components/EmotionList/EmotionList.module.css';

interface EmotionIconProps {
  type: number;
}

function GetEmotionIcon({ type }: EmotionIconProps): JSX.Element {
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
    <img
      src={`/src/assets/moodIcons/${getEmotionIcon(type)}.svg`}
      alt={`${getEmotionIcon(type)}`}
      className={s.button}
    />
  );
}
export default GetEmotionIcon;
```

### ✅navigate를 이용한 페이지 이동 
해당 날짜에 작성한 게시글이 있을 경우, 날짜(button)을 클릭하면 navigate를 사용하여 게시글 상세 페이지로 이동시켜주었다.
``` javascript
const handleDateClick = (postId?: number) => {
    if (postId) {
      navigate(`/post/${postId}`);
    }
  };
```
