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