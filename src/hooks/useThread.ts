import { useCallback, useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { useFirestore } from 'reactfire';

import { Observable, Thread, Board } from '../../types';

export type ThreadObservable = Observable<Thread, 'thread'>;

const useThread = (
  boardId: Board['id'],
  threadId: Thread['id'],
): ThreadObservable => {
  const firestore = useFirestore();
  const [observable, setObservable] = useState<ThreadObservable>({
    status: 'loading',
    thread: undefined,
    error: undefined,
  });

  const loadThread = useCallback(async () => {
    try {
      const threadDocRef = doc(
        firestore,
        `boards/${boardId}/threads/${threadId}`,
      );
      const threadDoc = await getDoc(threadDocRef);
      const thread = { id: threadDoc.id, ...threadDoc.data() } as Thread;

      setObservable({
        status: 'success',
        thread,
        error: undefined,
      });
    } catch (e) {
      setObservable({
        status: 'error',
        thread: undefined,
        error: e,
      });
    }
  }, [firestore, boardId, threadId]);

  useEffect(() => {
    if (boardId && threadId) {
      loadThread();
    }
  }, [loadThread, boardId, threadId]);

  return observable;
};

export default useThread;
