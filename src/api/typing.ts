export interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  selected?: boolean;
}

export interface IAddPost {
  title: string;
  body: string;
  userId: 1; // намеренно указан конкретный пользователь
}

export interface IAddPostResponse {
  data: {
    title: string;
    body: string;
    userId: 1; // намеренно указан конкретный пользователь
  }
  id: number;
}

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface IUserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: number;
    lng: number;
  }
}

export interface IUserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IUserAddress;
  phone: string;
  website: string;
  company: IUserCompany;
}

export interface IFilterPayload {
  postTitle: string;
  userName: string;
}

export interface IAddPostPayload {
  title: string;
  body: string;
}
