export interface EmojiCategory {
  emojiTypeUrls: string[];
  emojiUrls: string[][];
}

export interface EmojiData {
  id: number;
  emojiUrl: string;
}

export interface EmojiDetailData extends EmojiData {
  x: number;
  y: number;
}
export interface PostData {
  postId: number;
  userId: number;
  createdDate: string;
  username: string;
  emotionType: number;
  content: string;
  emojis: EmojiDetailData[];
}
