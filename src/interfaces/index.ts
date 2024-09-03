export interface IBlog {
  _id: string;
  title: string;
  desc: string;
  createdAt: string;
  userId: {
    fname: string;
    username: string;
    _id: string;
  };
}
