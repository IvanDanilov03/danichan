import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { useFirestore } from 'reactfire';

import { Observable, Thread, Board } from '../../types';

export type ThreadsObservable = Observable<Thread[], 'threads'>;

const useThreads = (boardId: Board['id']): ThreadsObservable => {
  const firestore = useFirestore();
  const [observable, setObservable] = useState<ThreadsObservable>({
    status: 'loading',
    threads: undefined,
    error: undefined,
  });

  const loadThreads = useCallback(async () => {
    try {
      const threadsCollection = collection(
        firestore,
        `boards/${boardId}/threads`,
      );
      const threadsQuery = query(threadsCollection);
      const threadsSnapshot = await getDocs(threadsQuery);
      const threads = threadsSnapshot.docs.map((threadDoc) => ({
        id: threadDoc.id,
        ...threadDoc.data(),
      })) as Thread[];

      setObservable({
        status: 'success',
        threads,
        error: undefined,
      });
    } catch (e) {
      setObservable({
        status: 'error',
        threads: undefined,
        error: e,
      });
    }
  }, [firestore, boardId]);

  useEffect(() => {
    if (boardId) {
      loadThreads();
    }
  }, [loadThreads, boardId]);

  return observable;
};

export default useThreads;
