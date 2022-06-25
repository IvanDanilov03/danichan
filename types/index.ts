import { Timestamp } from 'firebase/firestore';

export interface Board {
  id: string;
}

export interface Thread {
  id: string;
  title: string;
  messages: Message[];
  startedAt: Timestamp;
  startedBy: User;
}

export interface Message {
  id: string;
  text: string;
  image?: string;
  writtenAt: Timestamp;
  writtenBy: User;
  repliedTo: Message['id'];
}

export interface User {
  uid: string;
  username?: string;
}

export type Observable<T, PropertyName extends string = 'data'> =
  | ({
      status: 'loading';
      error: undefined;
    } & {
      [P in PropertyName]: undefined;
    })
  | ({
      status: 'success';
      error: undefined;
    } & {
      [P in PropertyName]: T;
    })
  | ({
      status: 'error';
      error: unknown;
    } & {
      [P in PropertyName]: undefined;
    });
