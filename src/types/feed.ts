export interface Story {
  id: number;
  user: string;
  avatar: string;
  image: string;
  unread?: boolean;
}

export interface Post {
  id: number;
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  caption: string;
  content?: string;
  time: string;
  likes: number;
  comments: number;
}
