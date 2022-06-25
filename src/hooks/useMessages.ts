import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useFirestore } from 'reactfire';

import { Observable, Thread, Board, Message } from '../../types';

export type MessagesObservable = Observable<Message[], 'messages'>;

const useMessages = (
  boardId: Board['id'],
  threadId: Thread['id'],
  updated: boolean,
): MessagesObservable => {
  const firestore = useFirestore();
  const [observable, setObservable] = useState<MessagesObservable>({
    status: 'loading',
    messages: undefined,
    error: undefined,
  });

  const loadMessages = useCallback(async () => {
    try {
      const messagesCollection = collection(
        firestore,
        `boards/${boardId}/threads/${threadId}/messages`,
      );
      const messagesQuery = query(
        messagesCollection,
        orderBy('writtenAt', 'desc'),
      );
      const messagesSnapshot = await getDocs(messagesQuery);
      const messages = messagesSnapshot.docs.map((messageDoc) => ({
        id: messageDoc.id,
        ...messageDoc.data(),
      })) as Message[];

      setObservable({
        status: 'success',
        messages,
        error: undefined,
      });
    } catch (e) {
      setObservable({
        status: 'error',
        messages: undefined,
        error: e,
      });
    }
  }, [firestore, boardId, threadId]);

  useEffect(() => {
    if (boardId && threadId) {
      loadMessages();
    }
  }, [loadMessages, boardId, threadId, updated]);

  return observable;
};

export default useMessages;
