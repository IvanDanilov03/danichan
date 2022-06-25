import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { useCallback, useContext } from 'react';
import { useFirestore } from 'reactfire';
import { Board, Message, Thread } from '../../types';
import { UserContext } from '../components/app/UserProvider';

const useSendMessage = (boardId: Board['id'], threadId: Thread['id']) => {
  const firestore = useFirestore();
  const user = useContext(UserContext);

  return useCallback(
    (text: string, image: string) => {
      const { uid, username } = user;
      if (uid === undefined) return undefined;

      const messagesCollection = collection(
        firestore,
        `/boards/${boardId}/threads/${threadId}/messages`,
      );

      const message: Omit<Message, 'id'> = {
        text,
        image,
        writtenAt: serverTimestamp() as Timestamp,
        repliedTo: '',
        writtenBy: { uid, ...(username ? { username } : {}) },
      };

      return addDoc(messagesCollection, message);
    },
    [firestore, boardId, threadId, user],
  );
};

export default useSendMessage;
